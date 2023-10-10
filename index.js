//librerias externas
const express = require("express");
const fs = require("fs"); 
const { v4: uuidv4 } = require("uuid");
//modulos internos
const { readFile, writeFile } = require("./src/files.js");
const { validatorHandler } = require("./middlewares/validator.handler.js"); 
const {
  createMovilSchema,
  updateMovilSchema,
  getMovilSchema,
} = require("./schemas/schemas.js"); 
const app = express();
const FILE_NAME = "./db/moviles.txt";

app.use(express.urlencoded({ extend: false })); 
app.use(express.json());

app.get("/moviles", async (req, res) => {
  const data = readFile(FILE_NAME);
  res.send(data);
});

app.post("/moviles", validatorHandler(createMovilSchema, "body"), async (req, res) => {
    try {
      const data = readFile(FILE_NAME);
      const newMovil = req.body;
      newMovil.id = uuidv4();
      console.log(newMovil);
      console.log(data);
      data.push(newMovil);
      writeFile(FILE_NAME, data);
      res.json({ message: "El movil fue creado con exito" });
    } catch (err) {
      console.error(err);
      res.json({ message: "Error al crear el movil" });
    }
  }
);

app.get("/moviles/:id", validatorHandler(getMovilSchema, "params"), async (req, res) => {
    console.log(req.params.id);
    const id = req.params.id;
    const moviles = readFile(FILE_NAME);
    const movilFound = moviles.find((movil) => movil.id === id);
    if (!movilFound) {
      res.status(404).json({ ok: false, message: "movil not found" });
      return;
    }
    res.send({ ok: true, movil: movilFound });
  }
);

app.put("/moviles/:id", validatorHandler(updateMovilSchema, "body"), async (req, res) => {
    console.log(req.params.id);
    const id = req.params.id;
    const moviles = readFile(FILE_NAME);
    const movilIndex = moviles.findIndex((movil) => movil.id === id);
    if (movilIndex < 0) {
      res.status(404).json({ ok: false, message: "movil not found" });
      return;
    }
    let movil = moviles[movilIndex];
    movil = { ...movil, ...req.body };
    moviles[movilIndex] = movil;
    writeFile(FILE_NAME, moviles);
    res.send({ ok: true, movil: movil });
  }
);

app.delete("/moviles/:id", validatorHandler(getMovilSchema, "params"), async (req, res) => {
    console.log(req.params.id);
    const id = req.params.id;
    const moviles = readFile(FILE_NAME);
    const movilIndex = moviles.findIndex((movil) => movil.id === id);
    if (movilIndex < 0) {
      res.status(404).json({ ok: false, message: "movil not found" });
      return;
    }
    moviles.splice(movilIndex, 1);
    writeFile(FILE_NAME, moviles);
    res.send({ ok: true, movil: true });
  }
);

app.listen(3000, () =>
  console.log(`Server is running on http://localhost:3000`)
);
