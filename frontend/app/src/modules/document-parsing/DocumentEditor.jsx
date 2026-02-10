import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import Highlight from '@tiptap/extension-highlight'
import Placeholder from '@tiptap/extension-placeholder'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import { Table } from '@tiptap/extension-table'
import { TableRow } from '@tiptap/extension-table-row'
import { TableHeader } from '@tiptap/extension-table-header'
import { TableCell } from '@tiptap/extension-table-cell'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import HorizontalRule from '@tiptap/extension-horizontal-rule'
import { common, createLowlight } from 'lowlight'
import katex from 'katex'
import 'katex/dist/katex.min.css'
import { mergeAttributes, Node } from '@tiptap/core'
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  Quote,
  List,
  ListOrdered,
  Minus,
  Code,
  Image as ImageIcon,
  Table as TableIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Undo,
  Redo,
  Link as LinkIcon,
  Sigma,
  Eraser,
  SquareFunction,
  FunctionSquare,
  Rows2,
  Columns3,
  X,
  TableCellsMerge,
  TableCellsSplit
} from 'lucide-react'
import { useDocumentStore } from './documentStore.jsx'
import { LayoutPreview } from './LayoutPreview.jsx'
import { loadDatasetFromFolder } from './datasetLoader.js'
import { blocksToHtml, findBlockIdFromDom } from './datasetUtils.js'
import './editorStyles.css'

const lowlight = createLowlight(common)

const CodeBlock = CodeBlockLowlight.configure({ lowlight })

const BlockWrapper = Node.create({
  name: 'blockWrapper',
  group: 'block',
  content: 'block+',
  selectable: false,
  defining: true,
  addAttributes() {
    return {
      blockId: {
        default: null,
        parseHTML: (element) => element.getAttribute('data-block-id'),
        renderHTML: (attributes) => (attributes.blockId ? { 'data-block-id': attributes.blockId } : {})
      },
      pageIndex: {
        default: null,
        parseHTML: (element) => element.getAttribute('data-page-index'),
        renderHTML: (attributes) => (attributes.pageIndex != null ? { 'data-page-index': attributes.pageIndex } : {})
      }
    }
  },
  parseHTML() {
    return [{ tag: 'div[data-block-id]' }]
  },
  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes({ class: 'dc-block' }, HTMLAttributes), 0]
  }
})

function createMathNode({ name, inline }) {
  const tagName = inline ? 'math-inline' : 'math-block'
  const titleCase = name.charAt(0).toUpperCase() + name.slice(1)

  return Node.create({
    name,
    group: inline ? 'inline' : 'block',
    inline,
    atom: true,
    selectable: true,
    addAttributes() {
      return {
        latex: {
          default: '',
          parseHTML: (element) => element.getAttribute('data-latex') || '',
          renderHTML: (attributes) => ({ 'data-latex': attributes.latex })
        }
      }
    },
    parseHTML() {
      return [
        {
          tag: tagName
        }
      ]
    },
    renderHTML({ HTMLAttributes }) {
      return [tagName, mergeAttributes({ 'data-type': name }, HTMLAttributes)]
    },
    addCommands() {
      return {
        [`set${titleCase}`]:
          (attrs) =>
          ({ chain }) =>
            chain()
              .insertContent({ type: this.name, attrs })
              .run(),
        [`update${titleCase}`]:
          (attrs) =>
          ({ chain }) =>
            chain()
              .updateAttributes(this.name, attrs)
              .run()
      }
    },
    addNodeView() {
      return ({ node }) => {
        let currentNode = node
	        const container = document.createElement(tagName)
	        container.className = inline
	          ? 'math-inline relative inline-flex items-center justify-center rounded-md px-1 py-0'
	          : 'math-block relative flex w-full items-center justify-center rounded-lg px-3 py-3'
	        const inner = document.createElement('div')
	        inner.className = 'katex-container'
	        container.appendChild(inner)

        const render = () => {
          const latex = currentNode.attrs.latex || '\\text{请编辑公式}'
          container.setAttribute('data-latex', latex)
          try {
            katex.render(latex, inner, {
              throwOnError: false,
              displayMode: !inline
            })
          } catch (error) {
            inner.textContent = latex
          }
        }

        render()

        return {
          dom: container,
          update: (updatedNode) => {
            if (updatedNode.type.name !== this.name) {
              return false
            }
            if (updatedNode.attrs.latex !== currentNode.attrs.latex) {
              currentNode = updatedNode
              render()
            }
            return true
          }
        }
      }
    }
  })
}

