# Kiveiv 前端技术报告（解析 / 切分 / 抽取 / 问答 / 设置）

> 说明：本报告仅覆盖前端业务侧（黄色能力）实现与当前可用 UI；通用能力（鉴权、命名规范、DB schema、日志等）请按技能指引转通用能力文档。

## 1. 范围与目标
- 目标：基于 DatacapsulePlus-UI 结构与设计系统，完成文档解析/切分/抽取/问答等业务链路的前端页面；模型管理保留在 Settings；业务配置在对应业务模块完成；后端接口采用 mock stub。
- 范围：文档上传/校验、文档列表管理、解析流程与进度、解析结果预览与编辑、切分策略与结果验证、抽取结果（实体/三元组/结构化）、智能问答（检索与引用返回）、解析模型配置（解析页内选择）、模型管理。
- 当前实现状态：已完成“文档解析 + 文本切分（列表/独立策略页/结果详情/编辑与溯源占位）+ 设置（模型管理）”可用 UI；解析策略二级菜单需移除并改为解析详情页模型选择弹窗（模型来源 Settings 文档解析模型）；其余链路按 skill 规划为“待实现/待落地 UI”。
- 约束：
  - 仅支持端到端解析模型（MinerU / PaddlePaddleOCR），禁止 VLM。
  - Excel 导入计划接入解析/抽取联动：上传后自动完成抽取任务（结构化 + 图结构）；当前前端仍阻断需调整。

## 2. 目录结构与工程形态
- 根目录结构（按目录规范）：
  - `frontend/app`：Vite React 前端主工程（DatacapsulePlus-UI 结构）。
  - `backend/`、`agent/`、`docs/`：占位目录，后端与智能体由其他同学负责。
- 前端入口：
  - `frontend/app/src/App.jsx`：渲染模块页（`ModulePage`）。
  - `frontend/app/src/modules/ModulePage.jsx`：模块导航 + 文档解析主页面 + 设置模块入口。

## 3. 设计系统与 UI 规范
- 设计系统：DatacapsulePlus-UI（见 `references/repo/DatacapsulePlus-UI/src/design-system/DESIGN_SPEC.md`）。
- 组件风格：卡片、分组侧栏、浅色背景、强调色（indigo/emerald/sky）。

## 4. 前端功能总览（业务能力）
> 以 `kiveiv-business/*` skill 为依据做前端规划；通用能力按 `kiveiv-basic/*` 对接。

### 4.1 文档解析链路（已实现 UI）
- 文件类型限制：当前仅 `pdf/doc/docx/ppt/pptx`；Excel（`xls/xlsx`）前端仍阻断，计划调整为允许上传并触发抽取联动。
- 文件大小限制：保持 DatacapsulePlus-UI 的上限策略与提示文案。
- 文件位置：
  - `frontend/app/src/modules/document-parsing/DocumentUpload.jsx`

### 4.2 文档列表与管理（已实现 UI）
- 列表展示、分页、删除、进入预览/编辑/解析流程入口。
- 文件位置：
  - `frontend/app/src/modules/document-parsing/DocumentList.jsx`

### 4.3 解析流程与进度（已实现 UI）
#### 解析模式选择
> 仅保留“端到端解析”模式；智能体解析保留为禁用入口。

#### 模型配置校验
- 解析前必须在“文档解析详情页”选择解析模型（下拉可筛选），模型列表来源 Settings-文档解析模型的已保存配置。
- 默认选中已保存的当前模型，不允许空选；若无保存项则弹窗提示，并提供“返回重新配置”按钮跳转到 Settings 对应模型配置位置。

#### 解析进度
- 解析中弹窗进度 + 当前任务列表 + 预计剩余时间。
- 文件位置：
  - `frontend/app/src/modules/document-parsing/DocumentProcess.jsx`

### 4.4 解析结果预览与编辑（已实现 UI）
- 预览：
  - `frontend/app/src/modules/document-parsing/DocumentViewer.jsx`
- 编辑：
  - `frontend/app/src/modules/document-parsing/DocumentEditor.jsx`
