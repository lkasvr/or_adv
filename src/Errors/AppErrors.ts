export default class AppError {
  public readonly message: string;
  public readonly statusCode: number;

  constructor(message: string, statusCode: number) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

// ERROR'S
export class UnknownError extends AppError {
  public readonly error: unknown;

  constructor(error: unknown, message?: string) {
    super(`${message ?? 'Unknown Error'}`, 0);
    this.error = error;
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
    expirationDate: Date,
  ) {
    super(message, 5);
    this.entity = expiredEntity;
    this.expirationDate = expirationDate;
  }
}

export class UnauthenticatedException extends AppError {
  constructor(message: string) {
    super(message, 401);
  }
}

/**
 * ATTENTION
 * Existing errors like Http will follow the respective codes.
 * ___________________________________________________________
 *
 * STATUS CODE ERRORS/EXCEPTIONS GLOSSARY
 * + AppError - 1
 *    Description: generic and global application know error
 *
 *
 * + ExpiredError - 5
 *    Description: time expiration error
 *
 * + UnknownError - 0
 *    Description: Any kind unknow error
 */
