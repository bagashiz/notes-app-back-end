const ClientError = require('./ClientError');

/**
 * InvariantError is a class that will be used to handle an error
 */
class InvariantError extends ClientError {
    constructor(message) {
        super(message);
        this.name = 'InvariantError';
    }
}

module.exports = InvariantError;
