const API_BASE_URL = 'http://localhost:8000'

export const apiUrls = {
  document: (id = null) =>
    `${API_BASE_URL}/documents/` + (id !== null ? id + '/' : ''),
  tag: (id = null) => `${API_BASE_URL}/tags/` + (id !== null ? id + '/' : ''),
}
