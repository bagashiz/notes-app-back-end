const Joi = require('joi');

// ImageHeadersSchema is a schema for validating image headers.
const ImageHeadersSchema = Joi.object({
    'content-type': Joi.string()
        .valid('image/apng', 'image/avif', 'image/gif', 'image/jpeg', 'image/png', 'image/webp')
        .required(),
}).unknown();

module.exports = { ImageHeadersSchema };