- 解析缓存（前端 store）：
  - `frontend/app/src/modules/document-parsing/documentStore.jsx`
  - **已改为知识库级隔离**：`documents/进度/解析状态` 按 `knowledgeBaseId` 分桶；并写回 `filesByBase`（localStorage）避免刷新后丢失。

### 4.5 设置模块（模型管理，已实现 UI）
#### 结构
分组：`模型管理`  
页面入口：`frontend/app/src/modules/settings/SettingsPage.jsx`

#### 模型管理
- `文档解析模型`、`智能问答模型`、`文本切分模型（LLM/向量）`、`索引构建模型（LLM）`。
- 文本切分模型初始仅提供“类型占位”（LLM + 向量），具体模型由用户配置；语义切分使用 LLM，向量化使用向量模型。
- 索引构建模型为 LLM（不是向量模型），同样为占位配置。
- 每个模型配置支持“新增”生成多份配置卡片（前端草稿）。

#### 存储方式
通过 `SettingsStore` 在前端保存 `draft/saved` 两份状态；业务配置移到对应模块。

文件位置：
- `frontend/app/src/modules/settings/SettingsPage.jsx`
- `frontend/app/src/modules/settings/SettingsStore.jsx`
- `frontend/app/src/modules/settings/constants.js`

### 4.6 文本切分链路（已按真实流程重构 UI）
依据：`kiveiv-business/chunk`  
说明：二级菜单放在**主侧栏导航**内展开（对齐“文档解析”）。  
“策略配置”不再是独立菜单，而是**切分文档 → 独立策略配置页（页面内 stepper）**的阶段性流程。

二级菜单（已实现，基于 hit-rag 真实接口）：
1) **切分文档**
   - 文档列表与状态（`GET /api/documents`），多选后触发切分。
   - 仅允许**未处理/失败**文档进入批量切分；已完成默认不可选。
   - 点击“开始切分”进入**独立策略配置页**（策略配置→确认→执行）。
   - 若选择“语义边界切分”，点击“开始切分”前弹出模型选择弹窗（与文档解析一致）：仅选择模型，来源为 Settings-文本切分-LLM；默认选中已保存项，禁空；提供“返回重新配置”按钮跳转设置页。
   - 已完成文档允许“重新切分”（单文档动作，进入策略页重走流程）。
   - 若用户尝试对“已完成”文档发起批量切分，弹窗提示并阻断。
2) **切分结果**
   - 按文档查看 chunk 列表（`GET /api/documents/{filename}/chunks`）。
   - 行内操作：编辑/状态更新（`PATCH /api/chunks/{chunk_id}`）。
   - **溯源与版本**作为结果内能力：溯源定位、版本历史（`/api/view/document/...`、`/api/chunks/{chunk_id}/logs`）。
   - 点击“查看结果”跳转到**独立详情页**（非下方展开）：展示文档基本信息 + 切分参数。
   - 详情页主体为**正方形切片块**网格（可见具体文字），每个块保留：状态、切分名、原子块、标签、操作。
   - 详情页支持编辑/版本/溯源入口，并保留原切分参数与结果统计。
   - 仅当用户选择**已完成**文档并点击“查看结果”后展示；默认空态。
   - 切片编辑保存后状态切换为“已确认”，未保存保持“初始”。
   - 详情页提供“筛选”入口：进入筛选模式后支持单点选择、全选/清空、删除；删除前弹窗确认，确认后前端缓存同步。
3) **标签管理（独立）**
   - 标签统计与全局管理（`/api/tags/all`、`/api/tags/create|merge|rename|delete`）。
   - 文档标签管理（`/api/documents/{filename}/tags`）。
   - 系统标签管理与转换（`/api/system-tags`、`/api/system-tags/convert`）。
   - 标签统计卡片内：操作按钮置于标签 chips 上方；标签可点击进入详情页（同页切换）。
   - 标签详情页：展示该标签关联的 chunk（正方形卡片网格），卡片内显示切分文字与所有标签。
   - 标签分区：普通标签与系统标签分开显示，不混排。
   - chunk 级别支持新增/删除标签（新增仅可从现有标签集合中选择；系统标签需单独分区选择）。
   - 前端支持本地缓存即时反馈（不依赖后端联动）。
