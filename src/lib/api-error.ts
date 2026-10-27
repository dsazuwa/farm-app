export type ApiErrorCode =
  | 'SAME_PASSWORD'
  | 'WEAK_PASSWORD'
  | 'INVALID_SESSION'
  | 'RATE_LIMITED'
  | 'REQUEST_FAILED';

export class ApiError extends Error {
  public readonly code: ApiErrorCode;

  constructor(code: ApiErrorCode, message: string) {
    super(message);
    this.name = 'ApiError';
    this.code = code;
  }
}
