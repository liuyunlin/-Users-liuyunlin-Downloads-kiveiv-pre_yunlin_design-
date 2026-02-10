# Kiveiv 设计系统规范调用

## 概述

> Kiveiv 采用黑白灰配色风格，本文档中示例的 `indigo/primary` 仅代表“强调色占位”，实际实现需替换为 `gray/black` 体系。

本文档记录了 Kiveiv 前端项目的设计规范，包括间距、圆角、文字大小、布局等规范。所有新开发的组件和页面都应遵循此规范。

## 页面布局规范

### 1. 首页布局
- **外容器**: `min-h-screen bg-zinc-50 dark:bg-zinc-900`
- **内容区域**: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8`
- **卡片组件**: `Card` 组件，圆角为 `rounded-lg`
- **卡片间距**: 使用 `space-y-8` (32px)

### 2. 预览页布局 (六个组件页面)
- **外容器**: `min-h-screen bg-zinc-50 dark:bg-zinc-900`
- **内容区域**: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8`
- **面包屑导航**: `mb-8` (32px 底部边距)
- **卡片间距**: `space-y-9` (36px)
- **卡片圆角**: `rounded-lg`

### 3. 详情页布局 (参考 TopNavigation.jsx)
- **外容器**: `min-h-screen bg-gray-50`
- **内容区域**: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8`
- **面包屑导航**: `mb-8` (32px 底部边距)

## 间距规范

### 页面标题组件间距规范 (核心规范)

#### 主要元素间距
- **主要元素之间**: `8px` (如：标题到标签行，标题到按钮区域)
  - 实现方式: `style={{marginTop: '8px'}}`
- **面包屑到主标题**: `24px` (面包屑导航到页面标题)
  - 实现方式: `style={{marginBottom: '24px'}}`
- **模块上沿到面包屑**: `24px` (容器内边距)
  - 实现方式: `className="p-6"` (24px)

#### 副标题/附属内容间距
- **标题到副标题**: `4px` (如：姓名到职位描述)
  - 实现方式: `style={{marginTop: '4px'}}`
- **同类元素换行间距**: `2px` (如：标签换行时的垂直间距)
  - 实现方式: `gap: '2px 16px'` (垂直2px，水平16px)
- **统计数字到标签**: `2px` (数字到下方文字标签)
  - 实现方式: `style={{marginTop: '2px'}}`

#### ⚠️ 关键对齐规范 (最容易出错的部分)
- **Logo/头像与按钮对齐**: Logo/头像顶部必须与右侧按钮顶部对齐
  - ✅ 使用 `lg:items-start` 而非 `lg:items-center`
  - ✅ 使用 `min-w-0 flex-1` 确保左侧内容占据剩余空间
  - ✅ 必要时使用像素级微调: `style={{marginTop: '2px'}}`
  - ❌ 避免使用 `items-center` 导致垂直居中而非顶部对齐
- **左右内容对齐**: 使用 `lg:justify-between` 确保左右内容分布
- **面包屑导航对齐**: 面包屑元素与主标题严格左对齐
- **文本基线对齐**: 所有同级标题使用相同的字体大小和行高
- **Logo尺寸规范**: 
  - 标准Logo: `h-14 w-14` (56px)
  - 头像尺寸: `size="xl"` 对应合适尺寸
  - 内部图标: `h-8 w-8` (32px)

### 详情页间距系统
- **标题到预览模块**: `24px` (标题和内容之间的间距)
- **预览模块到下一个标题**: `56px` (不同组件区块之间的间距)
- **实现方式**: 
  - 标题容器: `style={{marginBottom: '24px'}}`
  - 组件容器: `style={{marginBottom: '56px'}}`

### 预览页间距
- **卡片间距**: `36px` (space-y-9)

### 首页间距
- **卡片间距**: `32px` (space-y-8)

### 面包屑导航间距
- **底部边距**: `32px` (mb-8)

## 布局组件规范

### 详情页标题栏 (Header)
- **布局**: `flex items-center justify-between`
- **底部间距**: `24px`
- **标题样式**: `text-2xl font-semibold` + `color: '#000311'`
- **右侧切换按钮**:
  - 容器: `flex items-center space-x-1 bg-gray-100 rounded-lg p-1`
  - 按钮: `px-4 py-2 text-sm font-medium rounded-md`
  - 激活状态: `bg-white text-gray-900 shadow-sm`
  - 非激活状态: `text-gray-500 hover:text-gray-700`

### 预览容器规范
- **基础样式**: `border border-gray-200 rounded-lg bg-white overflow-x-auto relative`
- **最小高度**: `minHeight: '300px'`
- **底部内边距**: `paddingBottom: '100px'` (为下拉菜单预留空间)
- **内容容器**: `min-w-fit`

### 代码显示区域
- **容器**: `bg-gray-900 rounded-lg p-4 overflow-x-auto`
- **代码样式**: `text-sm text-gray-100`
- **字体**: `ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace`

## 圆角规范
- **卡片组件**: `rounded-lg` (8px)
- **代码容器**: `rounded-lg` (8px)  
- **预览容器**: `rounded-lg` (8px)
- **切换按钮**: `rounded-lg` (外层容器) + `rounded-md` (内部按钮)

## 文字规范

### 标题层级
- **页面主标题**: `text-2xl font-semibold` + `color: '#000311'`
- **卡片标题**: `text-xl font-semibold` + `color: '#000311'`
- **小节标题**: `text-lg font-semibold` + `color: '#000311'`
- **代码示例标题**: `text-sm font-medium text-gray-900`

### 页面标题组件文字规范
- **主标题**: `text-xl font-semibold text-gray-900`
- **副标题/描述**: `text-sm text-gray-500`
- **统计数字**: `text-xl font-semibold text-gray-900`
- **统计标签**: `text-xs text-gray-500`

### 正文文字
- **正文**: `text-sm`
- **描述文字**: `text-sm text-zinc-600`
- **代码文字**: `text-sm text-gray-100`

## 颜色规范

### 主色调
- **主要文字颜色**: `#000311`
- **背景色**: 
  - 浅色模式: `bg-gray-50` / `bg-zinc-50`
  - 深色模式: `bg-zinc-900`
