import express, { Request, Response, NextFunction } from "express";
import axios from "axios";
import fs from "fs";
import path from "path";

require("dotenv").config();

const getLinkRouter = express();
const pdfFilePath = path.join(__dirname, "cerfa.pdf");

getLinkRouter.get("/", async (req, res) => {
  try {
    const link = "https://www.formulaires.service-public.fr/gf/cerfa_10103.do";

    // Téléchargez le fichier PDF depuis le lien distant
    const pdfResponse = await axios.get(link, { responseType: "arraybuffer" });

    // Sauvegardez le fichier PDF localement
    fs.writeFileSync(pdfFilePath, pdfResponse.data);

    // Renvoyez le fichier PDF comme téléchargement
    res.download(pdfFilePath);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


export default getLinkRouter;
