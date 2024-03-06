import mongoose from "mongoose";

const configSchema = mongoose.Schema({
  jumlahKelompok: {
    type: Number,
    default: 0,
  },
});

configSchema.statics.createIfEmpty = async function () {
  const config = await this.findOne();
  if (!config) await this.create({});
};

const Config = mongoose.model("Config", configSchema);

export default Config;