4) **语义搜索（独立）**
   - 语义搜索与 filters（`POST /api/chunks/search`），依赖向量化。
   - 前端支持**文档/标签多选**（多次查询聚合；后端当前 `source_file` 为单选）。
5) **向量化入口（独立）**
   - 流程：选择已完成文档 → 点击“查看详情”进入独立详情页 → 选择 chunk → 右上角“开始向量化”。
   - 详情页为**正方形切片卡片网格**（展示切分文字摘要），不采用列表下方展开。
   - 详情页支持“筛选模式”：单点选择、全选/清空、删除；删除前弹窗确认，确认后前端缓存同步，用于确认向量化对象。
   - 允许状态：`初始/已确认` 可选，`已向量化/废弃` 禁选。
   - 配置弹窗：仅向量模型选择（来源 Settings-文本切分-向量模型）；其余参数读取该模型配置；默认选中已保存项，禁空；提供“返回重新配置”跳转 Settings。
   - 接口：`/api/chunks/vectorize/batch`（批量）与 `/api/chunks/{chunk_id}/vectorize`（单个）。

策略配置（独立页面，已落地）：
- 展示切分参数（来源 `config.py` 环境变量），支持保存草稿。
- 点击“开始切分”后，对选中文档逐个触发 `/process`，完成后回到“切分文档”列表。

模块目录：
- `frontend/app/src/modules/document-segmentation/`（`SegmentationPage` 内包含列表/策略/结果 UI）
备注：
- **切分状态已按知识库隔离**（文档/结果/标签/向量化进度按 knowledgeBaseId 分桶，并持久化到本地缓存）。

#### 生命周期状态聚合（解析 / 切分 / 索引）
目标：解析、切分、索引构建三段状态在“文件系统 / 文档列表 / 切分页 / 索引入口”中保持一致。
- 聚合策略：新增统一聚合 hook（如 `useDocumentLifecycle(baseId)`），按 `docId` 合并：
  - 解析：来自 `documentStore`
  - 切分：来自 `segmentationState.documents` + `segRun` 进行中覆盖
  - 向量化：来自 `chunksByDoc` + `vectorRun` 进行中覆盖
  - 索引构建：来自 `extractionTasks`（按 `selection.docIds` 归档 docId，取最新任务）
- 仅聚合读取，不回写各自 store，避免相互污染；按 knowledgeBaseId 分桶，刷新仍可恢复。
- 展示层改造：
  - 文件系统：增加“解析/切分/索引”状态 badge（或单列“流程状态”）+ 快捷入口（去切分/去索引/查看进度）。
  - 文档列表：使用同一聚合状态，保证与切分/索引一致。
  - 文本切分：列表来源仍为已解析文档，但状态使用聚合 `segStatus`。
  - 索引构建：入口列表来源仍为已切分文档，但状态使用聚合（未切分/已切分/构建中/已完成）。

### 4.7 抽取链路（规划中 UI）
依据：`kiveiv-business/extract`  
说明：抽取基于切分后的 chunk（不依赖向量化）；标签筛选默认 AND；抽取结果按标签叠加累积。  
二级菜单（规划 IA）：
1) **抽取任务（入口页）**
   - 入口包含“新增抽取任务 / 历史任务覆盖”。
   - 新增抽取任务：左右卡片“切片抽取 / Excel 抽取”（类似双卡入口）。
   - 切片抽取进入已切分文档列表 → 文档详情（chunk 卡片）。
   - 列表与详情均支持筛选/全选/清除。
   - 选择抽取范围后进入配置流程。
   - 历史任务覆盖：选择历史图结构或历史结构化（仅已完成任务可选，单选）。
     - 抽取参数锁定为历史值（前端不可改），仅允许重新选择模型。
     - 图结构：仅支持切片抽取；需再次选择文档/部分 chunk。
     - 结构化：支持切片抽取或 Excel 抽取；切片抽取同样需选文档/部分 chunk。
     - Excel 抽取需提示“表头不一致将新增列”，并给出对比确认。
     - 覆盖逻辑：创建“基于历史参数的新任务”，覆盖同名结果视图。
