import dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
app.use(express.json({
    verify: (req, buf) => {
        (req as any).rawBody = buf.toString();
    }
}));
const port = process.env.PORT || 3000;
import imagenRouter from "./routes/imagen";

app.use((err: any, req: Express.Request, res: express.Response, next: express.NextFunction) => {
  if (err instanceof SyntaxError && "body" in err) {
    return res.status(400).json({
      error: "Invalid JSON format",
      message: err.message
    });
  }
  next(err);
});

app.use("/api", imagenRouter);

app.listen(port, () => {
    console.log(`Listening at port ${port} ...`);
})