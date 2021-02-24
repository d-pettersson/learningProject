import HttpException from "./HttpException";

class AuthentificationTokenMissingException extends HttpException {
    constructor() {
        super(401, 'Authentication token missing');
    }
}

export default AuthentificationTokenMissingException;