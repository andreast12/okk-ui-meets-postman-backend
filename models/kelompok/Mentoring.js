import mongoose from "mongoose";
import Mentee from "./Mentee.js";

const mentoringSchema = mongoose.Schema({
  peserta: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Mentee",
      validate: {
        validator: async function (value) {
          const mentee = await Mentee.findById(value);
          return mentee.kelompok.toString() === this.kelompok.toString();
        },
      },
    },
  ],
  waktu: {
    type: Date,
    required: true,
  },
  tempat: {
    type: String,
    required: true,
  },
  materi: {
    type: String,
    required: true,
  },
  kelompok: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Kelompok",
  },
});

const Mentoring = mongoose.model("Mentoring", mentoringSchema);

export default Mentoring;