2) **抽取结果（任务列表/详情）**
   - 任务列表（状态/进度/来源：chunk 抽取 or Excel 自动完成）
   - 任务类型：图结构 / 结构化
   - 任务详情直接跳转对应子页面（图结构/结构化），顶部展示任务概览卡片
   - 支持查看进度弹窗
3) **图结构抽取**
   - 三元组结果表、节点/边统计、关系类型分布、溯源到 chunk
   - 精确抽取：支持三元组参考提示词或 md 上传（占位）
4) **图谱聚合**
   - 用户选择已完成图结构抽取结果进行聚合（非必须全量）
   - 图谱查询/可视化统一在此页（Network Graph 占位 + 查询过滤占位）
5) **结构化抽取**
   - Excel：表头即字段；chunk：支持自定义字段配置
   - 精确抽取：支持表头提示词或 xlsx/xls 表头参考（占位）
   - 结构化结果预览与导出占位
6) **结果与导出**
   - 图谱/表格导出、版本快照、溯源入口（无条目则标记“待补”）

切片抽取配置流程（分步）：
- 选择抽取方式（精确 / 模糊，单选）
- 选择抽取类型（图结构 / 结构化，单选）
- 精确抽取：
  - 图结构：上传三元组参考内容（提示词或 md）
  - 结构化：定义字段头（提示词或 xlsx/xls 表头参考）
- 模糊抽取：
  - 选择文档标签（多选，默认 AND）
  - 系统自动生成抽取提示词
> 历史任务覆盖模式下跳过“方式/类型”选择，参数与历史保持一致，仅保留模型选择。

Excel 抽取说明：
- 仅支持上传 xlsx/xls
- 仅支持精确 + 结构化，不需选择抽取方式/类型
- 默认按表头抽取结构化结果，需提供“合规 Excel 格式说明”
> 历史结构化 + Excel 抽取时需提示“表头不一致将新增列”。

预期模块目录：
- `frontend/app/src/modules/extraction/`（待新增）
备注：
- **抽取任务/结果/进度已按知识库隔离**（按 knowledgeBaseId 分桶并持久化到本地缓存）。

### 4.8 智能问答链路（规划中 UI）
依据：`kiveiv-business/qa`  
说明：智能问答**不做二级菜单**，采用单页三栏对话布局。

单页三栏规划（UI 结构）：
1) **左侧：会话列表**
   - 新建对话 + 历史会话列表（支持搜索/时间分组/置顶）。
   - 会话项显示：标题、更新时间、模型、来源标签（图结构/结构化/外搜）。
2) **中间：对话与溯源（核心）**
   - 支持流式输出（逐字更新）。
   - 支持“思考/工具调用路径”白盒展开。
   - **知识源溯源内嵌于对话区**：每条回答附来源卡片（可折叠），包含来源类型、任务/文件、chunk/片段、得分；回答正文支持引用角标跳转来源。
3) **右侧：配置面板**
   - 模型配置：已保存的智能问答模型下拉选择。
   - 工具配置：多选 + 搜索（如 Tavily / GraphQuery / SQLQuery / DocSearch）。
   - 知识源配置：多选 + 搜索；来源于索引构建已完成任务（图结构/结构化）。
   - 底部操作：保存配置并应用 / 重置。

Mock 数据建议：
- Case A：闲聊（无检索，无溯源）。
- Case B：结构化单源（字段 + 行摘要）。
- Case C：图结构 + 结构化混合（多来源 + 引用角标）。
- Case D：外搜 + 本地知识（工具调用路径 + 外搜卡片）。
- Case E：澄清问题（clarification 消息类型）。

预期模块目录：
- `frontend/app/src/modules/intelligent-qa/`（当前仅有占位 `index.js`，需新增组件）

### 4.9 Excel 抽取链路（规划中 UI）
依据：`kiveiv-business/excel`  
说明：Excel 抽取不单独做前端模块。入口复用文档上传，由后端识别 Excel 并进入抽取 pipeline，默认完成抽取任务。
前端仅承担：
- 上传入口复用（`DocumentUpload` 允许 Excel 并交由后端处理）。
- 进度/状态展示（在文档列表或详情页标记“Excel 抽取中/完成”）。
- 抽取结果展示（结构化 + 图结构；图结构三元组基于 Excel 表头字段抽取）。
不新建独立模块目录。
当前差异：
- 现有前端上传逻辑会阻断 Excel（提示“Excel 文件请使用 Excel 抽取模块导入”），需调整为允许上传并交由后端处理。

