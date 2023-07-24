/**
 * ClientError is a class that will be used to handle the error that occurs
 */
class ClientError extends Error {
    constructor(message, statusCode = 400) {
        super(message);
        this.statusCode = statusCode;
        this.name = 'ClientError';
    }
}

module.exports = ClientError;
