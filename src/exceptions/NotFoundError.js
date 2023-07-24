const ClientError = require('./ClientError');

/**
 * NotFoundError is a class that will be used to handle a 404 error
 */
class NotFoundError extends ClientError {
    constructor(message) {
        super(message, 404);
        this.name = 'NotFoundError';
    }
}

module.exports = NotFoundError;
