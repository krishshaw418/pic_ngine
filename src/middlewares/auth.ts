import { type Request, type Response, type NextFunction } from "express";
import crypto from "crypto";

export function verifySignature(req: Request, res: Response, next: NextFunction) {
    const signature = req.headers["x-signature"];
    const timestamp = req.headers["x-timestamp"];

    if(!signature || !timestamp) {
        return res.status(400).json({ message: "Missing signature headers" });
    }

    const payload = JSON.stringify(req.body);

    const expectedSig = crypto.createHmac("sha256", process.env.SIGNATURE_VERIFICATION_SECRET_KEY!).update(`${timestamp}.${payload}`).digest("hex");

    if(expectedSig !== signature) {
        return res.status(401).json({message: "Not Authorized!"});
    }
    next();
}