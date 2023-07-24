const Joi = require('joi');

/**
 * NotePayloadSchema is a class that defines the schema for the payload
 */
const NotePayloadSchema = Joi.object({
    title: Joi.string().required(),
    body: Joi.string().required(),
    tags: Joi.array().items(Joi.string()).required(),
});

module.exports = { NotePayloadSchema };