const MathInline = createMathNode({ name: 'mathInline', inline: true })
const MathBlock = createMathNode({ name: 'mathBlock', inline: false })

function formatTimestamp(timestamp) {
  if (!timestamp) return '未保存'
  const date = new Date(timestamp)
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
}

export function DocumentEditor({ document, onBack }) {
  const { saveDocumentContent, getDocumentContent } = useDocumentStore()

  const fileInputRef = useRef(null)

  const docId = document?.id
  const [isEditing, setIsEditing] = useState(false)
  const [isDirty, setIsDirty] = useState(false)
  const [initialSnapshot, setInitialSnapshot] = useState(null)
  const [mathModal, setMathModal] = useState({ open: false, mode: 'insert', latex: '', variant: 'inline' })
  const [tableState, setTableState] = useState({
    isActive: false,
    canAddRowBefore: false,
    canAddRowAfter: false,
    canDeleteRow: false,
    canAddColumnBefore: false,
    canAddColumnAfter: false,
    canDeleteColumn: false,
    canToggleHeaderRow: false,
    canToggleHeaderColumn: false,
    canToggleHeaderCell: false,
    canMergeCells: false,
    canSplitCell: false,
    canDeleteTable: false
  })

  const [datasetState, setDatasetState] = useState({ status: 'idle', dataset: null, error: null })
  const [pageIndex, setPageIndex] = useState(0)
  const [activeBlockId, setActiveBlockId] = useState(null)
  const [hoveredBlockId, setHoveredBlockId] = useState(null)
  const editorContainerRef = useRef(null)
  const blockRefs = useRef(new Map())

  const datasetConfig = document?.dataset ?? null

  useEffect(() => {
    let cancelled = false

    if (!datasetConfig) {
      setDatasetState({ status: 'idle', dataset: null, error: null })
      setActiveBlockId(null)
      setHoveredBlockId(null)
      setPageIndex(0)
      return () => {
        cancelled = true
      }
    }

    const loadDataset = async () => {
      setActiveBlockId(null)
      setHoveredBlockId(null)
      setPageIndex(0)
      setDatasetState((prev) => ({ ...prev, status: 'loading', error: null }))

      try {
        const dataset = await loadDatasetFromFolder(datasetConfig)
        if (cancelled) return
        setDatasetState({ status: 'ready', dataset, error: null })
        if (dataset.blocks?.length) {
          setActiveBlockId(dataset.blocks[0].id)
          setPageIndex(dataset.blocks[0].pageIndex || 0)
        }
      } catch (error) {
        if (cancelled) return
        setDatasetState({ status: 'error', dataset: null, error })
      }
    }

    loadDataset()

    return () => {
      cancelled = true
    }
  }, [datasetConfig])

  const dataset = datasetState.dataset
  const blockMap = useMemo(() => {
    if (!dataset?.blocks?.length) return new Map()
    return new Map(dataset.blocks.map((block) => [block.id, block]))
  }, [dataset])

  const datasetHtml = useMemo(() => {
    if (!dataset?.blocks?.length) return ''
    return blocksToHtml(dataset.blocks, dataset.basePath)
  }, [dataset])

  const content = getDocumentContent(docId) || {}

  const datasetStatus = datasetState.status
  const datasetReady = datasetStatus === 'ready'
  const datasetLoading = datasetConfig ? datasetStatus === 'loading' || datasetStatus === 'idle' : false
  const datasetError = datasetConfig && datasetStatus === 'error' ? datasetState.error : null

  const editor = useEditor({
    extensions: [
      BlockWrapper,
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3]
        },
        codeBlock: false,
        horizontalRule: false,
        link: false
      }),
      Underline,
      Highlight,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Image.configure({ allowBase64: true }),
      Placeholder.configure({ placeholder: '在此编辑解析后的内容…' }),
      Link.configure({ openOnClick: false, autolink: true }),
      Table.configure({
        resizable: true,
        allowTableNodeSelection: true
      }),
      TableRow,
      TableHeader,
      TableCell.configure({
        HTMLAttributes: {
          class: 'dc-table-cell'
        }
      }),
      CodeBlock,
      HorizontalRule,
      MathInline,
      MathBlock
    ],
    editable: false,
    content: datasetHtml,
    onUpdate: ({ editor: instance }) => {
      if (instance.isEditable) {
        setIsDirty(true)
      }
      renderMathInEditor(instance)
    },
    onCreate: ({ editor: instance }) => {
      renderMathInEditor(instance)
  }
  })

  useEffect(() => {
    if (!editor || isEditing) return
    if (datasetState.status !== 'ready') return

    if (content.editorJSON) {
      editor.commands.setContent(content.editorJSON)
    } else if (datasetHtml) {
      editor.commands.setContent(datasetHtml)
    }
    renderMathInEditor(editor)

    setIsDirty(false)
    setInitialSnapshot(content.editorJSON || editor.getJSON())
  }, [editor, content.editorJSON, datasetHtml, datasetState.status, isEditing])

  useEffect(() => {
    if (!editor) return
    editor.setEditable(isEditing)
    if (!isEditing) {
      editor.commands.blur()
    }
  }, [editor, isEditing])

  const assignBlockAnchors = useCallback(() => {
    if (!editorContainerRef.current) return
    if (!dataset?.blocks?.length) return

    const nodes = Array.from(editorContainerRef.current.querySelectorAll('.dc-block'))
    dataset.blocks.forEach((block, index) => {
      const el = nodes[index]
      if (!el) return
      el.setAttribute('data-block-id', block.id)
      el.setAttribute('data-page-index', String(block.pageIndex ?? ''))
    })
  }, [dataset])

  useEffect(() => {
    if (!datasetReady) return
    const handle = window.requestAnimationFrame(assignBlockAnchors)
    return () => window.cancelAnimationFrame(handle)
  }, [datasetReady, assignBlockAnchors, datasetHtml, editor])

  useEffect(() => {
    if (!editor) return

    const updateTableState = () => {
      const can = editor.can()
      setTableState({
        isActive: editor.isActive('table'),
        canAddRowBefore: can.addRowBefore(),
        canAddRowAfter: can.addRowAfter(),
        canDeleteRow: can.deleteRow(),
        canAddColumnBefore: can.addColumnBefore(),
        canAddColumnAfter: can.addColumnAfter(),
        canDeleteColumn: can.deleteColumn(),
        canToggleHeaderRow: can.toggleHeaderRow(),
        canToggleHeaderColumn: can.toggleHeaderColumn(),
        canToggleHeaderCell: can.toggleHeaderCell(),
        canMergeCells: can.mergeCells ? can.mergeCells() : false,
        canSplitCell: can.splitCell ? can.splitCell() : false,
        canDeleteTable: can.deleteTable()
      })
    }

    updateTableState()
    editor.on('selectionUpdate', updateTableState)
    editor.on('transaction', updateTableState)

    return () => {
      editor.off('selectionUpdate', updateTableState)
      editor.off('transaction', updateTableState)
    }
  }, [editor])

  useEffect(() => {
    if (!editor) return
    if (!dataset || dataset.blocks?.length === 0) return

    const handleSelectionUpdate = () => {
      const { state, view } = editor
      const { from } = state.selection
      const resolved = view.domAtPos(from)
      const node = resolved?.node
      const textNodeType = typeof Node !== 'undefined' ? Node.TEXT_NODE : 3
      const element = node?.nodeType === textNodeType ? node.parentElement : node
      const blockId = findBlockIdFromDom(element)
      if (blockId && blockId !== activeBlockId) {
        setActiveBlockId(blockId)
        const block = blockMap.get(blockId)
        if (block) {
          setPageIndex(block.pageIndex || 0)
        }
      }
    }

    editor.on('selectionUpdate', handleSelectionUpdate)

    return () => {
      editor.off('selectionUpdate', handleSelectionUpdate)
    }
  }, [editor, dataset, blockMap, activeBlockId])

  useEffect(() => {
    if (!editorContainerRef.current) return
    const elements = editorContainerRef.current.querySelectorAll('.dc-block')
    elements.forEach((element) => {
      const blockId = element.getAttribute('data-block-id')
      element.classList.toggle('dc-block-active', blockId && blockId === activeBlockId)
      element.classList.toggle('dc-block-hover', blockId && blockId === hoveredBlockId)
    })
  }, [activeBlockId, hoveredBlockId])

  const scrollToBlock = (blockId) => {
    if (!blockId || !editorContainerRef.current) return
    const target = editorContainerRef.current.querySelector(`[data-block-id="${blockId}"]`)
    if (target) {
      target.scrollIntoView({ block: 'center', behavior: 'smooth' })
    }
  }

  const activateBlock = (block) => {
    if (!block) return
    setActiveBlockId(block.id)
    setPageIndex(block.pageIndex || 0)
    scrollToBlock(block.id)
  }

  const handleOverlayClick = (block) => {
    if (!block) return
    activateBlock(block)
  }

  const handleOverlayHover = (blockId) => {
    setHoveredBlockId(blockId || null)
  }

  const handleRegisterBlockRef = (blockId, node) => {
    if (!blockId) return
    if (node) {
      blockRefs.current.set(blockId, node)
    } else {
      blockRefs.current.delete(blockId)
    }
  }

  const handleEditorClick = (event) => {
    const blockId = findBlockIdFromDom(event.target)
    if (!blockId) return
    const block = blockMap.get(blockId)
    if (block) {
      activateBlock(block)
    }
  }

  const handleEditorMouseOver = (event) => {
    const blockId = findBlockIdFromDom(event.target)
    if (blockId) {
      const block = blockMap.get(blockId)
      if (block) {
        setHoveredBlockId(blockId)
      }
    } else {
      setHoveredBlockId(null)
    }
  }

  const handleEditorMouseLeave = () => {
    setHoveredBlockId(null)
  }

  const handleStartEditing = () => {
    if (!editor) return
    setInitialSnapshot(editor.getJSON())
    setIsDirty(false)
    setIsEditing(true)
  }

  const handleCancelEditing = () => {
    if (!editor) return
    if (initialSnapshot) {
      editor.commands.setContent(initialSnapshot)
      renderMathInEditor(editor)
    }
    setIsDirty(false)
    setIsEditing(false)
  }

  const handleSave = () => {
    if (!editor || !docId) return
    const json = editor.getJSON()
    const html = editor.getHTML()
    saveDocumentContent(docId, {
      editorJSON: json,
      editorHTML: html,
      datasetBasePath: dataset?.basePath,
      datasetFiles: dataset?.files
    })
    setIsDirty(false)
    setIsEditing(false)
    setInitialSnapshot(json)
    onBack?.()
  }

  const handleImageButtonClick = () => {
    fileInputRef.current?.click()
  }

  const handleImageSelected = (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      editor?.chain().focus().setImage({ src: reader.result }).run()
    }
    reader.readAsDataURL(file)
    event.target.value = ''
  }

  const openInsertMathModal = (variant = 'inline') => {
    setMathModal({ open: true, mode: 'insert', latex: '', variant })
  }

  const editMath = () => {
    if (!editor) return
    if (editor.isActive('mathInline')) {
      const current = editor.getAttributes('mathInline').latex || ''
      setMathModal({ open: true, mode: 'edit', latex: current, variant: 'inline' })
      return
    }
    if (editor.isActive('mathBlock')) {
      const current = editor.getAttributes('mathBlock').latex || ''
      setMathModal({ open: true, mode: 'edit', latex: current, variant: 'block' })
      return
    }
    window.alert('请先选中需要编辑的公式')
  }

  const setLink = () => {
    const previousUrl = editor?.getAttributes('link').href || ''
    const url = window.prompt('输入链接地址', previousUrl)
    if (url === null) return
    if (url === '') {
      editor?.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }
    editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }

  if (!document) {
    return (
      <div className="kiveiv-card flex min-h-[320px] flex-col items-center justify-center space-y-4 border-dashed text-center" style={{ background: 'var(--kiveiv-surface-muted)' }}>
        <h2 className="text-xl font-semibold" style={{ color: 'var(--kiveiv-text)' }}>暂无可编辑的文档</h2>
        <p className="text-sm kiveiv-muted">请在文档列表中选择状态为“已解析”的文档进入编辑模式。</p>
        <button
          type="button"
          onClick={onBack}
          className="kiveiv-btn-secondary"
        >
          返回列表
        </button>
      </div>
    )
  }

  return (
    <div className="flex h-full min-h-0 flex-col">
      <main className="grid flex-1 min-h-0 gap-5 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        {datasetReady ? (
          <LayoutPreview
            pdfUrl={dataset.assets.originPdf}
            pagesMeta={dataset.pages}
            activeBlockId={activeBlockId}
            hoveredBlockId={hoveredBlockId}
            pageIndex={pageIndex}
            onPageChange={setPageIndex}
            onBlockClick={handleOverlayClick}
            onBlockHover={handleOverlayHover}
            registerBlockRef={handleRegisterBlockRef}
          />
        ) : (
          <section className="kiveiv-card flex min-h-[320px] flex-col items-center justify-center border-dashed px-6 text-center text-sm kiveiv-muted" style={{ background: 'var(--kiveiv-surface-muted)' }}>
            {!datasetConfig && <p>该文档尚未解析，完成解析后可查看联动效果。</p>}
            {datasetLoading && <p>正在加载文档解析数据…</p>}
            {datasetError ? (
              <div>
                <p className="font-medium" style={{ color: 'var(--kiveiv-text)' }}>无法加载解析数据</p>
                <p className="kiveiv-gap-title-note text-xs kiveiv-subtle break-all">{datasetError.message}</p>
              </div>
            ) : null}
          </section>
        )}

        <section className="flex h-full min-h-0 flex-col kiveiv-card">
          <div className="flex items-center justify-between border-b px-4 py-3" style={{ borderColor: 'var(--kiveiv-border)' }}>
            <div className="flex min-w-0 items-center gap-3">
              <span className="truncate text-sm font-semibold" style={{ color: 'var(--kiveiv-text)' }}>解析内容</span>
              <span className="text-xs kiveiv-subtle">{isEditing ? '编辑模式' : '预览模式'}</span>
              <span className="hidden text-xs kiveiv-subtle md:inline">最后保存时间：{formatTimestamp(content.updatedAt)}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onBack}
                className="kiveiv-btn-secondary h-8 px-3 text-xs"
              >
                返回
              </button>
              {!isEditing ? (
                <button
                  type="button"
                  onClick={handleStartEditing}
                  disabled={!datasetReady}
                  className={`kiveiv-btn-primary h-8 px-3 text-xs ${datasetReady ? '' : 'kiveiv-btn-disabled'}`}
                >
                  开始编辑
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={handleCancelEditing}
                    className="kiveiv-btn-secondary h-8 px-3 text-xs"
                  >
                    取消
                  </button>
                  <button
                    type="button"
                    onClick={handleSave}
                    disabled={!isDirty}
                    className={`kiveiv-btn-primary h-8 px-3 text-xs ${isDirty ? '' : 'kiveiv-btn-disabled'}`}
                  >
                    保存并返回
                  </button>
                </>
              )}
            </div>
          </div>

          {isEditing && editor ? (
            <div className="border-b px-4 py-2" style={{ borderColor: 'var(--kiveiv-border)', background: 'var(--kiveiv-surface-muted)' }}>
              <div className="dc-editor-toolbar flex flex-wrap items-center gap-2">
                <ToolbarButton
                  icon={<Undo size={16} />}
                  label="撤销"
                  onClick={() => editor.chain().focus().undo().run()}
                />
                <ToolbarButton
                  icon={<Redo size={16} />}
                  label="重做"
                  onClick={() => editor.chain().focus().redo().run()}
                />
                <Separator />
                <ToolbarButton
                  icon={<Heading1 size={16} />}
                  label="标题 1"
                  active={editor.isActive('heading', { level: 1 })}
                  onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                />
                <ToolbarButton
                  icon={<Heading2 size={16} />}
                  label="标题 2"
                  active={editor.isActive('heading', { level: 2 })}
                  onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                />
                <ToolbarButton
                  icon={<Heading3 size={16} />}
                  label="标题 3"
                  active={editor.isActive('heading', { level: 3 })}
                  onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                />
                <Separator />
                <ToolbarButton
                  icon={<Bold size={16} />}
                  label="加粗"
                  active={editor.isActive('bold')}
                  onClick={() => editor.chain().focus().toggleBold().run()}
                />
                <ToolbarButton
                  icon={<Italic size={16} />}
                  label="斜体"
                  active={editor.isActive('italic')}
                  onClick={() => editor.chain().focus().toggleItalic().run()}
                />
                <ToolbarButton
                  icon={<UnderlineIcon size={16} />}
                  label="下划线"
                  active={editor.isActive('underline')}
                  onClick={() => editor.chain().focus().toggleUnderline().run()}
                />
                <ToolbarButton
                  icon={<Strikethrough size={16} />}
                  label="删除线"
                  active={editor.isActive('strike')}
                  onClick={() => editor.chain().focus().toggleStrike().run()}
                />
                <ToolbarButton
                  icon={<Eraser size={16} />}
                  label="清除格式"
                  onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}
                />
                <Separator />
                <ToolbarButton
                  icon={<List size={16} />}
                  label="无序列表"
                  active={editor.isActive('bulletList')}
                  onClick={() => editor.chain().focus().toggleBulletList().run()}
                />
                <ToolbarButton
                  icon={<ListOrdered size={16} />}
                  label="有序列表"
                  active={editor.isActive('orderedList')}
                  onClick={() => editor.chain().focus().toggleOrderedList().run()}
                />
                <ToolbarButton
                  icon={<Quote size={16} />}
                  label="引用"
                  active={editor.isActive('blockquote')}
                  onClick={() => editor.chain().focus().toggleBlockquote().run()}
                />
                <ToolbarButton
                  icon={<Code size={16} />}
                  label="代码块"
                  active={editor.isActive('codeBlock')}
                  onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                />
                <ToolbarButton
                  icon={<Minus size={16} />}
                  label="分割线"
                  onClick={() => editor.chain().focus().setHorizontalRule().run()}
                />
                <Separator />
                <ToolbarButton
                  icon={<AlignLeft size={16} />}
                  label="居左"
                  active={editor.isActive({ textAlign: 'left' })}
                  onClick={() => editor.chain().focus().setTextAlign('left').run()}
                />
                <ToolbarButton
                  icon={<AlignCenter size={16} />}
                  label="居中"
                  active={editor.isActive({ textAlign: 'center' })}
                  onClick={() => editor.chain().focus().setTextAlign('center').run()}
                />
                <ToolbarButton
                  icon={<AlignRight size={16} />}
                  label="居右"
                  active={editor.isActive({ textAlign: 'right' })}
                  onClick={() => editor.chain().focus().setTextAlign('right').run()}
                />
                <Separator />
                <ToolbarButton
                  icon={<ImageIcon size={16} />}
                  label="插入图片"
                  onClick={handleImageButtonClick}
                />
                <ToolbarButton
                  icon={<TableIcon size={16} />}
                  label="插入表格"
                  onClick={() =>
                    editor
                      .chain()
                      .focus()
                      .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
                      .run()
                  }
                />
                <TableControlGroup editor={editor} tableState={tableState} />
                <ToolbarButton
                  icon={<SquareFunction size={16} />}
                  label="行内公式"
                  onClick={() => openInsertMathModal('inline')}
                />
                <ToolbarButton
                  icon={<FunctionSquare size={16} />}
                  label="块级公式"
                  onClick={() => openInsertMathModal('block')}
                />
                <ToolbarButton icon={<Sigma size={16} />} label="编辑公式" onClick={editMath} />
                <ToolbarButton
                  icon={<LinkIcon size={16} />}
                  label="插入链接"
                  onClick={setLink}
                />
              </div>
            </div>
          ) : null}

          <input
            ref={fileInputRef}
            className="hidden"
            type="file"
            accept="image/*"
            onChange={handleImageSelected}
          />

          <div
            ref={editorContainerRef}
            className="relative flex-1 min-h-0 overflow-y-auto px-6 py-4 dc-editor-content-wrapper"
            onClick={handleEditorClick}
            onMouseOver={handleEditorMouseOver}
            onMouseLeave={handleEditorMouseLeave}
          >
            {editor ? <EditorContent editor={editor} className="dc-editor-content" /> : null}

            {datasetLoading && !datasetReady ? (
              <div
                className="absolute inset-0 flex items-center justify-center text-sm kiveiv-muted"
                style={{ background: 'rgba(255, 255, 255, 0.72)' }}
              >
                正在加载内容…
              </div>
            ) : null}

            {datasetError ? (
              <div
                className="absolute inset-0 flex items-center justify-center text-sm text-red-600"
                style={{ background: 'rgba(255, 255, 255, 0.72)' }}
              >
                无法渲染解析内容：{datasetError.message}
              </div>
            ) : null}
          </div>
        </section>
      </main>

      {mathModal.open && (
        <MathModal
          latex={mathModal.latex}
          mode={mathModal.mode}
          variant={mathModal.variant}
          onCancel={() => setMathModal({ open: false, mode: 'insert', latex: '', variant: 'inline' })}
          onConfirm={(value) => {
            if (!editor) return
            const chain = editor.chain().focus()
            if (mathModal.variant === 'inline') {
              if (mathModal.mode === 'edit') {
                chain.updateMathInline({ latex: value }).run()
              } else {
                chain.setMathInline({ latex: value }).run()
              }
            } else {
              if (mathModal.mode === 'edit') {
                chain.updateMathBlock({ latex: value }).run()
              } else {
                chain.setMathBlock({ latex: value }).run()
              }
            }
            renderMathInEditor(editor)
            setMathModal({ open: false, mode: 'insert', latex: '', variant: 'inline' })
          }}
        />
      )}
    </div>
  )
}

