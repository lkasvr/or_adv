export default class StrapiRestAPIResponseError {
  public readonly data: null = null;
  public readonly error: Error | null;

  constructor(error: Error | null) {
    this.error = error;
  }
}

// EXCEPTION'S
type ExpiredExceptionEntities = 'TOKEN';
export class ExpiredException {
  public readonly message: string;
  public readonly entity: ExpiredExceptionEntities;
  public readonly expirationDate: Date;

  constructor(
    message: string,
    expiredEntity: ExpiredExceptionEntities,
    expirationDate: Date,
  ) {
    this.message = message;
    this.entity = expiredEntity;
    this.expirationDate = expirationDate;
  }
}

// STRAPI ERROR TYPE
export type Error = {
  status: string; // HTTP status
  name: 'ApplicationError' | 'ValidationError'; // Strapi error name ('ApplicationError' or 'ValidationError')
  message: string; // A human readable error message
  details: {
    // error info specific to the error type
  };
};
