import { useEffect, useMemo, useRef, useState } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import Placeholder from '@tiptap/extension-placeholder'
import Underline from '@tiptap/extension-underline'
import Highlight from '@tiptap/extension-highlight'
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
import { normalizeTagName } from '../../utils/segmentationUtils.js'
import { OverlayDrawer } from '../../../shared/components/OverlayDrawer.jsx'
import '../../../document-parsing/editorStyles.css'

const lowlight = createLowlight(common)

const CodeBlock = CodeBlockLowlight.configure({ lowlight })

function createMathNode({ name, inline }) {
  return Node.create({
    name,
    group: inline ? 'inline' : 'block',
    inline,
    atom: true,
    selectable: true,
    draggable: false,
    addAttributes() {
      return {
        latex: {
          default: '',
          parseHTML: (element) => element.getAttribute('data-latex') || '',
          renderHTML: (attributes) => ({
            'data-latex': attributes.latex || ''
          })
        }
      }
    },
    parseHTML() {
      return [{ tag: inline ? 'math-inline' : 'math-block' }]
    },
    renderHTML({ HTMLAttributes }) {
      return [inline ? 'math-inline' : 'math-block', mergeAttributes(HTMLAttributes)]
    },
    addCommands() {
      return {
        setMathInline:
          (attrs) =>
          ({ commands }) =>
            commands.insertContent({ type: 'mathInline', attrs }),
        setMathBlock:
          (attrs) =>
          ({ commands }) =>
            commands.insertContent({ type: 'mathBlock', attrs }),
        updateMathInline:
          (attrs) =>
          ({ commands }) =>
            commands.updateAttributes('mathInline', attrs),
        updateMathBlock:
          (attrs) =>
          ({ commands }) =>
            commands.updateAttributes('mathBlock', attrs)
      }
    },
    addNodeView() {
      return ({ node }) => {
        let currentNode = node
        const container = document.createElement(inline ? 'span' : 'div')
        container.className = inline ? 'dc-math-inline' : 'dc-math-block'
        container.setAttribute('data-latex', currentNode.attrs.latex || '')

        const render = () => {
          container.setAttribute('data-latex', currentNode.attrs.latex || '')
          const inner = container.querySelector('.katex-container') || document.createElement('div')
          inner.className = inline ? 'katex-container inline-flex' : 'katex-container w-full text-center'
          if (!container.contains(inner)) container.appendChild(inner)
          try {
            katex.render(currentNode.attrs.latex || '\\text{请编辑公式}', inner, {
              throwOnError: false,
              displayMode: !inline
            })
          } catch (error) {
            inner.textContent = currentNode.attrs.latex
          }
        }

        render()

        return {
          dom: container,
          update: (updatedNode) => {
            if (updatedNode.type.name !== currentNode.type.name) return false
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

export function TaskProgressModal({ title, statusLabel, progress, items, remainingSeconds, onClose }) {
  const isCompleted = progress >= 100
  const progressDisplay = `${progress}%`
  const remainingLabel = isCompleted ? '任务已完成' : `预计剩余 ${remainingSeconds} 秒`

  return (
    <div className="kiveiv-backdrop">
      <div className="kiveiv-modal max-w-lg">
        <div className="flex items-center justify-between border-b px-6 py-4" style={{ borderColor: 'var(--kiveiv-border)' }}>
          <div>
            <h2 className="text-lg font-semibold" style={{ color: 'var(--kiveiv-text)' }}>{title}</h2>
            <p className="text-sm kiveiv-muted">{statusLabel}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="kiveiv-modal-close"
            aria-label="关闭进度弹窗"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="px-6 py-6">
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between text-sm font-medium" style={{ color: 'var(--kiveiv-text)' }}>
                <span>整体进度</span>
                <span>{progressDisplay}</span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full" style={{ background: 'var(--kiveiv-surface-muted)' }}>
                <div className="h-full rounded-full bg-blue-600 transition-all" style={{ width: progressDisplay }} />
              </div>
              <p className="kiveiv-gap-title-note text-xs kiveiv-subtle">{remainingLabel}</p>
            </div>

            {items?.length > 0 && (
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wide kiveiv-subtle">当前任务</h3>
                <ul className="mt-3 space-y-2 text-sm kiveiv-muted">
                  {items.map((item) => (
                    <li key={item.id} className="flex items-center justify-between rounded-md px-3 py-2" style={{ background: 'var(--kiveiv-surface-muted)' }}>
                      <span className="truncate pr-4" title={item.name}>{item.name}</span>
                      <span className="text-xs kiveiv-subtle">{item.id}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export function ModelSelector({ label, options = [], selected, query, onQueryChange, onSelect, emptyText, locked = false }) {
  const filteredOptions = options.filter((item) =>
    item.toLowerCase().includes(query.trim().toLowerCase())
  )

  return (
    <div className="space-y-3">
      <label className="block text-xs font-semibold kiveiv-subtle">
        {label}
        <input
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder={locked ? '该知识库已绑定模型' : '输入模型名称筛选'}
          disabled={locked}
          className={`kiveiv-input mt-2 w-full ${locked ? 'opacity-60 cursor-not-allowed' : ''}`}
        />
      </label>
      {options.length ? (
        <div className="max-h-44 space-y-2 overflow-y-auto rounded-lg border p-2 kiveiv-surface-muted" style={{ borderColor: 'var(--kiveiv-border)' }}>
          {filteredOptions.length ? (
            filteredOptions.map((model) => (
              <button
                key={model}
                type="button"
                onClick={() => {
                  if (locked) return
                  onSelect(model)
                }}
                disabled={locked}
                className={`flex w-full items-center justify-between rounded-md border px-3 py-2 text-sm transition-colors ${
                  selected === model
                    ? 'border-blue-200 bg-blue-50'
                    : 'border-transparent hover:border-blue-200 hover:bg-blue-50/60'
                }`}
                style={{ color: 'var(--kiveiv-text)' }}
              >
                <span>{model}</span>
                {selected === model && (
                  <svg className="h-4 w-4 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            ))
          ) : (
            <div className="rounded-md px-3 py-3 text-xs kiveiv-subtle" style={{ background: 'var(--kiveiv-surface)' }}>
              未找到匹配模型，请调整关键词。
            </div>
          )}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed px-4 py-6 text-sm kiveiv-muted kiveiv-surface-muted" style={{ borderColor: 'var(--kiveiv-border)' }}>
          {emptyText || '当前未配置可用模型。'}
        </div>
      )}
      {options.length ? (
        <div className="text-xs kiveiv-muted">
          当前选择：<span className="font-semibold" style={{ color: 'var(--kiveiv-text)' }}>{selected || '未选择'}</span>
        </div>
      ) : null}
    </div>
  )
}

export function ModelSelectionModal({
  title,
  description,
  selectionCount,
  label,
  options,
  selected,
  query,
  onQueryChange,
  onSelect,
  emptyText,
  confirmText,
  locked = false,
  lockedHint = '',
  onClose,
  onReturnSettings,
  onConfirm
}) {
  return (
    <OverlayDrawer
      open
      title={title}
      description={description}
      widthClassName="max-w-xl"
      onClose={onClose}
      footer={(
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="kiveiv-btn-secondary"
          >
            取消
          </button>
          <button
            type="button"
            onClick={onReturnSettings}
            className="kiveiv-btn-secondary"
          >
            返回重新配置
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={!selected}
            className={`kiveiv-btn-primary ${selected ? '' : 'kiveiv-btn-disabled'}`}
          >
            {confirmText}
          </button>
        </div>
      )}
    >
      <div className="space-y-4">
        {typeof selectionCount === 'number' && (
          <p className="text-sm kiveiv-muted">已选择 {selectionCount} 个切片。</p>
        )}
        <ModelSelector
          label={label}
          options={options}
          selected={selected}
          query={query}
          onQueryChange={onQueryChange}
          onSelect={onSelect}
          emptyText={emptyText}
          locked={locked}
        />
        {lockedHint ? (
          <p className="text-xs kiveiv-subtle">{lockedHint}</p>
        ) : null}
      </div>
    </OverlayDrawer>
  )
}

export function InfoModal({ title, description, onClose }) {
  return (
    <div className="kiveiv-backdrop">
      <div className="kiveiv-modal max-w-md">
        <div className="px-6 py-6">
          <h3 className="text-lg font-semibold" style={{ color: 'var(--kiveiv-text)' }}>{title}</h3>
          <p className="kiveiv-gap-title-body text-sm kiveiv-muted">{description}</p>
          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="kiveiv-btn-secondary"
            >
              关闭
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export function EditChunkModal({ initialTitle = '', initialContentHTML = '', onClose, onSave }) {
  const [title, setTitle] = useState(initialTitle)
  const [isDirty, setIsDirty] = useState(false)
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
  const fileInputRef = useRef(null)

  useEffect(() => {
    setTitle(initialTitle)
    setIsDirty(false)
  }, [initialTitle])

  const editor = useEditor({
    extensions: [
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
      Placeholder.configure({ placeholder: '在此编辑切片内容…' }),
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
    editable: true,
    content: initialContentHTML || '<p></p>',
    onUpdate: ({ editor: instance }) => {
      setIsDirty(true)
      renderMathInEditor(instance)
    },
    onCreate: ({ editor: instance }) => {
      renderMathInEditor(instance)
    }
  })

  useEffect(() => {
    if (!editor) return
    editor.commands.setContent(initialContentHTML || '<p></p>')
    renderMathInEditor(editor)
    setIsDirty(false)
  }, [editor, initialContentHTML])

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
        canMergeCells: can.mergeCells(),
        canSplitCell: can.splitCell(),
        canDeleteTable: can.deleteTable()
      })
    }

    updateTableState()
    editor.on('selectionUpdate', updateTableState)

    return () => {
      editor.off('selectionUpdate', updateTableState)
    }
  }, [editor])

  const canSave = useMemo(() => Boolean(title.trim()) && (isDirty || title.trim() !== initialTitle.trim()), [title, isDirty, initialTitle])

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

  return (
    <OverlayDrawer
      open
      title="切片编辑"
      description="保存后切片状态将更新为“已确认”。"
      widthClassName="max-w-4xl"
      onClose={onClose}
      footer={(
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="kiveiv-btn-secondary"
          >
            取消
          </button>
          <button
            type="button"
            onClick={() => {
              if (!editor || !canSave) return
              onSave?.({
                title: title.trim(),
                content: editor.getText(),
                contentHTML: editor.getHTML()
              })
            }}
            disabled={!editor || !canSave}
            className={`kiveiv-btn-primary ${editor && canSave ? '' : 'kiveiv-btn-disabled'}`}
          >
            保存
          </button>
        </div>
      )}
    >
      <div className="space-y-4">
        <label className="block text-xs font-semibold kiveiv-subtle">
          切片标题
          <input
            value={title}
            onChange={(event) => {
              setTitle(event.target.value)
              setIsDirty(true)
            }}
            className="kiveiv-input mt-2 w-full"
          />
        </label>

        <div className="rounded-[var(--kiveiv-radius-inner)] border" style={{ borderColor: 'var(--kiveiv-border)' }}>
          <div className="dc-editor-toolbar flex flex-wrap items-center gap-2 border-b px-3 py-2" style={{ borderColor: 'var(--kiveiv-border)' }}>
            <ToolbarButton icon={<Undo size={16} />} label="撤销" disabled={!editor?.can().undo()} onClick={() => editor?.chain().focus().undo().run()} />
            <ToolbarButton icon={<Redo size={16} />} label="重做" disabled={!editor?.can().redo()} onClick={() => editor?.chain().focus().redo().run()} />
            <Separator />
            <ToolbarButton icon={<Heading1 size={16} />} label="标题 1" active={editor?.isActive('heading', { level: 1 })} onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()} />
            <ToolbarButton icon={<Heading2 size={16} />} label="标题 2" active={editor?.isActive('heading', { level: 2 })} onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()} />
            <ToolbarButton icon={<Heading3 size={16} />} label="标题 3" active={editor?.isActive('heading', { level: 3 })} onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()} />
            <Separator />
            <ToolbarButton icon={<Bold size={16} />} label="加粗" active={editor?.isActive('bold')} onClick={() => editor?.chain().focus().toggleBold().run()} />
            <ToolbarButton icon={<Italic size={16} />} label="斜体" active={editor?.isActive('italic')} onClick={() => editor?.chain().focus().toggleItalic().run()} />
            <ToolbarButton icon={<UnderlineIcon size={16} />} label="下划线" active={editor?.isActive('underline')} onClick={() => editor?.chain().focus().toggleUnderline().run()} />
            <ToolbarButton icon={<Strikethrough size={16} />} label="删除线" active={editor?.isActive('strike')} onClick={() => editor?.chain().focus().toggleStrike().run()} />
            <ToolbarButton icon={<Eraser size={16} />} label="清除格式" onClick={() => editor?.chain().focus().unsetAllMarks().clearNodes().run()} />
            <Separator />
            <ToolbarButton icon={<Quote size={16} />} label="引用" active={editor?.isActive('blockquote')} onClick={() => editor?.chain().focus().toggleBlockquote().run()} />
            <ToolbarButton icon={<List size={16} />} label="无序列表" active={editor?.isActive('bulletList')} onClick={() => editor?.chain().focus().toggleBulletList().run()} />
            <ToolbarButton icon={<ListOrdered size={16} />} label="有序列表" active={editor?.isActive('orderedList')} onClick={() => editor?.chain().focus().toggleOrderedList().run()} />
            <ToolbarButton icon={<Code size={16} />} label="代码块" active={editor?.isActive('codeBlock')} onClick={() => editor?.chain().focus().toggleCodeBlock().run()} />
            <ToolbarButton icon={<Minus size={16} />} label="分割线" onClick={() => editor?.chain().focus().setHorizontalRule().run()} />
            <Separator />
            <ToolbarButton icon={<AlignLeft size={16} />} label="居左" active={editor?.isActive({ textAlign: 'left' })} onClick={() => editor?.chain().focus().setTextAlign('left').run()} />
            <ToolbarButton icon={<AlignCenter size={16} />} label="居中" active={editor?.isActive({ textAlign: 'center' })} onClick={() => editor?.chain().focus().setTextAlign('center').run()} />
            <ToolbarButton icon={<AlignRight size={16} />} label="居右" active={editor?.isActive({ textAlign: 'right' })} onClick={() => editor?.chain().focus().setTextAlign('right').run()} />
            <Separator />
            <ToolbarButton icon={<ImageIcon size={16} />} label="插入图片" onClick={handleImageButtonClick} />
            <ToolbarButton
              icon={<TableIcon size={16} />}
              label="插入表格"
              onClick={() => editor?.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
            />
            <TableControlGroup editor={editor} tableState={tableState} />
            <ToolbarButton icon={<SquareFunction size={16} />} label="行内公式" onClick={() => openInsertMathModal('inline')} />
            <ToolbarButton icon={<FunctionSquare size={16} />} label="块级公式" onClick={() => openInsertMathModal('block')} />
            <ToolbarButton icon={<Sigma size={16} />} label="编辑公式" onClick={editMath} />
            <ToolbarButton icon={<LinkIcon size={16} />} label="插入链接" onClick={setLink} />
          </div>

          <input
            ref={(node) => {
              fileInputRef.current = node
            }}
            className="hidden"
            type="file"
            accept="image/*"
            onChange={handleImageSelected}
          />

          <div className="dc-editor-content dc-editor-content-wrapper px-4 py-3">
            <EditorContent editor={editor} />
          </div>
        </div>
      </div>

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
    </OverlayDrawer>
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

  useEffect(() => {
    setValue(latex)
  }, [latex])

  const title = mode === 'edit' ? '编辑公式' : variant === 'block' ? '插入块级公式' : '插入行内公式'

  return (
    <div className="kiveiv-backdrop">
      <div className="kiveiv-modal max-w-lg">
        <div className="border-b px-6 py-4" style={{ borderColor: 'var(--kiveiv-border)' }}>
          <h3 className="text-lg font-semibold" style={{ color: 'var(--kiveiv-text)' }}>{title}</h3>
          <p className="kiveiv-gap-title-body text-sm kiveiv-muted">请输入 Latex 语法，保存后将自动渲染。</p>
        </div>
        <div className="space-y-4 px-6 py-5">
          <label className="block text-sm font-medium" style={{ color: 'var(--kiveiv-text)' }} htmlFor="seg-math-editor-latex">
            Latex 代码
          </label>
          <textarea
            id="seg-math-editor-latex"
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

export function DeleteChunkConfirmModal({ count, onCancel, onConfirm }) {
  return (
    <div className="kiveiv-backdrop">
      <div className="kiveiv-modal max-w-md">
        <div className="px-6 py-6">
          <h3 className="text-lg font-semibold" style={{ color: 'var(--kiveiv-text)' }}>确认删除切片</h3>
          <p className="kiveiv-gap-title-body text-sm kiveiv-muted">
            将删除已选择的 {count} 个切片，操作不可撤销。
          </p>
          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="kiveiv-btn-secondary"
            >
              取消
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className="kiveiv-btn-danger"
            >
              确认删除
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export function TagManagementModal({
  tagModal,
  tagForm,
  tagPool,
  systemTagPool,
  mergeQuery,
  onFormChange,
  onMergeQueryChange,
  onClose,
  onSubmit
}) {
  const selectedCount = tagForm.sourceTags
    .split(',')
    .map((item) => normalizeTagName(item))
    .filter(Boolean).length

  return (
    <OverlayDrawer
      open
      title={{
        create: '新增标签',
        rename: '重命名标签',
        merge: '合并标签',
        delete: '删除标签',
        convert: '转为系统标签',
        'system-create': '新增系统标签',
        'system-rename': '重命名系统标签',
        'system-delete': '删除系统标签'
      }[tagModal.type]}
      description="操作会同步到标签管理服务。"
      widthClassName="max-w-lg"
      onClose={onClose}
      footer={(
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="kiveiv-btn-secondary"
          >
            取消
          </button>
          <button
            type="button"
            onClick={onSubmit}
            className="kiveiv-btn-primary"
          >
            确认
          </button>
        </div>
      )}
    >
      <div className="space-y-4">
            {['create', 'system-create'].includes(tagModal.type) && (
              <label className="block text-xs font-semibold kiveiv-subtle">
                标签名称
                <input
                  value={tagForm.name}
                  onChange={(event) => onFormChange({ name: event.target.value })}
                  className="kiveiv-input mt-2 w-full"
                  placeholder="输入标签名称"
                />
              </label>
            )}

            {['rename', 'delete', 'convert'].includes(tagModal.type) && (
              <label className="block text-xs font-semibold kiveiv-subtle">
                选择标签
                <select
                  value={tagForm.name}
                  onChange={(event) => onFormChange({ name: event.target.value })}
                  className="kiveiv-select mt-2 w-full"
                >
                  <option value="">请选择标签</option>
                  {tagPool.map((tag) => (
                    <option key={tag} value={tag}>{tag}</option>
                  ))}
                </select>
              </label>
            )}

            {['system-rename', 'system-delete'].includes(tagModal.type) && (
              <label className="block text-xs font-semibold kiveiv-subtle">
                选择系统标签
                <select
                  value={tagForm.name}
                  onChange={(event) => onFormChange({ name: event.target.value })}
                  className="kiveiv-select mt-2 w-full"
                >
                  <option value="">请选择系统标签</option>
                  {systemTagPool.map((tag) => (
                    <option key={tag.name} value={tag.name}>{tag.name}</option>
                  ))}
                </select>
              </label>
            )}

            {['rename', 'system-rename'].includes(tagModal.type) && (
              <label className="block text-xs font-semibold kiveiv-subtle">
                新标签名称
                <input
                  value={tagForm.newName}
                  onChange={(event) => onFormChange({ newName: event.target.value })}
                  className="kiveiv-input mt-2 w-full"
                  placeholder="输入新的标签名称"
                />
              </label>
            )}

            {tagModal.type === 'merge' && (
              <>
                <label className="block text-xs font-semibold kiveiv-subtle">
                  筛选标签
                  <input
                    value={mergeQuery}
                    onChange={(event) => onMergeQueryChange(event.target.value)}
                    className="kiveiv-input mt-2 w-full"
                    placeholder="输入关键词筛选"
                  />
                </label>
	                  <div className="rounded-xl border p-3" style={{ borderColor: 'var(--kiveiv-border)', background: 'var(--kiveiv-surface-muted)' }}>
	                  <div className="flex items-center justify-between">
	                    <p className="text-xs font-semibold kiveiv-subtle">源标签（多选）</p>
	                    <div className="flex items-center gap-2 text-xs kiveiv-subtle">
	                      <span>已选 {selectedCount}</span>
	                        <button
	                          type="button"
	                          onClick={() => onFormChange({ sourceTags: '' })}
	                          className="kiveiv-kbd-link"
	                        >
	                          清空选择
	                        </button>
	                    </div>
	                  </div>
                  <div className="mt-3 max-h-32 space-y-2 overflow-y-auto">
                    {tagPool
                      .filter((tag) => tag.toLowerCase().includes(mergeQuery.trim().toLowerCase()))
                      .map((tag) => {
                        const selected = tagForm.sourceTags
                          .split(',')
                          .map((item) => normalizeTagName(item))
                          .filter(Boolean)
                          .includes(tag)
	                        return (
	                          <label key={tag} className="flex items-center gap-2 text-sm kiveiv-muted">
	                            <input
	                              type="checkbox"
	                              checked={selected}
                              onChange={(event) => {
                                const current = tagForm.sourceTags
                                  .split(',')
                                  .map((item) => normalizeTagName(item))
                                  .filter(Boolean)
                                const next = event.target.checked
                                  ? Array.from(new Set([...current, tag]))
                                  : current.filter((item) => item !== tag)
	                                onFormChange({ sourceTags: next.join(', ') })
	                              }}
	                              className="kiveiv-check"
	                            />
	                            <span>{tag}</span>
	                          </label>
	                        )
	                      })}
	                    {!tagPool.length && (
	                      <p className="text-xs kiveiv-subtle">暂无可选标签</p>
	                    )}
	                  </div>
	                </div>
	                <label className="block text-xs font-semibold kiveiv-subtle">
	                  目标标签
	                  <input
	                    value={tagForm.newName}
                    onChange={(event) => onFormChange({ newName: event.target.value })}
                    className="kiveiv-input mt-2 w-full"
                    placeholder="合并后的标签名"
                  />
                </label>
              </>
	            )}
	
            {['convert', 'system-create'].includes(tagModal.type) && (
              <label className="block text-xs font-semibold kiveiv-subtle">
                标签说明
	                <textarea
	                  rows={3}
                  value={tagForm.description}
                  onChange={(event) => onFormChange({ description: event.target.value })}
                  className="kiveiv-textarea mt-2 w-full"
                  placeholder="用于说明标签含义"
                />
              </label>
            )}
      </div>
    </OverlayDrawer>
  )
}
