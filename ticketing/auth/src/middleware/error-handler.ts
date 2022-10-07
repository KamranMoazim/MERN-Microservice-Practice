import { NextFunction, Response, Request } from "express"
import { CustomError } from "../errors/custom-errors"


export const errorHanlder = async (err:Error, req:Request, res:Response, next:NextFunction) => {

    if (err instanceof CustomError) {
        return res.status(err.statusCode).send({errors: err.serializeErrors()})
    }

    res.status(400).send({errors: [{message:"something went wrong"}]})
}