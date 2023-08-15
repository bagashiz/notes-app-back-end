const Joi = require('joi');

/**
 * CollaborationPayloadSchema is a class that defines the schema for the payload
 */
const CollaborationPayloadSchema = Joi.object({
    noteId: Joi.string().required(),
    userId: Joi.string().required(),
});

module.exports = { CollaborationPayloadSchema };
