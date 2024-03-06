import express from "express";
import RapatBPH from "../../../models/panitia/bph/Rapat.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const rapat = await RapatBPH.find().populate("peserta");
    res.json({ rapat });
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const rapat = await RapatBPH.findById(id).populate("peserta");
    if (!rapat) {
      res.status(404);
      throw new Error(`Tidak ada rapat dengan id ${id}`);
    }
    res.json({ rapat });
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  const { peserta, divisi, waktu, tempat, hasil } = req.body;
  const waktuDate = new Date(waktu);

  try {
    const rapat = await RapatBPH.create({
      peserta,
      divisi,
      waktu: waktuDate,
      tempat,
      hasil,
    });
    res.status(201).json({ rapat });
  } catch (err) {
    next(err);
  }
});

router.patch("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { peserta, divisi, waktu, tempat, hasil } = req.body;
  const waktuDate = new Date(waktu);

  if (waktu && isNaN(waktuDate)) {
    res.status(400);
    const err = new Error("Format tanggal tidak valid");
    next(err);
    return;
  }

  try {
    const rapat = await RapatBPH.findById(id);
    if (!rapat) {
      res.status(404);
      throw new Error(`Tidak ada rapat dengan id ${id}`);
    }
    rapat.peserta = peserta || rapat.peserta;
    rapat.divisi = divisi || rapat.divisi;
    rapat.waktu = waktu || rapat.waktu;
    rapat.waktu = !isNaN(waktuDate) ? waktuDate : rapat.waktu;
    rapat.tempat = tempat || rapat.tempat;
    rapat.hasil = hasil || rapat.hasil;
    await rapat.save();
    res.json({ rapat });
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const rapat = await RapatBPH.findByIdAndDelete(id);
    if (!rapat) {
      res.status(404);
      throw new Error(`Tidak ada rapat dengan id ${id}`);
    }
    res.json({ message: "Berhasil menghapus rapat" });
  } catch (err) {
    next(err);
  }
});

export default router;
