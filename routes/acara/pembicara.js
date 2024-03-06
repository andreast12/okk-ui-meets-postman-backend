import express from "express";
import Pembicara from "../../models/acara/Pembicara.js";
import Acara from "../../models/acara/Acara.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const pembicara = await Pembicara.find().populate("acara");
    res.json({ pembicara });
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const pembicara = await Pembicara.findById(id).populate("acara");
    if (!pembicara) {
      res.status(404);
      throw new Error(`Tidak ada pembicara dengan id ${id}`);
    }
    res.json({ pembicara });
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  const { nama, idAcara } = req.body;
  let acara;

  try {
    acara = await Acara.findById(idAcara);
    if (!acara) {
      res.status(404);
      throw new Error(`Tidak ada acara dengan id ${idAcara}`);
    }
  } catch (err) {
    next(err);
    return;
  }

  try {
    const pembicara = await Pembicara.create({
      nama,
      acara: acara._id,
    });
    acara.pembicara.push(pembicara._id);
    await acara.save();
    res.status(201).json({ pembicara });
  } catch (err) {
    next(err);
  }
});

router.patch("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { nama, idAcara } = req.body;
  let acara;

  if (idAcara) {
    try {
      acara = await Acara.findById(idAcara);
      if (!acara) {
        res.status(404);
        throw new Error(`Tidak ada acara dengan id ${idAcara}`);
      }
    } catch (err) {
      next(err);
      return;
    }
  }

  try {
    const pembicara = await Pembicara.findById(id);
    if (!pembicara) {
      res.status(404);
      throw new Error(`Tidak ada pembicara dengan id ${id}`);
    }
    pembicara.nama = nama || pembicara.nama;
    if (idAcara) {
      const acaraLama = await Acara.findById(pembicara.acara);
      if (acaraLama) {
        acaraLama.pembicara = acaraLama.pembicara.filter(
          (el) => el.toString() !== pembicara._id.toString()
        );
        await acaraLama.save();
      }

      acara.pembicara.push(pembicara._id);
      await acara.save();

      pembicara.acara = acara._id;
    }
    await pembicara.save();
    res.json({ pembicara });
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const pembicara = await Pembicara.findByIdAndDelete(id);
    if (!pembicara) {
      res.status(404);
      throw new Error(`Tidak ada pembicara dengan id ${id}`);
    }
    res.json({ message: "Berhasil menghapus pembicara" });
  } catch (err) {
    next(err);
  }
});

export default router;
