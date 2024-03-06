import mongoose from "mongoose";

const sponsorSchema = mongoose.Schema({
  nama: {
    type: String,
    required: true,
  },
  paket: {
    type: String,
    required: true,
    enum: ["Platinum", "Gold", "Silver"],
  },
  acara: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Acara",
  },
});

const Sponsor = mongoose.model("Sponsor", sponsorSchema);

export default Sponsor;
