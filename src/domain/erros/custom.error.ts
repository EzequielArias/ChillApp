export class CustomErr extends Error {


    constructor(
        public readonly statusCode : number,
        public readonly message : string
    ){
        super(message)
    }

    static badRequest(message : string){
        return new CustomErr( 400, message)
    }

    static unAuthorized(message : string){
        return new CustomErr(401, message);
    }

    static forbbiden(message : string){
        return new CustomErr(403, message);
    }

    static notFound(message : string){
        return new CustomErr(404, message);
    }

    static internalServerError(message : string = `Something went wrong`){
        return new CustomErr(500, message);
    }
}