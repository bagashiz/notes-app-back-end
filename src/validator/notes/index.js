const InvariantError = require('../../exceptions/InvariantError');
const { NotePayloadSchema } = require('./schema');

/**
 * NotesValidator is a class that will be used to validate the payload
 */
const NotesValidator = {
    validateNotePayload: (payload) => {
        const validationResult = NotePayloadSchema.validate(payload);
        if (validationResult.error) {
            throw new InvariantError(validationResult.error.message);
        }
    },
};

module.exports = NotesValidator;
