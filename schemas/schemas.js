const Joi = require("joi");

const id = Joi.string().uuid();
  const marca =  Joi.string().min(1).max(100);
  const modelo = Joi.string().min(1).max(100);
  const numeroDeSerie = Joi.string().min(1).max(100);
  const sistemaOperativo = Joi.string().min(1).max(50);
  const fechaLanzamiento = Joi.date().iso();
  const almacenamientoInternoGB = Joi.number().positive();
  const camaraPrincipalMP = Joi.number().positive();
  const conectividad = Joi.array().items(Joi.string()).min(1).max(100);

const createMovilSchema = Joi.object({
    marca: marca.required(),
    modelo: modelo.required(),
    numeroDeSerie: numeroDeSerie.required(),
    sistemaOperativo: sistemaOperativo.required(),
    fechaLanzamiento: fechaLanzamiento.required(),
    almacenamientoInternoGB: almacenamientoInternoGB.required(),
    camaraPrincipalMP: camaraPrincipalMP.required(),
    conectividad: conectividad.required(),
});

const updateMovilSchema = Joi.object({
    marca: marca.optional(),
    modelo: modelo.optional(),
    numeroDeSerie: numeroDeSerie.optional(),
    sistemaOperativo: sistemaOperativo.optional(),
    fechaLanzamiento: fechaLanzamiento.optional(),
    almacenamientoInternoGB: almacenamientoInternoGB.optional(),
    camaraPrincipalMP: camaraPrincipalMP.optional(),
    conectividad: conectividad.optional(),
});

const getMovilSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createMovilSchema,
  updateMovilSchema,
  getMovilSchema,
};
