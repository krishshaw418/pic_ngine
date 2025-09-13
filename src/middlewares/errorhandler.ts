import{ type Request, type Response, type NextFunction } from "express";

export function syntaxErrorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    if (err instanceof SyntaxError && "body" in err) {
        return res.status(400).json({
        error: "Invalid JSON format",
        message: err.message
        });
    }
    next(err);
}