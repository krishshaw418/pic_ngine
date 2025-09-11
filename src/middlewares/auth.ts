import { type Request, type Response, type NextFunction } from "express";
import crypto from "crypto";

export function verifySignature(req: Request, res: Response, next: NextFunction) {
    const signature = req.headers["x-signature"];
    const timestamp = req.headers["x-timestamp"];

    if(!signature || !timestamp) {
        return res.status(400).json({ message: "Missing signature headers" });
    }

    const payload = (req as any).rawBody;

    const expectedSig = crypto.createHmac("sha256", process.env.SIGNATURE_VERIFICATION_KEY!).update(`${timestamp}.${payload}`).digest("hex");
    if(expectedSig !== signature) {
        return res.status(401).json({message: "Not Authorized!"});
    }
    next();
}