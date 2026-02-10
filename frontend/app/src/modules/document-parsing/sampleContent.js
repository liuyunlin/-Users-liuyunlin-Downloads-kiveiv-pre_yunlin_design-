export const SAMPLE_SEGMENTS = [
  {
    idSuffix: 'P2-SOLUTION',
    page: 2,
    title: '非结构化文档精准解析方案',
    text: '以“数据驱动 + 算法赋能”为核心，构建从数据接入、模型构建、知识管理到问答检索的全流程。一体化平台覆盖文档上传、解析、结构化、检索与应用，帮助企业快速释放文档价值。'
  },
  {
    idSuffix: 'P2-CAPABILITY',
    page: 2,
    title: '平台能力概览',
    text: '支持数据和服务资源注册及跨域资源空间构建；提供基于元数据的资源查询与权限管理；具备主题库、知识库与多模态配置能力；兼顾上传、订阅、协作、审批等运营场景；支持数据校验与模型可靠性评估。'
  },
  {
    idSuffix: 'P3-DATA-ROLE',
    page: 3,
    title: '数据是企业的关键资产',
    text: '数据决定模型的质量，是构建智能化能力的基础。通过构建统一的企业数据中台，汇聚多源文档，结合高质量标注与持续更新的数据治理流程，保证解析模型的准确性与可追溯性。'
  },
  {
    idSuffix: 'P3-APPLICATION',
    page: 3,
    title: '行业应用实践',
    text: '在政务档案、金融合同、制造图纸、医学影像等场景中，通过多模态解析 + 领域知识库，为审核比对、合规校验、问答辅助等业务提供实时支撑，显著提升文档处理效率与准确率。'
  }
]

export function buildSegmentsForDocument(document) {
  const docId = document?.id || 'DOC'
  return SAMPLE_SEGMENTS.map((item, index) => ({
    id: `${docId}-${item.idSuffix || index + 1}`,
    page: item.page,
    title: item.title,
    text: item.text,
    bbox: {
      top: 12 + index * 18,
      left: 8,
      width: 84,
      height: 12
    }
  }))
}