- **卡片背景**: `bg-white`

### 导航栏颜色 (三种样式)
- **默认样式**: 
  - 背景: `bg-white`
  - 边框: `border-b border-gray-200`
  - 文字: `text-gray-900`
  - 强调色: `text-indigo-600`
  - Logo: SVG `text-indigo-600`, 文字 `text-gray-900`

- **深色样式**:
  - 背景: `bg-gray-900`
  - 边框: `border-b border-gray-700`
  - 文字: `text-white`
  - 强调色: `text-indigo-400`
  - Logo: SVG `text-white`, 文字 `text-white`

- **品牌样式**:
  - 背景: `bg-indigo-600`
  - 边框: `border-b border-indigo-500`
  - 文字: `text-white`
  - 强调色: `text-indigo-200`
  - Logo: SVG `text-white`, 文字 `text-white`

## 页面标题组件布局规范

### 基础布局结构
```jsx
<div className="lg:flex lg:items-start lg:justify-between p-6">
  <div className="flex items-start min-w-0 flex-1">
    {/* Logo/头像区域 */}
    <div className="flex-shrink-0" style={{marginTop: '2px'}}>
      {/* Logo或头像内容 */}
    </div>
    <div className="ml-4">
      {/* 标题和副标题内容 */}
    </div>
  </div>
  <div className="flex lg:mt-0 lg:ml-4">
    {/* 按钮区域 */}
  </div>
</div>
```

### 按钮规范
- **按钮间距**: `mr-2` (8px)
- **主要按钮**: `Button color="blue"`
- **次要按钮**: `Button color="white"`
- **按钮对齐**: 与标题顶部对齐，避免垂直居中

### Badge组件规范
- **成功状态**: `<Badge color="green">状态文字</Badge>`
- **包装间距**: 在flex容器中使用 `gap: '2px 16px'`
- **与图标配合**: 图标使用 `mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400`

### 组件引用规范
- **Button组件**: `import { Button } from '../ui/button'`
- **Badge组件**: `import { Badge } from '../ui/badge'`
- **UserProfileAvatar组件**: `import { UserProfileAvatar } from '../UserProfileAvatar'`

## 交互组件规范

