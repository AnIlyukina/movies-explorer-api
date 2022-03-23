const NotFoundError = require('./NotFoundError');
const ForbiddenError = require('./ForbiddenError');
const UnAuthtorizedError = require('./UnAuthtorizedError');
const BadRequestError = require('./BadRequestError');
const ConflictRequestError = require('./ConflictRequestError');

module.exports = {
  NotFoundError,
  ForbiddenError,
  UnAuthtorizedError,
  BadRequestError,
  ConflictRequestError,
};
