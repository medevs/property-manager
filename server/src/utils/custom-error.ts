interface ValidationError {
  field: string;
  message: string;
}

export class CustomError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public status: string = 'error',
    public errors?: ValidationError[]
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFoundError extends CustomError {
  constructor(message: string = 'Resource not found') {
    super(message, 404, 'not found');
  }
}

export class BadRequestError extends CustomError {
  constructor(message: string = 'Bad request', errors?: ValidationError[]) {
    super(message, 400, 'bad request', errors);
  }
}