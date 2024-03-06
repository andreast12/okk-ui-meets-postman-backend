import express from "express";
import Kelompok from "../../models/kelompok/Kelompok.js";
import Config from "../../models/Config.js";
import menteeRouter from "./mentee.js";
import mentoringRouter from "./mentoring.js";

const router = express.Router();

router.use("/mentee", menteeRouter);
router.use("/mentoring", mentoringRouter);

router.get("/", async (req, res, next) => {
  try {
    const kelompok = await Kelompok.find().populate(["mentee", "mentoring"]);
    res.json({ kelompok });
  } catch (err) {
    next(err);
  }
});

router.get("/:nomor", async (req, res, next) => {
  const { nomor } = req.params;

  try {
    const kelompok = await Kelompok.findOne({ nomor }).populate([
      "mentee",
      "mentoring",
    ]);
    if (!kelompok) {
      res.status(404);
      throw new Error(`Tidak ada kelompok dengan nomor ${nomor}`);
    }
    res.json({ kelompok });
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  const { mentor } = req.body;

  try {
    const nomor = (await Config.findOne()).jumlahKelompok + 1;
    const kelompok = await Kelompok.create({
      nomor,
      mentor,
    });
    await Config.updateOne({}, { jumlahKelompok: nomor });
    res.status(201).json({ kelompok });
  } catch (err) {
    next(err);
  }
});

router.patch("/:nomor", async (req, res, next) => {
  const { nomor } = req.params;
  const { mentor } = req.body;

  try {
    const kelompok = await Kelompok.findOne({ nomor });
    if (!kelompok) {
      res.status(404);
      throw new Error(`Tidak ada kelompok dengan nomor ${nomor}`);
    }
    if (mentor) {
      if (typeof mentor !== "object") {
        res.status(400);
        throw new Error("Mentor harus berupa object");
      }
      kelompok.mentor.nama = mentor.nama || kelompok.mentor.nama;
      kelompok.mentor.fakultas = mentor.fakultas || kelompok.mentor.fakultas;
      kelompok.mentor.jurusan = mentor.jurusan || kelompok.mentor.jurusan;
      kelompok.mentor.angkatan = mentor.angkatan || kelompok.mentor.angkatan;
    }
    await kelompok.save();
    res.json({ kelompok });
  } catch (err) {
    next(err);
  }
});

router.delete("/:nomor", async (req, res, next) => {
  const { nomor } = req.params;

  try {
    const kelompok = await Kelompok.findOneAndDelete({ nomor });
    if (!kelompok) {
      res.status(404);
      throw new Error(`Tidak ada kelompok dengan nomor ${nomor}`);
    }
    res.json({ message: "Berhasil menghapus kelompok" });
  } catch (err) {
    next(err);
  }
});

export default router;
