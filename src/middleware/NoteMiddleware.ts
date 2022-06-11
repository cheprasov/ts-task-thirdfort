import { NextFunction, Request, Response } from 'express';
import { responseHelper } from '../controllers/responseHelper';
import { HttpCodes } from '../http/HttpCodes';
import { HttpResponse } from '../http/HttpResponse';

interface NoteDTO {
    title?: string;
    text?: string;
}

export const NoteValidatorMiddleware = responseHelper((req: Request, res: Response, next: NextFunction): void => {
    const { title, text } = req.body as NoteDTO;

    if (!title || !text || title.length > 200) {
        throw new HttpResponse(HttpCodes.BAD_REQUEST, 'Bad request');
    }

    res.locals.note = {
        title,
        text,
    };

    next();
});