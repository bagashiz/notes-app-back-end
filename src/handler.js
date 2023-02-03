const { nanoid } = require('nanoid');
const notes = require('./notes');

// POST /notes handler
const addNoteHandler = (request, h) => {
    const { title, tags, body } = request.payload;

    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const newNote = {
        title, tags, body, id, createdAt, updatedAt,
    };

    notes.push(newNote);

    const isScuccess = notes.filter((note) => note.id === id).length > 0;

    if (isScuccess) {
        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil ditambahkan',
            data: {
                noteId: id,
            },
        });
        response.code(201);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Catatan gagal ditambahkan',
    });
    response.code(500);
    return response;
};

// GET /notes handler
const getAllNotesHandler = () => ({
    status: 'success',
    data: {
        notes,
    },
});

module.exports = {
    addNoteHandler,
    getAllNotesHandler,
};
