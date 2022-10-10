import { NextFunction, Response, Request } from "express"
import { CustomError } from "../errors/custom-errors"


export const errorHanlder = async (err:Error, req:Request, res:Response, next:NextFunction) => {

    if (err instanceof CustomError) {
        return res.status(err.statusCode).send({errors: err.serializeErrors()})
        // return res.send({errors: err.serializeErrors()})
    }
    
    console.error(err)
    return res.status(400).send({errors: [{message:"something went wrong"}]})
}
