class UserError extends Error {
  constructor(message = "User Error") {
    super(message);
    this.code = 400;
  }
}

class AuthenticationError extends UserError {
  constructor(message = "Authentication Error") {
    super(message);
    this.code = 401;
  }
}

module.exports = {
  AuthenticationError,
  UserError,
};
