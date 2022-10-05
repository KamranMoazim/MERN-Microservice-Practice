import { CustomError } from "./custom-errors";


export class DatabaseConnectionError extends CustomError {
    reason="error connecting to database";
    statusCode=500;

    constructor(){
        super("Error connecting to db");
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype)
    }

    serializeErrors(){
        return [{ message: this.reason }]
    }
} 