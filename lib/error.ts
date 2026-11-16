// =============== API Related Error =============== //

type ApiErrorParams = {
  message: string;
  statusCode: number;
  name: string;
};

export class ApiError extends Error {
  public readonly statusCode: number;

  constructor(params: ApiErrorParams, options?: ErrorOptions) {
    super(params.message, options);
    this.name = params.name;
    this.statusCode = params.statusCode;

    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class NotFoundError extends ApiError {
  constructor(message = "Not found") {
    super({
      message,
      name: new.target.name,
      statusCode: 404,
    });
  }
}

export class ForbiddenError extends ApiError {
  constructor(message = "Forbidden") {
    super({
      message,
      name: new.target.name,
      statusCode: 403,
    });
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message = "Unauthorized") {
    super({
      message,
      name: new.target.name,
      statusCode: 401,
    });
  }
}

export class InternalServerError extends ApiError {
  constructor(message = "Internal server error") {
    super({
      message,
      name: new.target.name,
      statusCode: 500,
    });
  }
}

// =============== Drizzle Related =============== //

export class DrizzleQueryError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = new.target.name;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