function ToolbarButton({ icon, label, onClick, active, disabled, compact }) {
  return (
    <button
      type="button"
      title={label}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center rounded-md border border-transparent px-2 ${
        compact ? 'py-1' : 'py-1.5'
      } text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-1 ${
        active ? 'border-blue-200 bg-blue-50 text-gray-900' : 'bg-transparent text-gray-600 hover:bg-blue-50/60'
      } ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
    >
      {icon}
    </button>
  )
}

function Separator() {
  return <span className="mx-1 h-4 w-px" style={{ background: 'var(--kiveiv-border)' }} />
}

function TableControlGroup({ editor, tableState }) {
  if (!editor || !tableState?.isActive) {
    return null
  }

  const chain = () => editor.chain().focus()

  return (
    <div className="dc-editor-table-controls flex flex-wrap items-center gap-2">
      <ToolbarButton
        icon={<Rows2 size={16} />}
        label="上方插入行"
        disabled={!tableState.canAddRowBefore}
        onClick={() => chain().addRowBefore().run()}
      />
      <ToolbarButton
        icon={<Rows2 size={16} />}
        label="下方插入行"
        disabled={!tableState.canAddRowAfter}
        onClick={() => chain().addRowAfter().run()}
      />
      <ToolbarButton
        icon={<Rows2 size={16} className="rotate-180" />}
        label="删除当前行"
        disabled={!tableState.canDeleteRow}
        onClick={() => chain().deleteRow().run()}
      />
      <ToolbarButton
        icon={<Columns3 size={16} />}
        label="左侧插入列"
        disabled={!tableState.canAddColumnBefore}
        onClick={() => chain().addColumnBefore().run()}
      />
      <ToolbarButton
        icon={<Columns3 size={16} />}
        label="右侧插入列"
        disabled={!tableState.canAddColumnAfter}
        onClick={() => chain().addColumnAfter().run()}
      />
      <ToolbarButton
        icon={<Columns3 size={16} className="rotate-180" />}
        label="删除当前列"
        disabled={!tableState.canDeleteColumn}
        onClick={() => chain().deleteColumn().run()}
      />
      <ToolbarButton
        icon={<TableCellsMerge size={16} />}
        label="合并单元格"
        disabled={!tableState.canMergeCells}
        onClick={() => chain().mergeCells().run()}
      />
      <ToolbarButton
        icon={<TableCellsSplit size={16} />}
        label="拆分单元格"
        disabled={!tableState.canSplitCell}
        onClick={() => chain().splitCell().run()}
      />
      <ToolbarButton
        icon={<Heading2 size={16} />}
        label="切换表头行"
        disabled={!tableState.canToggleHeaderRow}
        onClick={() => chain().toggleHeaderRow().run()}
      />
      <ToolbarButton
        icon={<Heading3 size={16} />}
        label="切换表头列"
        disabled={!tableState.canToggleHeaderColumn}
        onClick={() => chain().toggleHeaderColumn().run()}
      />
      <ToolbarButton
        icon={<Heading1 size={16} />}
        label="切换表头单元格"
        disabled={!tableState.canToggleHeaderCell}
        onClick={() => chain().toggleHeaderCell().run()}
      />
      <ToolbarButton
        icon={<X size={16} />}
        label="删除表格"
        disabled={!tableState.canDeleteTable}
        onClick={() => chain().deleteTable().run()}
      />
    </div>
  )
}

