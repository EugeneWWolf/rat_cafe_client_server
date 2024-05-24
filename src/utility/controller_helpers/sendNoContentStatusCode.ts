import { HttpStatus, Logger } from "@nestjs/common";
import { Response } from 'express';

export function sendNoContentStatusCode(res: Response, methodName: string): void {
    try {
        res.status(HttpStatus.NO_CONTENT).send();
    } catch(err) {
        Logger.error(`Error in ${methodName}(): ${err.message}`);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send("Internal Server Error: couldn't send response");
    }
}