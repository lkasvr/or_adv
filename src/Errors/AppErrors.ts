export default class AppError {
  public readonly message: string;
  public readonly httpStatusCode: number;
  public readonly internalErrorCode: number;

  constructor(
    message: string,
    httpStatusCode: number,
    internalErrorCode: number,
  ) {
    this.message = message;
    this.httpStatusCode = httpStatusCode;
    this.internalErrorCode = internalErrorCode;
  }
}

// ERROR'S
export class UnknownError extends AppError {
  public readonly error: unknown;

  constructor(error: unknown, message?: string) {
    super(`${message ?? 'Unknown Error'}`, 404, 2111);
    this.error = error;
  }

  public toString() {
    return `
    INTERNAL APP ERROR CODE:
    ${this.internalErrorCode} |
    HTTP CODE: ${this.httpStatusCode} |
    MESSAGE: ${this.message} |
    UNKNOWN ERROR:
    ${JSON.stringify(this.error)}
    `;
  }
}

// EXCEPTION'S
type ExpiredExceptionEntities = 'TOKEN';
export class ExpiredException extends AppError {
  public readonly entity: ExpiredExceptionEntities;
  public readonly expirationDate: Date;

  constructor(
    expiredEntity: ExpiredExceptionEntities,
    message: string,
    httpStatusCode: number,
    expirationDate: Date,
  ) {
    super(message, httpStatusCode, 5);
    this.entity = expiredEntity;
    this.expirationDate = expirationDate;
  }
}

export class UnauthenticatedException extends AppError {
  constructor(message: string, httpStatusCode: number) {
    super(message, httpStatusCode, 211);
  }
}

/**
 * ___________________________________________________________
 *
 * STATUS CODE ERRORS/EXCEPTIONS GLOSSARY
 * + AppError - 1
 *    Description: generic and global application know error
 *
 * + ExpiredException - 5
 *    Description: time expiration error
 *
 * + UnauthenticatedException - 211
 *    Description: unauthenticated
 *
 * + UnknownError - 2111
 *    Description: Any kind unknow error
 */
