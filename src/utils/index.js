/* eslint-disable camelcase */

/**
 * mapDBToModel is a function that will be used to map the data from database to the model
 */
// eslint-disable-next-line object-curly-newline
const mapDBToModel = ({ id, title, body, tags, created_at, updated_at, username }) => ({
    id,
    title,
    body,
    tags,
    createdAt: created_at,
    updatedAt: updated_at,
    username,
});

module.exports = { mapDBToModel };
