export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface ChatSendRequest {
  message: string;
  sessionId?: string;
}

export interface ChatSendResponse {
  messageId: string;
  content: string;
}