## 5. Mock API 设计（前端 stub）
> 仅用于前端联调与流程演示；真实接口由后端同学实现。

- `frontend/app/src/services/documentApi.js`
  - `uploadDocument(file, options)`
  - `listDocuments()`
  - `getDocumentDetail(documentId)`
  - `getDocumentContent(documentId)`
  - `getDocumentPreview(documentId)`
  - `deleteDocument(documentId)`
  - `reparseDocument(documentId, config)`

## 6. 模块路由与页面组织
前端采用单页模块切换（非实际路由）：
- `ModulePage` 内部通过 `activeSection` / `activeDocumentTab` 切换模块。
- 文档模块子页：
  - 上传：`document-upload`
  - 解析：`document-processing`
  - 编辑：`document-edit`
  - 列表：`document-list`

## 7. 当前实现清单（核心文件）
### 文档解析
- `frontend/app/src/modules/document-parsing/DocumentUpload.jsx`
- `frontend/app/src/modules/document-parsing/DocumentList.jsx`
- `frontend/app/src/modules/document-parsing/DocumentProcess.jsx`
- `frontend/app/src/modules/document-parsing/parseStrategyPanels.js`
- `frontend/app/src/modules/document-parsing/DocumentViewer.jsx`
- `frontend/app/src/modules/document-parsing/DocumentEditor.jsx`
- `frontend/app/src/modules/document-parsing/documentStore.jsx`
- `frontend/app/src/modules/document-parsing/sampleContent.js`

### 设置模块
- `frontend/app/src/modules/settings/SettingsPage.jsx`
- `frontend/app/src/modules/settings/SettingsStore.jsx`
- `frontend/app/src/modules/settings/constants.js`

### 文本切分
- `frontend/app/src/modules/document-segmentation/components/SegmentationPage.jsx`
- `frontend/app/src/modules/document-segmentation/index.js`

### Mock API
- `frontend/app/src/services/documentApi.js`

### 页面入口
- `frontend/app/src/App.jsx`
- `frontend/app/src/modules/ModulePage.jsx`

### 占位模块（待实现 UI）
- `frontend/app/src/modules/intelligent-qa/index.js`
- `frontend/app/src/modules/index-building/index.js`

## 8. 关键修改摘要（需求对齐）
- 解析链路仅保留端到端解析（禁用 VLM）。
- 解析策略二级菜单移除，解析模型改为文档解析详情页下拉选择（来源 Settings 文档解析模型，默认选中、禁空，含“返回重新配置”）。
- Settings 模块仅保留模型管理配置（不包含业务配置）。
- 文本切分模型分为 LLM/向量两类占位；索引构建模型改为 LLM 占位。
- 语义切分“开始切分”弹窗选择 LLM；向量化弹窗仅选择向量模型，其他参数读取配置。
- 文档上传当前仍阻断 Excel（计划调整为自动抽取联动）。
- 加入 mock API stub（文档上传/列表/详情/预览/删除/重解析）。
- 文本切分流程改为“切分文档→独立策略页→结果”的规范并已实现。

## 9. 后续可做（前端）
- 对齐模型选择弹窗与筛选逻辑（文档解析/语义切分/向量化）并打通 Settings 模型配置来源。
- 将索引构建模型类型从向量模型改为 LLM（占位配置与选择）。
- 文本切分与后端接口联调（文档状态、切分触发、chunk 列表、日志、向量化）。
- 根据 `kiveiv-business/extract` 设计并实现“抽取”页面 UI。
- 根据 `kiveiv-business/qa` 设计并实现“智能问答”页面 UI。
- 调整 Excel 上传为自动抽取联动（结构化 + 图结构），补充抽取结果展示。
- 将 `DocumentList / DocumentViewer / DocumentEditor` 与 `documentApi` mock 做完整联动。
- Settings 的配置持久化（本地存储或 mock API）。
- 模块页文案与样式微调，确保完全贴合设计系统规范。
