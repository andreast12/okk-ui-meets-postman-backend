import mongoose from "mongoose";
import { mahasiswaSchema } from "../template.js";

const intiSchema = mongoose.Schema({
  ...mahasiswaSchema,
  jabatan: {
    type: String,
    unique: true,
    enum: [
      "Project Officer",
      "Vice Project Officer Internal",
      "Vice Project Officer Eksternal",
      "Sekretaris Umum",
      "Controller",
      "Treasurer",
      "Koordinator Acara",
      "Koordinator Sarana dan Prasarana",
      "Koordinator Operasional",
      "Koordinator Materi dan Mentor",
      "Koordinator Kreatif",
      "Koordinator Relasi",
    ],
    required: true,
  },
});

const PengurusInti = mongoose.model("PengurusInti", intiSchema);

export default PengurusInti;
