import express from "express";
import Acara from "../../models/acara/Acara.js";
import sponsorRouter from "./sponsor.js";
import pembicaraRouter from "./pembicara.js";

const router = express.Router();

router.use("/sponsor", sponsorRouter);
router.use("/pembicara", pembicaraRouter);

router.get("/", async (req, res, next) => {
  try {
    const acara = await Acara.find().populate(["sponsor", "pembicara"]);
    res.json({ acara });
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const acara = await Acara.findById(id).populate(["sponsor", "pembicara"]);
    if (!acara) {
      res.status(404);
      throw new Error(`Tidak ada acara dengan id ${id}`);
    }
    res.json({ acara });
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  const { nama, waktuMulai, waktuBerakhir, tempat } = req.body;
  const waktuMulaiDate = new Date(waktuMulai);
  const waktuBerakhirDate = new Date(waktuBerakhir);

  try {
    const acara = await Acara.create({
      nama,
      waktuMulai: waktuMulaiDate,
      waktuBerakhir: waktuBerakhirDate,
      tempat,
    });
    res.status(201).json({ acara });
  } catch (err) {
    next(err);
  }
});

router.patch("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { nama, waktuMulai, waktuBerakhir, tempat } = req.body;
  const waktuMulaiDate = new Date(waktuMulai);
  const waktuBerakhirDate = new Date(waktuBerakhir);

  if (
    (waktuMulai && isNaN(waktuMulaiDate)) ||
    (waktuBerakhir && isNaN(waktuBerakhirDate))
  ) {
    res.status(400);
    const err = new Error("Format tanggal tidak valid");
    next(err);
    return;
  }

  try {
    const acara = await Acara.findById(id);
    if (!acara) {
      res.status(404);
      throw new Error(`Tidak ada acara dengan id ${id}`);
    }
    acara.nama = nama || acara.nama;
    acara.waktuMulai = !isNaN(waktuMulaiDate)
      ? waktuMulaiDate
      : acara.waktuMulai;
    acara.waktuBerakhir = !isNaN(waktuBerakhirDate)
      ? waktuBerakhirDate
      : acara.waktuBerakhir;
    acara.tempat = tempat || acara.tempat;
    await acara.save();
    res.json({ acara });
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const acara = await Acara.findByIdAndDelete(id);
    if (!acara) {
      res.status(404);
      throw new Error(`Tidak ada acara dengan id ${id}`);
    }
    res.json({ message: "Berhasil menghapus acara" });
  } catch (err) {
    next(err);
  }
});

export default router;
