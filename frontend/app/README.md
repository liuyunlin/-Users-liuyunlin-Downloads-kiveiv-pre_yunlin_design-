# 模块目录使用说明

本文档介绍 `src/modules` 目录下各业务模块的用途、核心组件与使用方式，便于快速上手维护与扩展。

## 总览

```
src/modules
├── document-parsing        # 文档解析与二次编辑模块
├── document-segmentation   # 文档切分（占位模块）
├── index-building          # 向量索引构建（占位模块）
├── intelligent-qa          # 智能问答（占位模块）
├── settings                # 解析配置与模型管理
└── ModulePage.jsx          # 模块入口页面
```

### 运行前提
- 根目录运行`npm install`安装需要依赖 。
- 应用默认通过 `npm run dev` 启动 Vite 开发服务器。

---

## 1. ModulePage.jsx
整合各业务模块的导航与主内容区域。

- 左侧为模块导航（文档解析 / 文本切分 / 索引构建 / 智能问答 / 设置）。
- 中间内容区根据导航切换渲染对应模块：
  - 文档解析：提供上传、列表、解析流程、阅读器、编辑器。
  - 设置：跳转至模型配置页面。
- 其它模块目前为占位视图，可自定义扩展。

### 导航回调
`ModulePage` 会向子组件传递以下回调：
- `setActiveDocumentTab(...)` 切换文档子页签（上传/列表/解析/编辑/阅读器）。
- `setActiveSettingsTab(...)` 打开特定设置页。

---

## 2. 文档解析模块（document-parsing）
核心业务：上传 → 列表管理 → 解析流程 → 富文本编辑。

### 关键文件
| 文件 | 说明 |
| --- | --- |
| `DocumentUpload.jsx` | 本地模拟上传（多文件并行、重复校验、20 秒恒定进度）。回调 `onTriggerSuccess / onTriggerFail` 用于触发全局提示。 |
| `documentStore.jsx` | 提供全局文档状态（上传队列、解析进度、解析结果、富文本内容）。`DocumentStoreProvider` 需包裹在页面最外层。 |
| `DocumentList.jsx` | 表格展示文档及状态。支持多选删除、查看、解析、进度查看、进入编辑。 |
| `DocumentProcess.jsx` | 解析流程：1）选择文档 2）选择解析模式 3）标准解析配置 4）调用 `startProcessing` 模拟进度。完成后自动生成示例解析段落。 |
| `DocumentViewer.jsx` | 纯阅读模式，加载 `/public/auto` 目录下 MinerU 解析产物，通过 `LayoutPreview` 渲染 PDF 分页。 |
| `DocumentEditor.jsx` | 富文本二次编辑（基于 Tiptap）：左侧 `LayoutPreview` + 透明 block overlay，右侧基于 MinerU Markdown/JSON 的内容联动，支持图片、表格控制、链接、代码块、KaTeX 公式等。 |
| `LayoutPreview.jsx` | 通用 PDF 预览 + block 高亮组件，支持缩放、翻页、block hover/click 联动。 |
| `datasetLoader.js` | 抽象的数据集加载器，从指定目录读取 MinerU `middle/content_list/md` 并结构化为页面、区块、资源。 |
| `sampleContent.js` | 模拟解析段落文案（仅供解析流程演示使用，不再依赖 `/public/assets` 图片）。 |
| `editorStyles.css` | 编辑器定制样式（标题、列表、引用、代码块、公式等）。 |

### 如何接入
1. 在应用根组件中包裹 `DocumentStoreProvider` 与 `SettingsProvider`：
   ```jsx
   <SettingsProvider>
     <DocumentStoreProvider>
       <ModulePage />
     </DocumentStoreProvider>
   </SettingsProvider>
   ```
2. 上传与解析流程均为前端模拟，可根据实际业务替换为真实 API：
   - 替换 `DocumentUpload` 中 `startUploadSimulation` 为真实上传逻辑。
   - 替换 `documentStore.jsx` 中 `startProcessing`，将定时器改为轮询后端状态。
3. `DocumentEditor` 默认通过 `datasetLoader` 读取 `/public/auto` 目录下的 MinerU 解析结果（`middle/content_list/md`）。若接入真实数据，仅需在文档对象的 `dataset.basePath` 指向解析产物所在目录即可复用双栏联动能力。
4. 如需定制工具栏按钮或扩展 Tiptap 插件，可在 `DocumentEditor` 中调整 `useEditor` 的 `extensions`/工具栏组件。

### 常用回调
- `onNavigateSettings`：解析配置弹窗中跳转到设置页。
- `onViewProgress(doc)`：列表或解析流程内查看进度，唤起全局进度弹窗。
- `onEditDocument(doc)`：跳转富文本编辑器。

---

## 3. 文档切分 / 索引构建 / 智能问答（占位模块）
目前仅导出空组件，示例：
```js
// src/modules/document-segmentation/index.js
export * from './components'
```
可在对应目录创建 `components/` 子目录并导出实际逻辑，`ModulePage` 会自动加载（需在导航中补充展示内容）。

---

## 4. 设置模块（settings）
- `SettingsStore.jsx`：管理模型配置草稿与已保存状态。
- `SettingsPage.jsx`：左侧导航 + 每个解析能力的下拉选择（布局参考 Tailwind 栅格）。
- 使用方式：从文档解析流程或导航直接进入，更新模型选项后点击保存即可写入 `SettingsStore`。

---

## 5. 开发建议
- Tailwind 样式命名统一采用 `dc-` 前缀的自定义类（在 `editorStyles.css` 中集中维护）。
- 新增模块时，可在 `ModulePage` 导航中插入入口，并在 `src/modules/<module>/index.js` 导出需要的组件。
- 如果要接入真实后端 API，建议在 `documentStore` 中统一封装，保证 UI 组件仍通过上下文读取状态。

---

如需更多帮助，可查看根目录 `README.md`（如有）或直接阅读各模块源码注释。欢迎根据实际项目需求继续扩展。EOF