### 切换按钮组 (Preview/Code 切换)
- **容器**: `bg-gray-100 rounded-lg p-1`
- **按钮间距**: `space-x-1`
- **按钮样式**: `px-4 py-2 text-sm font-medium rounded-md transition-colors`
- **激活状态**: `bg-white text-gray-900 shadow-sm`
- **非激活状态**: `text-gray-500 hover:text-gray-700`

### React/HTML 代码类型切换
- **按钮样式**: `px-3 py-1 text-xs rounded-md transition-colors`
- **激活状态**: `bg-indigo-100 text-indigo-700 border border-indigo-200`
- **非激活状态**: `bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200`

## 面包屑导航规范
- **容器**: `nav className="flex mb-8" aria-label="Breadcrumb"`
- **列表**: `ol className="flex items-center space-x-4"`
- **首页图标**: `h-5 w-5 flex-shrink-0`
- **分隔符**: `h-5 w-5 flex-shrink-0 text-gray-300`
- **文字样式**: `text-sm font-medium`
- **hover 效果**: `hover:text-gray-500 transition-colors`

## 响应式规范
- **断点**: 使用 Tailwind 标准断点 `sm:` `lg:`
- **内容区域**: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- **最小宽度**: 导航栏预览区域使用 `minWidth: '900px'` 确保内容完整显示

## Logo 和图标规范
- **Logo SVG**: `h-8 w-8` 
- **公司名称**: `ml-2 text-lg font-semibold`
- **通知图标**: `h-6 w-6`
- **用户头像**: `h-8 w-8 rounded-full`
- **面包屑图标**: `h-5 w-5`

## 代码生成规范
- **React 代码**: 使用 `className` 属性
- **HTML 代码**: 使用 `class` 属性
- **动态样式**: 根据 style 参数生成对应的颜色类名
- **代码格式**: 保持适当的缩进和换行，确保可读性

## 状态管理规范
- **独立状态**: 每个组件实例使用独立的状态对象，避免状态干扰
- **状态结构**: 使用对象形式 `{[key]: value}` 管理多个实例的状态
- **更新方式**: 使用扩展运算符保持不变性 `prev => ({...prev, [key]: newValue})`

---

## 常见错误和解决方案

### 对齐问题
❌ **错误做法**: 
- 使用 `items-center` 导致Logo/头像垂直居中
- 忘记使用 `min-w-0 flex-1` 导致右侧按钮无法正确对齐
- 使用 `sm:flex` 而非 `lg:flex` 导致响应式问题

✅ **正确做法**:
- 始终使用 `lg:items-start lg:justify-between`
- 左侧内容使用 `min-w-0 flex-1`
- 像素级微调使用 `style={{marginTop: 'Xpx'}}`

### 间距问题
❌ **错误做法**:
- 混用不同的间距值（如：有的地方用4px，有的用6px）
- 面包屑到标题使用8px而非24px
- 按钮使用mr-3而非mr-2

✅ **正确做法**:
- 严格遵循8px、4px、2px的间距体系
- 面包屑必须使用24px间距
- 同类元素换行使用2px垂直间距

### 组件大小问题
❌ **错误做法**:
- Logo使用h-12 w-12或h-16 w-16
- 头像使用size="lg"或size="2xl"

✅ **正确做法**:
- Logo统一使用h-14 w-14
- 头像统一使用size="xl"

## 应用指南

1. **新建页面标题组件**: 严格参照现有的6种样式模板
2. **对齐检查**: 开发完成后必须检查Logo/头像与按钮的顶部对齐
3. **间距验证**: 使用浏览器开发工具测量间距是否符合规范
4. **响应式测试**: 确保在lg断点下布局正确
5. **代码复用**: 优先使用现有的样式模板，避免创建新的变体


## 详情页展示规范

### 组件预览展示原则
- **纯净展示**: 组件预览必须直接展示组件本身，是否添加圆角矩形看情况分析
- **原生样式**: 严格按照 Tailwind CSS 官方样式实现，不得修改或包装原始设计
- **容器原则**: 预览区域中，组件应该直接渲染，避免嵌套不必要的包装容器

### 内容语言规范
- **示例内容**: 优先使用英文作为组件示例内容，与 Tailwind 官方保持一致
- **组件名称**: 可以使用中文作为组件分类和说明，但组件内部示例内容建议使用英文
- **代码示例**: React 和 HTML 代码示例必须与预览完全一致

