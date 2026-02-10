export const PARSE_STRATEGY_PANELS = [
  {
    id: 'parse-engine',
    title: '端到端解析模型',
    description: '仅允许端到端模型，禁止 VLM。',
    options: ['MinerU', 'PaddlePaddleOCR']
  },
  {
    id: 'preview-mode',
    title: '预览生成',
    options: ['开启', '关闭'],
    defaultValue: '开启'
  },
  {
    id: 'output-format',
    title: '解析输出格式',
    options: ['Markdown', 'HTML', 'JSON'],
    defaultValue: 'Markdown'
  }
]
