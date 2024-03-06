import express from "express";
import BPH from "../../../models/panitia/bph/BPH.js";
import rapatRouter from "./rapat.js";

const router = express.Router();

router.use("/rapat", rapatRouter);

router.get("/", async (req, res, next) => {
  try {
    const bph = await BPH.find();
    res.json({ BPH: bph });
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const bph = await BPH.findById(id);
    if (!bph) {
      res.status(404);
      throw new Error(`Tidak ada BPH dengan id ${id}`);
    }
    res.json({ BPH: bph });
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  const { nama, fakultas, jurusan, angkatan, divisi, jabatan } = req.body;

  try {
    const bph = await BPH.create({
      nama,
      fakultas,
      jurusan,
      angkatan,
      divisi,
      jabatan,
    });
    res.status(201).json({ BPH: bph });
  } catch (err) {
    next(err);
  }
});

router.patch("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { nama, fakultas, jurusan, angkatan, divisi, jabatan } = req.body;

  try {
    const bph = await BPH.findById(id);
    if (!bph) {
      res.status(404);
      throw new Error(`Tidak ada BPH dengan id ${id}`);
    }
    bph.nama = nama || bph.nama;
    bph.fakultas = fakultas || bph.fakultas;
    bph.jurusan = jurusan || bph.jurusan;
    bph.angkatan = angkatan || bph.angkatan;
    bph.divisi = divisi || bph.divisi;
    bph.jabatan = jabatan || bph.jabatan;
    await bph.save();
    res.json({ BPH: bph });
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const bph = await BPH.findByIdAndDelete(id);
    if (!bph) {
      res.status(404);
      throw new Error(`Tidak ada BPH dengan id ${id}`);
    }
    res.json({ message: `Berhasil menghapus BPH` });
  } catch (err) {
    next(err);
  }
});

export default router;
