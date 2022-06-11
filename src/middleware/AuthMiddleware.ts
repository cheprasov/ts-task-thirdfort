import { NextFunction, Request, Response } from 'express';
import { responseHelper } from '../controllers/responseHelper';
import { AuthError } from '../http/AuthError';
import { NotesRepositoryFactory } from '../notes/repository/NotesRepositoryFactory';

export const AuthMiddleware = responseHelper((req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        throw new AuthError();
    }

    const token = authHeader;
    // todo: proper token logic
    if (token) {
        const userId = +authHeader;
        res.locals = {
            userId,
            notesRepository: NotesRepositoryFactory.create(userId),
        };
        next();
        return;
    }

    throw new AuthError();
});