function renderMathInEditor(editor) {
  if (!editor) return

  const renderForSelector = (selector, displayMode) => {
    const elements = editor.view.dom.querySelectorAll(selector) || []
    elements.forEach((element) => {
      const latex = element.getAttribute('data-latex') || ''
      const container = element
      const inner = container.querySelector('.katex-container') || document.createElement('div')
      inner.className = displayMode ? 'katex-container w-full text-center' : 'katex-container inline-flex'
      if (!container.contains(inner)) {
        container.appendChild(inner)
      }
      try {
        katex.render(latex || '\\text{请编辑公式}', inner, {
          throwOnError: false,
          displayMode
        })
      } catch (error) {
        inner.textContent = latex
      }
    })
  }

  renderForSelector('math-inline', false)
  renderForSelector('math-block', true)
}

function MathModal({ latex, mode, variant, onCancel, onConfirm }) {
  const [value, setValue] = useState(latex)
  const previewRef = useRef(null)

  useEffect(() => {
    if (!previewRef.current) return
    try {
      katex.render(value || '\\text{请编辑公式}', previewRef.current, {
        throwOnError: false,
        displayMode: variant === 'block'
      })
    } catch (error) {
      previewRef.current.textContent = value
    }
  }, [value, variant])

  const title = mode === 'edit' ? '编辑公式' : variant === 'block' ? '插入块级公式' : '插入行内公式'

  return (
    <div className="kiveiv-backdrop">
      <div className="kiveiv-modal max-w-lg">
        <div className="border-b px-6 py-4" style={{ borderColor: 'var(--kiveiv-border)' }}>
          <h3 className="text-lg font-semibold" style={{ color: 'var(--kiveiv-text)' }}>{title}</h3>
          <p className="kiveiv-gap-title-body text-sm kiveiv-muted">请输入 Latex 语法，保存后将自动渲染。</p>
        </div>
        <div className="space-y-4 px-6 py-5">
          <label className="block text-sm font-medium" style={{ color: 'var(--kiveiv-text)' }} htmlFor="math-editor-latex">
            Latex 代码
          </label>
          <textarea
            id="math-editor-latex"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            className="kiveiv-textarea h-32 w-full resize-none"
            placeholder="例如：\\int_{0}^{1} x^2 dx"
          />
          <div className="rounded-lg border px-4 py-3 text-sm kiveiv-muted" style={{ borderColor: 'var(--kiveiv-border)', background: 'var(--kiveiv-surface-muted)' }}>
            <div ref={previewRef} className="katex-preview"></div>
          </div>
        </div>
        <div className="flex justify-end gap-3 border-t px-6 py-4" style={{ borderColor: 'var(--kiveiv-border)' }}>
          <button
            type="button"
            onClick={onCancel}
            className="kiveiv-btn-secondary"
          >
            取消
          </button>
          <button
            type="button"
            onClick={() => onConfirm(value || '\\text{请编辑公式}')}
            className="kiveiv-btn-primary"
          >
            确认
          </button>
        </div>
      </div>
    </div>
  )
}
