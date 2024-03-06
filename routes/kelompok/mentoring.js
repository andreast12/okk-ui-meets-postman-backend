import express from "express";
import Mentoring from "../../models/kelompok/Mentoring.js";
import Kelompok from "../../models/kelompok/Kelompok.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const mentoring = await Mentoring.find().populate(["kelompok", "peserta"]);
    res.json({ mentoring });
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const mentoring = await Mentoring.findById(id).populate([
      "kelompok",
      "peserta",
    ]);
    if (!mentoring) {
      res.status(404);
      throw new Error(`Tidak ada mentoring dengan id ${id}`);
    }
    res.json({ mentoring });
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  const { peserta, waktu, tempat, materi, noKelompok } = req.body;
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
    const mentoring = await Mentoring.create({
      peserta,
      waktu,
      tempat,
      materi,
      kelompok: kelompok._id,
    });
    kelompok.mentoring.push(mentoring._id);
    await kelompok.save();
    res.status(201).json({ mentoring });
  } catch (err) {
    next(err);
  }
});

router.patch("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { peserta, waktu, tempat, materi, noKelompok } = req.body;
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
    const mentoring = await Mentoring.findById(id);
    if (!mentoring) {
      res.status(404);
      throw new Error(`Tidak ada mentoring dengan id ${id}`);
    }
    mentoring.peserta = peserta || mentoring.peserta;
    mentoring.waktu = waktu || mentoring.waktu;
    mentoring.tempat = tempat || mentoring.tempat;
    mentoring.materi = materi || mentoring.materi;
    if (noKelompok) {
      const kelompokLama = await Kelompok.findById(mentoring.kelompok);
      if (kelompokLama) {
        kelompokLama.mentoring = kelompokLama.mentoring.filter(
          (el) => el.toString() !== mentoring._id.toString()
        );
        await kelompokLama.save();
      }

      kelompok.mentoring.push(mentoring._id);
      await kelompok.save();

      mentoring.kelompok = kelompok._id;
    }
    await mentoring.save();
    res.json({ mentoring });
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const mentoring = await Mentoring.findByIdAndDelete(id);
    if (!mentoring) {
      res.status(404);
      throw new Error(`Tidak ada mentoring dengan id ${id}`);
    }
    res.json({ message: "Berhasil menghapus mentoring" });
  } catch (err) {
    next(err);
  }
});

export default router;
