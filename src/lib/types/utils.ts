// Based on API Documentation Common Response Format
export interface ApiResponse<T = unknown> {
  success: boolean;
  code: number;
  message: string;
  data: T | null;
  metadata: {
    pagination?: {
      page: number;
      pageSize: number;
      totalPages: number;
      totalItems: number;
    };
  } | null;
}
