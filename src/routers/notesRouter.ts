import express from 'express';
import {
    getOne,
    remove,
    update,
    create,
    getAll,
    archiveGetAll,
    archive,
    unarchive,
} from '../controllers/notes/NotesController';
import { AuthMiddleware } from '../middleware/AuthMiddleware';
import { NoteValidatorMiddleware } from '../middleware/NoteMiddleware';

const router = express.Router();

const id = ':id([0-9]+)';

router.get(`/`, [AuthMiddleware], getAll);
router.get(`/${id}`, [AuthMiddleware], getOne);
router.post('/', [AuthMiddleware, NoteValidatorMiddleware], create);
router.put(`/${id}`, [AuthMiddleware, NoteValidatorMiddleware], update);
router.delete(`/${id}`, [AuthMiddleware], remove);

router.get(`/archive`, [AuthMiddleware], archiveGetAll);
router.put(`/${id}/archive`, [AuthMiddleware], archive);
router.put(`/${id}/unarchive`, [AuthMiddleware], unarchive);

export { router as notesRouter };