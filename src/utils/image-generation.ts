import * as z from "zod";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const InputFormat = z.object({
  prompt: z.string(),
  style: z.enum(["anime", "flux-schnell", "flux-dev", "flux-dev-fast", "imagine-turbo", "realistic"]),
  aspect_ratio: z.optional(z.enum(["1:1", "16:9", "9:16"]))
})

type InputFormatType = z.infer<typeof InputFormat>

type ErrorFormat = {
  code: number,
  error: string,
  message: string,
  status: string
}

export async function ImaGen(input: InputFormatType): Promise<1 | string> {

  const formData = new FormData();
  formData.append("prompt", input.prompt);
  if(input.style)
  formData.append("style", input.style);
  if(input.aspect_ratio)
  formData.append("aspect_ratio", input.aspect_ratio);

  try {
    const response = await fetch(`${process.env.IMAGINE_ART_API}`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.IMAGINE_ART_API_KEY}`,
      },
      body: formData
    })
    const contentType = response.headers.get("content-type");
    if(!response.ok) {
      if(contentType?.includes("application/json")) {
        const error = (await response.json()) as ErrorFormat;
        console.log("status: ", error.status);
        console.log("code: ", error.code);
        console.log("message: ", error.message);
        console.log("error: ", error.error);
        return error.message;
      }
    }
    if(response.headers.get("content-length") === "157921"){
      return "Image generation failed due to offensive request!"
    }
    if(contentType?.includes("image/png")){
      const data = await response.blob();
      const arrayBuffer = await data.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const fileName = `${uuidv4()}.png`;
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__filename);
      const filePath = path.join(__dirname, "../images", fileName);
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
      fs.writeFileSync(filePath, buffer);
    }
    return 1;
  } catch (error) {
    console.log("Error", error);
    return "Internal server error!";
  }
}