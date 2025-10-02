import { Router, type Request, type Response } from "express";
import * as z from "zod";
import { requestQueue } from "../queue/queue";
import { verifySignature } from "../middlewares/auth";

const router = Router();

const InputFormat = z.object({
  prompt: z.string(),
  style: z.enum(["anime", "flux-schnell", "flux-dev", "flux-dev-fast", "imagine-turbo", "realistic"]),
  aspect_ratio: z.optional(z.enum(["1:1", "16:9", "9:16"])),
  chatId: z.number()
})

router.post("/imagen", verifySignature, async(req: Request, res: Response) => {
  const input = InputFormat.safeParse(req.body);
  if(!input.success) {
    return res.status(400).json({success: false, message: input.error.issues});
  }
  try {
    const job = await requestQueue.add("generate", input.data, {
      attempts: 3,
      backoff: { type: "exponential", delay: 2000 },
      removeOnComplete: true,
      removeOnFail: false,
    });

    return res.status(200).json({
      success: true,
      jobId: job.id,
      message: "Your request is added to the queue!",
    });
  } catch (error) {
    console.error("Queue error:", error);
    res.status(500).json({success: "false", message: "Failed to add request to the queue."})
  }
})

export default router;