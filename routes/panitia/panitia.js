import express from "express";
import PengurusInti from "../../models/panitia/Inti.js";
import BPH from "../../models/panitia/bph/BPH.js";
import intiRouter from "./inti.js";
import bphRouter from "./bph/bph.js";

const router = express.Router();

router.use("/inti", intiRouter);
router.use("/bph", bphRouter);

router.get("/", async (req, res, next) => {
  try {
    const pengurusInti = await PengurusInti.find();
    const bph = await BPH.find();
    res.json({ panitia: { pengurusInti, BPH: bph } });
  } catch (err) {
    next(err);
  }
});

export default router;
