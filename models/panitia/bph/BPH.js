import mongoose from "mongoose";
import { mahasiswaSchema } from "../../template.js";

const BPHSchema = mongoose.Schema({
  ...mahasiswaSchema,
  divisi: {
    type: String,
    enum: [
      "Project",
      "Sponsorship",
      "Kesekretariatan",
      "PSDM",
      "Acara Puncak",
      "Eksplorasi",
      "Transportasi dan Konsumsi",
      "Perizinan",
      "Logistik",
      "Keamanan",
      "Medis",
      "Media Informasi",
      "Kelembagaan",
      "Materi",
      "Mentor",
      "Media Partner",
      "IT dan Broadcast",
      "Dekorasi dan Wardrobe",
      "Visual Design dan Dokumentasi",
    ],
    required: true,
  },
  jabatan: {
    type: String,
    enum: ["Penanggung Jawab", "Wakil Penanggung Jawab", "Staf"],
    required: true,
  },
});

BPHSchema.pre("save", async function (next) {
  try {
    const PJCount = await BPH.countDocuments({
      divisi: this.divisi,
      jabatan: "Penanggung Jawab",
    });
    const WaPJCount = await BPH.countDocuments({
      divisi: this.divisi,
      jabatan: "Wakil Penanggung Jawab",
    });
    let error;

    if (this.jabatan === "Penanggung Jawab" && PJCount === 1) {
      error = new Error("Penanggung Jawab sudah ada");
      error.name = "BPHCountError";
    }
    if (this.jabatan === "Wakil Penanggung Jawab" && WaPJCount === 2) {
      error = new Error("Wakil Penanggung Jawab sudah ada 2");
      error.name = "BPHCountError";
    }

    if (error) throw error;
  } catch (err) {
    next(err);
  }
});

const BPH = mongoose.model("BPH", BPHSchema);

export default BPH;
