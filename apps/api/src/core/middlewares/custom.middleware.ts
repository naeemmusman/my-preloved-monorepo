import { NextFunction, Request, Response } from "express";

export class CustomMiddleware {
    public static logRequest = (req: Request, _: Response, next: NextFunction): void => {
        console.log(`${req.method} ${req.url}`);
        next();
    }
};

