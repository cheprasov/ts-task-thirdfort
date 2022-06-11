import { HttpCodes } from './HttpCodes';

export class HttpResponse {

    protected _code: HttpCodes;
    protected _message: any;
    protected _headers: Record<string, string> = {
        'Content-Type': 'text/html; charset=utf-8',
    };

    constructor(code: HttpCodes, message: any = '') {
        this._code = code;
        this._message = message;
    }

    getCode(): HttpCodes {
        return this._code;
    }

    getHeaders(): Record<string, string>{
        return this._headers;
    }

    getMessage(): any {
        return this._message;
    }
}