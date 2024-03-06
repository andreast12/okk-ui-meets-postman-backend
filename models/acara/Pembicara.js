import mongoose from "mongoose";

const pembicaraSchema = mongoose.Schema({
  nama: {
    type: String,
    required: true,
  },
  acara: {
    type: String,
    required: true,
  },
});

const Pembicara = mongoose.model("Pembicara", pembicaraSchema);

export default Pembicara;
