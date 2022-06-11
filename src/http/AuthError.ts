import { HttpCodes } from './HttpCodes';
import { HttpResponse } from './HttpResponse';

export class AuthError extends HttpResponse {

    constructor() {
        super(HttpCodes.FORBIDDEN, 'FORBIDDEN');
    }

}