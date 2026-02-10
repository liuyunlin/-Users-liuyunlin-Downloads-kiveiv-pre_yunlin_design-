const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export async function uploadDocument(file, options = {}) {
  await sleep(600)
  return {
    success: true,
    doc_id: `DOC-${Date.now()}`,
    version_id: 1,
    message: 'Mock upload success',
    error: null,
    file_name: file?.name,
    ...options
  }
}

export async function listDocuments({ limit = 20, offset = 0 } = {}) {
  await sleep(300)
  return {
    success: true,
    documents: [],
    total: 0,
    limit,
    offset,
    error: null
  }
}

export async function getDocumentDetail(docId) {
  await sleep(300)
  return {
    success: true,
    document: {
      id: docId,
      name: 'Mock document',
      original_filename: 'mock.pdf',
      size: 1024,
      mime_type: 'application/pdf',
      page_count: 0,
      word_count: 0
    },
    versions: [],
    parsing_result: null,
    error: null
  }
}

export async function getDocumentContent(docId, contentType = 'markdown') {
  await sleep(300)
  return {
    success: true,
    doc_id: docId,
    version_id: 1,
    content_type: contentType,
    content: '',
    error: null
  }
}

export async function getDocumentPreview(docId) {
  await sleep(300)
  return {
    success: true,
    doc_id: docId,
    previews: [],
    error: null
  }
}

export async function deleteDocument(docId) {
  await sleep(300)
  return {
    success: true,
    message: 'Mock delete success',
    error: null,
    doc_id: docId
  }
}

export async function reparseDocument(docId, options = {}) {
  await sleep(500)
  return {
    success: true,
    doc_id: docId,
    message: 'Mock reparse success',
    error: null,
    ...options
  }
}
