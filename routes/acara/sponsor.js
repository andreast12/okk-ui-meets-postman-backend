import express from "express";
import Sponsor from "../../models/acara/Sponsor.js";
import Acara from "../../models/acara/Acara.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const sponsor = await Sponsor.find().populate("acara");
    res.json({ sponsor });
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const sponsor = await Sponsor.findById(id).populate("acara");
    if (!sponsor) {
      res.status(404);
      throw new Error(`Tidak ada sponsor dengan id ${id}`);
    }
    res.json({ sponsor });
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  const { nama, paket, idAcara } = req.body;
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
    const sponsor = await Sponsor.create({
      nama,
      paket,
      acara: acara._id,
    });
    acara.sponsor.push(sponsor._id);
    await acara.save();
    res.status(201).json({ sponsor });
  } catch (err) {
    next(err);
  }
});

router.patch("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { nama, paket, idAcara } = req.body;
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
    const sponsor = await Sponsor.findById(id);
    if (!sponsor) {
      res.status(404);
      throw new Error(`Tidak ada sponsor dengan id ${id}`);
    }
    sponsor.nama = nama || sponsor.nama;
    sponsor.paket = paket || sponsor.paket;
    if (idAcara) {
      const acaraLama = await Acara.findById(sponsor.acara);
      if (acaraLama) {
        acaraLama.sponsor = acaraLama.sponsor.filter(
          (el) => el.toString() !== sponsor._id.toString()
        );
        await acaraLama.save();
      }

      acara.sponsor.push(sponsor._id);
      await acara.save();

      sponsor.acara = acara._id;
    }
    await sponsor.save();
    res.json({ sponsor });
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const sponsor = await Sponsor.findByIdAndDelete(id);
    if (!sponsor) {
      res.status(404);
      throw new Error(`Tidak ada sponsor dengan id ${id}`);
    }
    res.json({ message: "Berhasil menghapus sponsor" });
  } catch (err) {
    next(err);
  }
});

export default router;
