import mongoose from "mongoose";
import { mahasiswaSchema } from "../template.js";

const kelompokSchema = mongoose.Schema({
  nomor: {
    type: Number,
    required: true,
    unique: true,
  },
  mentor: mahasiswaSchema,
  mentee: [{ type: mongoose.Schema.Types.ObjectId, ref: "Mentee" }],
  mentoring: [{ type: mongoose.Schema.Types.ObjectId, ref: "Mentoring" }],
});

const Kelompok = mongoose.model("Kelompok", kelompokSchema);

export default Kelompok;
