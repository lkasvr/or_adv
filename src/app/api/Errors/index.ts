export default class StrapiRestAPIResponseError {
  public readonly data: null = null;
  public readonly error: Error | null;

  constructor(error: Error | null) {
    this.error = error;
  }
}

// STRAPI ERROR TYPE
export type Error = {
  status: string; // HTTP status
  name: 'ApplicationError' | 'ValidationError' | 'UnauthorizedError'; // Strapi error name ('ApplicationError' or 'ValidationError')
  message: string; // A human readable error message
  details: any; // error info specific to the error type
};
