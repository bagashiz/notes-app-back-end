const ClientError = require('../../exceptions/ClientError');

/**
 * NotesHandler is a class that will be used to handle all of the routes
 */
class NotesHandler {
    constructor(service, validator) {
        this._service = service;
        this._validator = validator;

        this.postNoteHandler = this.postNoteHandler.bind(this);
        this.getNotesHandler = this.getNotesHandler.bind(this);
        this.getNoteByIdHandler = this.getNoteByIdHandler.bind(this);
        this.putNoteByIdHandler = this.putNoteByIdHandler.bind(this);
        this.deleteNoteByIdHandler = this.deleteNoteByIdHandler.bind(this);
    }

    /**
     * postNoteHandler is a method that will be used to handle the POST request to add a note
     */
    async postNoteHandler(request, h) {
        try {
            this._validator.validateNotePayload(request.payload);
            const { title = 'untitled', body, tags } = request.payload;
            const { id: credentialId } = request.auth.credentials;
            const noteId = await this._service.addNote({
                title,
                body,
                tags,
                owner: credentialId,
            });

            const response = h.response({
                status: 'success',
                message: 'Catatan berhasil ditambahkan',
                data: {
                    noteId,
                },
            });
            response.code(201);
            return response;
        } catch (error) {
            if (error instanceof ClientError) {
                const response = h.response({
                    status: 'fail',
                    message: error.message,
                });
                response.code(error.statusCode);
                return response;
            }

            // Server ERROR!
            const response = h.response({
                status: 'error',
                message: 'Maaf, terjadi kegagalan pada server kami.',
            });
            response.code(500);
            console.error(error);
            return response;
        }
    }

    /**
     * getNotesHandler is a method that will be used to handle the GET request to get all notes
     */
    async getNotesHandler(request) {
        const { id: credentialId } = request.auth.credentials;
        const notes = await this._service.getNotes(credentialId);
        return {
            status: 'success',
            data: {
                notes,
            },
        };
    }

    /**
     * getNoteByIdHandler is a method that will be used to handle the GET request
     * to get a note by id
     */
    async getNoteByIdHandler(request, h) {
        try {
            const { id } = request.params;
            const { id: credentialId } = request.auth.credentials;

            await this._service.verifyNoteOwner(id, credentialId);
            const note = await this._service.getNoteById(id);

            return {
                status: 'success',
                data: {
                    note,
                },
            };
        } catch (error) {
            if (error instanceof ClientError) {
                const response = h.response({
                    status: 'fail',
                    message: error.message,
                });
                response.code(error.statusCode);
                return response;
            }

            // Server ERROR!
            const response = h.response({
                status: 'error',
                message: 'Maaf, terjadi kegagalan pada server kami.',
            });
            response.code(500);
            console.error(error);
            return response;
        }
    }

    /**
     * putNoteByIdHandler is a method that will be used to handle the PUT request
     * to edit a note by id
     */
    async putNoteByIdHandler(request, h) {
        try {
            this._validator.validateNotePayload(request.payload);
            const { id } = request.params;
            const { id: credentialId } = request.auth.credentials;
            await this._service.verifyNoteOwner(id, credentialId);
            await this._service.editNoteById(id, request.payload);

            return {
                status: 'success',
                message: 'Catatan berhasil diperbarui',
            };
        } catch (error) {
            if (error instanceof ClientError) {
                const response = h.response({
                    status: 'fail',
                    message: error.message,
                });
                response.code(error.statusCode);
                return response;
            }

            // Server ERROR!
            const response = h.response({
                status: 'error',
                message: 'Maaf, terjadi kegagalan pada server kami.',
            });
            response.code(500);
            console.error(error);
            return response;
        }
    }

    /**
     * deleteNoteByIdHandler is a method that will be used to handle the DELETE request
     * to delete a note by id
     */
    async deleteNoteByIdHandler(request, h) {
        try {
            const { id } = request.params;
            const { id: credentialId } = request.auth.credentials;
            await this._service.verifyNoteOwner(id, credentialId);
            await this._service.deleteNoteById(id);

            return {
                status: 'success',
                message: 'Catatan berhasil dihapus',
            };
        } catch (error) {
            if (error instanceof ClientError) {
                const response = h.response({
                    status: 'fail',
                    message: error.message,
                });
                response.code(error.statusCode);
                return response;
            }

            // Server ERROR!
            const response = h.response({
                status: 'error',
                message: 'Maaf, terjadi kegagalan pada server kami.',
            });
            response.code(500);
            console.error(error);
            return response;
        }
    }
}

module.exports = NotesHandler;
