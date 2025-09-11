import dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
app.use(express.json({
    verify: (req, res, buf) => {
        (req as any).rawBody = buf.toString();
    }
}));
const port = process.env.PORT || 3000;
import imagenRouter from "./routes/imagen";

app.use("/api", imagenRouter);

app.listen(port, () => {
    console.log(`Listening at port ${port} ...`);
})