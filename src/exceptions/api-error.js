module.exports = class ApiError extends Error {
  constructor(status, message, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }
  static UnauthorizedError() {
    return new ApiError(401, "user not authorized");
  }
  static badRequest(message, errors = []) {
    return new ApiError(400, message, errors);
  }

  static serverError(message, errors = []) {
    return new ApiError(500, message, errors);
  }
};
