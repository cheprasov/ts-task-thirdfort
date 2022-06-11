import { RequestHandler } from 'express';
import { HttpCodes } from '../../http/HttpCodes';
import { HttpResponse } from '../../http/HttpResponse';
import Note from '../../notes/entity/Note';
import NotesRepositoryInteface from '../../notes/repository/NotesRepositoryInterface';
import { responseHelper } from '../responseHelper';

export const getAll: RequestHandler = responseHelper(async (request, response, next) => {
    const notesRepository = response.locals.notesRepository as NotesRepositoryInteface;
    return notesRepository.list();
});

export const getOne: RequestHandler = responseHelper(async (request, response, next) => {
    const notesRepository = response.locals.notesRepository as NotesRepositoryInteface;
    const id = +request.params.id;
    return notesRepository.getById(id).then((note) => {
        if (!note) {
            return new HttpResponse(HttpCodes.NOT_FOUND);
        }
        return note;
    });
});

export const create: RequestHandler = responseHelper(async (request, response, next) => {
    const { title, text } = response.locals.note;
    const notesRepository = response.locals.notesRepository as NotesRepositoryInteface;
    return notesRepository.create(new Note(null, title, text)).then(
        (note) => new HttpResponse(HttpCodes.CREATED, note)
    );
});

export const remove: RequestHandler = responseHelper(async (request, response, next) => {
    const notesRepository = response.locals.notesRepository as NotesRepositoryInteface;
    const id = +request.params.id;
    return notesRepository.delete(id).then((isDeleted) => {
        if (isDeleted) {
            return 'Deleted';
        }
        return new HttpResponse(HttpCodes.NOT_FOUND, 'Cant delete note. Not found');
    });
});

export const update: RequestHandler = responseHelper(async (request, response, next) => {
    const { title, text } = response.locals.note;
    const id = +request.params.id;
    const notesRepository = response.locals.notesRepository as NotesRepositoryInteface;
    return notesRepository.update(new Note(id, title, text)).then(
        (note) => {
            if (!note) {
                return new HttpResponse(HttpCodes.NOT_FOUND, 'Cant update note. Not found');
            }
            return note;
        }
    );
});

export const archiveGetAll: RequestHandler = responseHelper(async (request, response, next) => {
    const notesRepository = response.locals.notesRepository as NotesRepositoryInteface;
    return notesRepository.archiveList();
});

export const archive: RequestHandler = responseHelper(async (request, response, next) => {
    const id = +request.params.id;
    const notesRepository = response.locals.notesRepository as NotesRepositoryInteface;
    return notesRepository.archive(id).then(
        (result) => {
            if (!result) {
                return new HttpResponse(HttpCodes.NOT_FOUND, 'Cant update note. Not found');
            }
            return result;
        }
    );
});

export const unarchive: RequestHandler = responseHelper(async (request, response, next) => {
    const id = +request.params.id;
    const notesRepository = response.locals.notesRepository as NotesRepositoryInteface;
    return notesRepository.unarchive(id).then(
        (result) => {
            if (!result) {
                return new HttpResponse(HttpCodes.NOT_FOUND, 'Cant update note. Not found');
            }
            return result;
        }
    );
});