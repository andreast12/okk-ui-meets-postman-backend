import mongoose from "mongoose";

const acaraSchema = mongoose.Schema({
  nama: {
    type: String,
    required: true,
  },
  waktuMulai: {
    type: Date,
    required: true,
  },
  waktuBerakhir: {
    type: Date,
    required: true,
  },
  tempat: {
    type: String,
    required: true,
  },
  sponsor: [{ type: mongoose.Schema.Types.ObjectId, ref: "Sponsor" }],
  pembicara: [{ type: mongoose.Schema.Types.ObjectId, ref: "Pembicara" }],
});

const Acara = mongoose.model("Acara", acaraSchema);

export default Acara;
