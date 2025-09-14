import dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;
import imagenRouter from "./routes/imagen";
import { syntaxErrorHandler } from "./middlewares/errorhandler";

app.use("/api", imagenRouter);

app.use(syntaxErrorHandler);

app.listen(port, () => {
    console.log(`Listening at port ${port} ...`);
})