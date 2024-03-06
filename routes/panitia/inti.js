import express from "express";
import PengurusInti from "../../models/panitia/Inti.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const pengurusInti = await PengurusInti.find();
    res.json({ pengurusInti });
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const pengurusInti = await PengurusInti.findById(id);
    if (!pengurusInti) {
      res.status(404);
      throw new Error(`Tidak ada pengurus inti dengan id ${id}`);
    }
    res.json({ pengurusInti });
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  const { nama, fakultas, jurusan, angkatan, jabatan } = req.body;

  try {
    const pengurusInti = await PengurusInti.create({
      nama,
      fakultas,
      jurusan,
      angkatan,
      jabatan,
    });
    res.status(201).json({ pengurusInti });
  } catch (err) {
    next(err);
  }
});

router.patch("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { nama, fakultas, jurusan, angkatan, jabatan } = req.body;

  try {
    const pengurusInti = await PengurusInti.findById(id);
    if (!pengurusInti) {
      res.status(404);
      throw new Error(`Tidak ada pengurus inti dengan id ${id}`);
    }
    pengurusInti.nama = nama || pengurusInti.nama;
    pengurusInti.fakultas = fakultas || pengurusInti.fakultas;
    pengurusInti.jurusan = jurusan || pengurusInti.jurusan;
    pengurusInti.angkatan = angkatan || pengurusInti.angkatan;
    pengurusInti.jabatan = jabatan || pengurusInti.jabatan;
    await pengurusInti.save();
    res.json({ pengurusInti });
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const pengurusInti = await PengurusInti.findByIdAndDelete(id);
    if (!pengurusInti) {
      res.status(404);
      throw new Error(`Tidak ada pengurus inti dengan id ${id}`);
    }
    res.json({ message: `Berhasil menghapus pengurus inti` });
  } catch (err) {
    next(err);
  }
});

export default router;
