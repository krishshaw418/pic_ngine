import dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;
import memeGen from "./routes/meme";

memeGen();

app.listen(port, () => {
    console.log(`Listening at port ${port}`);
})