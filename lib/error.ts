export class UnauthorizedError extends Error {
  public readonly statusCode: number;

  constructor(options?: ErrorOptions) {
    super("Unauthorized", options);
    this.name = new.target.name;
    this.statusCode = 401;

    Object.setPrototypeOf(this, new.target.prototype);
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
