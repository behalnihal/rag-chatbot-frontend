// API configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const API_ENDPOINTS = {
  CHAT: `${API_BASE_URL}/api/chat`,
  HISTORY: (sessionId) => `${API_BASE_URL}/api/history/${sessionId}`,
  CLEAR: (sessionId) => `${API_BASE_URL}/api/clear/${sessionId}`,
};

export default API_BASE_URL;