### 详情页布局标准
- **预览区域**: `{renderComponentPreview(key)}` 直接渲染，不套额外容器
- **代码区域**: 提供 React 和 HTML 两种格式，确保与预览一致
- **切换控件**: 使用标准的 Preview/Code 切换按钮
- **响应式**: 组件预览必须支持响应式设计，遵循 Tailwind 断点规范

### 预览页布局标准
- **预览页展示**: 组件在预览页中应去除外层容器（如 `bg-white shadow sm:rounded-lg`），直接展示组件内容
- **内容提取**: 从详情页的完整组件中提取核心内容部分，去掉装饰性容器
- **布局保持**: 保持组件的核心布局和交互，但移除背景、阴影、圆角等装饰样式

### 实现示例模板

#### 详情页组件渲染（完整版本）
```jsx
// ✅ 详情页 - 包含完整容器
const renderComponentPreview = (style) => {
  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="sm:flex sm:items-start sm:justify-between">
          <div>
            <h3 className="text-base font-semibold leading-6 text-gray-900">
              Team Members
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Manage who has access to your account.
            </p>
          </div>
          <div className="mt-4 sm:ml-6 sm:mt-0 sm:flex-shrink-0">
            <button className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm">
              Add member
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
```

#### 预览页组件渲染（内容版本）
```jsx
// ✅ 预览页 - 仅核心内容，无装饰容器
<CardContent className="p-6">
  <div className="sm:flex sm:items-start sm:justify-between">
    <div>
      <h3 className="text-base font-semibold leading-6 text-gray-900">
        Team Members
      </h3>
      <p className="mt-1 text-sm text-gray-500">
        Manage who has access to your account.
      </p>
    </div>
    <div className="mt-4 sm:ml-6 sm:mt-0 sm:flex-shrink-0">
      <button className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm">
        Add member
      </button>
    </div>
  </div>
</CardContent>
```

#### 错误示例
```jsx
// ❌ 错误做法 - 预览页添加多余容器
<CardContent>
  <div className="border border-red-500 rounded-lg p-4"> {/* 多余的装饰容器 */}
    <div className="bg-white shadow sm:rounded-lg"> {/* 不应在预览页使用 */}
      ...
    </div>
  </div>
</CardContent>
```

### 详情页容器使用规范

#### 何时需要圆角矩形容器
- **无背景色组件**: 当组件本身没有背景色时，详情页必须添加圆角矩形容器 `bg-white rounded-lg p-6 shadow-sm`
- **浅色背景组件**: 当组件使用浅色或透明背景时，需要容器来提供视觉边界
- **纯文本内容**: 当组件主要是文本内容而缺乏视觉分割时，需要容器支撑

#### 何时不需要圆角矩形容器
- **有背景色组件**: 当组件自带深色或有色背景时（如卡片、图片、彩色区块），不需要额外容器
- **完整卡片组件**: 当组件本身就是完整的卡片设计时，直接展示即可
- **图片/媒体组件**: 横幅图片、头像等媒体组件不需要额外容器

#### 实现规范
```jsx
// ✅ 需要容器的组件（如文本类页面标题）
{(activeTabs[key] || 'preview') === 'preview' ? (
  <div className="bg-white rounded-lg p-6 shadow-sm">
    {renderPageHeadingPreview(key)}
  </div>
) : (
  // 代码展示区域
)}

// ✅ 不需要容器的组件（如有背景的卡片）
{(activeTabs[key] || 'preview') === 'preview' ? (
  <div className="space-y-6">
    {renderCardPreview(key)}
  </div>
) : (
  // 代码展示区域
)}
```

### 关键注意事项
1. **保持纯净**: 预览展示必须与 Tailwind 官方示例完全一致
2. **避免过度包装**: 不得为了美观而添加额外的装饰容器
3. **响应式优先**: 使用 Tailwind 原生的响应式类名（sm:, md:, lg:）
4. **代码一致性**: 生成的代码必须与预览组件完全匹配
5. **容器判断**: 根据组件是否有背景色决定是否需要详情页容器
6. **文本大小**: 页面标题主标题使用 `text-xl` 和 `sm:text-2xl`，而非更大的尺寸

---

**此规范将持续更新，所有开发者都应严格遵循此文档进行开发。**
**特别注意: 页面标题组件的对齐问题是最容易出错的地方，开发时务必仔细检查！**
