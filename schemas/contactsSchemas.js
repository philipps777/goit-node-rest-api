import Joi from "joi";

const requiredFields = ["name", "email", "phone"];

export const createContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean().optional(),
});


export const updateContactSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    phone: Joi.string(),
    favorite: Joi.boolean(),
  })
    .or(...requiredFields)
    .messages({
      "object.missing": `Body must have at least one field [${requiredFields.join(
        ", "
      )}]`,
    });

    export const updateFavoriteSchema = Joi.object({
      favorite: Joi.boolean().required(),
  });    