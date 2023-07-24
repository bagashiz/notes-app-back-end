const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

/**
 * NotesService is a class that will be used to handle all of the CRUD operations on notes data
 */
class NotesService {
    constructor() {
        this._notes = [];
    }

    /**
     * addNote is a method that will be used to handle the POST request to add a note
     */
    addNote({ title, body, tags }) {
        const id = nanoid(16);
        const createdAt = new Date().toISOString();
        const updatedAt = createdAt;

        const newNote = {
            title,
            tags,
            body,
            id,
            createdAt,
            updatedAt,
        };

        this._notes.push(newNote);

        const isSuccess = this._notes.filter((note) => note.id === id).length > 0;

        if (!isSuccess) {
            throw new InvariantError('Catatan gagal ditambahkan');
        }

        return id;
    }

    /**
     * getNotes is a method that will be used to handle the GET request to get all notes
     */
    getNotes() {
        return this._notes;
    }

    /**
     * getNoteById is a method that will be used to handle the GET request
     */
    getNoteById(id) {
        const note = this._notes.filter((n) => n.id === id)[0];
        if (!note) {
            throw new NotFoundError('Catatan tidak ditemukan');
        }
        return note;
    }

    /**
     *  editNoteById is a method that will be used to handle the PUT request
     */
    editNoteById(id, { title, body, tags }) {
        const index = this._notes.findIndex((note) => note.id === id);

        if (index === -1) {
            throw new NotFoundError('Gagal memperbarui catatan. Id tidak ditemukan');
        }

        const updatedAt = new Date().toISOString();

        this._notes[index] = {
            ...this._notes[index],
            title,
            tags,
            body,
            updatedAt,
        };
    }

    /**
     * deleteNoteById is a method that will be used to handle the DELETE request
     */
    deleteNoteById(id) {
        const index = this._notes.findIndex((note) => note.id === id);
        if (index === -1) {
            throw new NotFoundError('Catatan gagal dihapus. Id tidak ditemukan');
        }
        this._notes.splice(index, 1);
    }
}

module.exports = NotesService;
