class EmailNotSetup extends Error {
  constructor(message = "Email is not setup", status, code) {
    super(message);
    this.name = this.constructor.name;
    this.status = status || 500;
    this.code = code || "internal_error";
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = { EmailNotSetup };
