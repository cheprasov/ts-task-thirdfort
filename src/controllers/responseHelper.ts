import { Handler, NextFunction, Request, Response } from 'express';
import { HttpCodes } from '../http/HttpCodes';
import { HttpResponse } from '../http/HttpResponse';
import { Headers } from '../types/Headers';

type CallbackHandler = (
    request: Request,
    response: Response,
    next: NextFunction,
) => Promise<HttpResponse> | HttpResponse | void | any;

export const sendResponse = (res: Response, code: number, message: any, headers?: Headers) => {
    res.status(code)
    if (headers) {
        res.header(headers);
    }
    res.send(JSON.stringify({
        status: code,
        data: message,
    }));
    res.end();
}

export const responseHelper = (callback: CallbackHandler): Handler => {
    return async (request: Request, response: Response, next: NextFunction) => {
        try {
            let resp = callback(request, response, next);
            if (resp === undefined) {
                return;
            }
            if (resp instanceof Promise) {
                resp = await resp;
                if (resp instanceof Error) {
                    throw resp;
                }
            }
            if (resp instanceof HttpResponse) {
                sendResponse(response, resp.getCode(), resp.getMessage(), resp.getHeaders());
                return;
            }
            sendResponse(response, HttpCodes.OK, resp);
            return;
        } catch (error: any) {
            if (error instanceof HttpResponse) {
                sendResponse(response, error.getCode(), error.getMessage(), error.getHeaders());
                return;
            }
            sendResponse(
                response,
                HttpCodes.INTERNAL_SERVER_ERROR,
                error instanceof Error && error.message ? error.message : 'Server error. Please try again later.',
            );
        }
    }
}