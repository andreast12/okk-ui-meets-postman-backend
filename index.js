import "dotenv/config";
import express from "express";
import connectDB from "./utils/db.js";
import acaraRouter from "./routes/acara/acara.js";
import kelompokRouter from "./routes/kelompok/kelompok.js";
import panitiaRouter from "./routes/panitia/panitia.js";
import { notFound, errorHandler } from "./middleware/error.js";

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());

connectDB();

app.use("/api/acara", acaraRouter);
app.use("/api/kelompok", kelompokRouter);
app.use("/api/panitia", panitiaRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
