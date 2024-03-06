import mongoose from "mongoose";
import { mahasiswaSchema } from "../template.js";

const menteeSchema = mongoose.Schema({
  ...mahasiswaSchema,
  jalurMasuk: {
    type: String,
    required: true,
  },
  kelompok: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Kelompok",
  },
});

const Mentee = mongoose.model("Mentee", menteeSchema);

export default Mentee;
