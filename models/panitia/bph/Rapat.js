import mongoose from "mongoose";
import BPH from "./BPH.js";

const rapatSchema = mongoose.Schema({
  peserta: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BPH",
      validate: {
        validator: async function (value) {
          const bph = await BPH.findById(value);
          return bph.divisi.toString() === this.divisi.toString();
        },
      },
    },
  ],
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
  waktu: {
    type: Date,
    required: true,
  },
  tempat: {
    type: String,
    required: true,
  },
  hasil: {
    type: String,
    required: true,
  },
});

const RapatBPH = mongoose.model("RapatBPH", rapatSchema);

export default RapatBPH;
