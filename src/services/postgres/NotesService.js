const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const InvariantError = require('../../exceptions/InvariantError');
const { mapDBToModel } = require('../../utils');
const NotFoundError = require('../../exceptions/NotFoundError');
const AuthorizationError = require('../../exceptions/AuthorizationError');

/**
 * NotesService is a class that will be used to handle all of the CRUD operations on notes data
 */
class NotesService {
    constructor(collaborationService) {
        this._pool = new Pool();
        this._collaborationService = collaborationService;
    }

    /**
     * addNote is a method that will be used to handle the POST request to add a note
     */
    // eslint-disable-next-line object-curly-newline
    async addNote({ title, body, tags, owner }) {
        const id = nanoid(16);
        const createdAt = new Date().toISOString();
        const updatedAt = createdAt;

        const query = {
            text: 'INSERT INTO notes VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id',
            values: [id, title, body, tags, createdAt, updatedAt, owner],
        };

        const result = await this._pool.query(query);

        if (!result.rows[0].id) {
            throw new InvariantError('Catatan gagal ditambahkan');
        }

        return result.rows[0].id;
    }

    /**
     * getNotes is a method that will be used to handle the GET request to get all notes
     */
    async getNotes(owner) {
        const query = {
            text: `SELECT notes.* FROM notes
        LEFT JOIN collaborations ON collaborations.note_id = notes.id
        WHERE notes.owner = $1 OR collaborations.user_id = $1
        GROUP BY notes.id`,
            values: [owner],
        };
        const result = await this._pool.query(query);
        return result.rows.map(mapDBToModel);
    }

    /**
     * verifyNoteOwner is a method that will be used to handle the GET request
     * to verify the owner of a note
     */
    async verifyNoteOwner(id, owner) {
        const query = {
            text: 'SELECT * FROM notes WHERE id = $1',
            values: [id],
        };

        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new NotFoundError('Resource yang Anda minta tidak ditemukan');
        }

        const note = result.rows[0];

        if (note.owner !== owner) {
            throw new AuthorizationError('Anda tidak berhak mengakses resource ini');
        }
    }

    /**
     * verifyNoteAccess is a method that will be used to handle the GET request
     * to verify the access of a note
     */
    async verifyNoteAccess(noteId, userId) {
        try {
            await this.verifyNoteOwner(noteId, userId);
        } catch (error) {
            if (error instanceof NotFoundError) {
                throw error;
            }
            try {
                await this._collaborationService.verifyCollaborator(noteId, userId);
            } catch {
                throw error;
            }
        }
    }

    /**
     * getNoteById is a method that will be used to handle the GET request
     * to get a note by its id
     */
    async getNoteById(id) {
        const query = {
            text: `SELECT notes.*, users.username
        FROM notes
        LEFT JOIN users ON users.id = notes.owner
        WHERE notes.id = $1`,
            values: [id],
        };
        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new NotFoundError('Catatan tidak ditemukan');
        }

        return result.rows.map(mapDBToModel)[0];
    }

    /**
     * editNoteById is a method that will be used to handle the PUT request
     * to edit a note by its id
     */
    async editNoteById(id, { title, body, tags }) {
        const updatedAt = new Date().toISOString();
        const query = {
            text: 'UPDATE notes SET title = $1, body = $2, tags = $3, updated_at = $4 WHERE id = $5 RETURNING id',
            values: [title, body, tags, updatedAt, id],
        };

        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new NotFoundError('Gagal memperbarui catatan. Id tidak ditemukan');
        }
    }

    /**
     * deleteNoteById is a method that will be used to handle the DELETE request
     * to delete a note by its id
     */
    async deleteNoteById(id) {
        const query = {
            text: 'DELETE FROM notes WHERE id = $1 RETURNING id',
            values: [id],
        };

        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new NotFoundError('Catatan gagal dihapus. Id tidak ditemukan');
        }
    }
}

module.exports = NotesService;
