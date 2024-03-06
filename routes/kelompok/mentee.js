import express from "express";
import Mentee from "../../models/kelompok/Mentee.js";
import Kelompok from "../../models/kelompok/Kelompok.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const mentee = await Mentee.find().populate("kelompok");
    res.json({ mentee });
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const mentee = await Mentee.findById(id).populate("kelompok");
    if (!mentee) {
      res.status(404);
      throw new Error(`Tidak ada mentee dengan id ${id}`);
    }
    res.json({ mentee });
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  const { nama, fakultas, jurusan, angkatan, jalurMasuk, noKelompok } =
    req.body;
  let kelompok;

  try {
    kelompok = await Kelompok.findOne({ nomor: noKelompok });
    if (!kelompok) {
      res.status(404);
      throw new Error(`Tidak ada kelompok dengan nomor ${noKelompok}`);
    }
  } catch (err) {
    next(err);
    return;
  }

  try {
    const mentee = await Mentee.create({
      nama,
      fakultas,
      jurusan,
      angkatan,
      jalurMasuk,
      kelompok: kelompok._id,
    });
    kelompok.mentee.push(mentee._id);
    await kelompok.save();
    res.status(201).json({ mentee });
  } catch (err) {
    next(err);
  }
});

router.patch("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { nama, fakultas, jurusan, angkatan, jalurMasuk, noKelompok } =
    req.body;
  let kelompok;

  if (noKelompok) {
    try {
      kelompok = await Kelompok.findOne({ nomor: noKelompok });
      if (!kelompok) {
        res.status(404);
        throw new Error(`Tidak ada kelompok dengan nomor ${noKelompok}`);
      }
    } catch (err) {
      next(err);
      return;
    }
  }

  try {
    const mentee = await Mentee.findById(id);
    if (!mentee) {
      res.status(404);
      throw new Error(`Tidak ada mentee dengan id ${id}`);
    }
    mentee.nama = nama || mentee.nama;
    mentee.fakultas = fakultas || mentee.fakultas;
    mentee.jurusan = jurusan || mentee.jurusan;
    mentee.angkatan = angkatan || mentee.angkatan;
    mentee.jalurMasuk = jalurMasuk || mentee.jalurMasuk;
    if (noKelompok) {
      const kelompokLama = await Kelompok.findById(mentee.kelompok);
      if (kelompokLama) {
        kelompokLama.mentee = kelompokLama.mentee.filter(
          (el) => el.toString() !== mentee._id.toString()
        );
        await kelompokLama.save();
      }

      kelompok.mentee.push(mentee._id);
      await kelompok.save();

      mentee.kelompok = kelompok._id;
    }
    await mentee.save();
    res.json({ mentee });
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const mentee = await Mentee.findByIdAndDelete(id);
    if (!mentee) {
      res.status(404);
      throw new Error(`Tidak ada mentee dengan id ${id}`);
    }
    res.json({ message: "Berhasil menghapus mentee" });
  } catch (err) {
    next(err);
  }
});

export default router;
