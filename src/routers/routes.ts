import type { Express } from 'express';
import { notesRouter } from './notesRouter';

export const initRoutes = (app: Express) => {
    app.use('/notes', notesRouter);
}