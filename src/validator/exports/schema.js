const Joi = require('joi');

/**
 * ExportNotesPayloadSchema is a schema that will be used to validate the export notes payload.
 */
const ExportNotesPayloadSchema = Joi.object({
    targetEmail: Joi.string().email({ tlds: true }).required(),
});

module.exports = ExportNotesPayloadSchema;
