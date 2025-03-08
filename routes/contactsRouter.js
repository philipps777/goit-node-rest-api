import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateFavorite,
} from "../controllers/contactsControllers.js";
import validateBody from "../helpers/validateBody.js";
import {
  createContactSchema,
  updateContactSchema,
} from "../schemas/contactsSchemas.js";
import { updateFavoriteSchema } from "../schemas/contactsSchemas.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";



const contactsRouter = express.Router();

contactsRouter.use(authMiddleware);

contactsRouter.get("/", getAllContacts);
contactsRouter.get("/:id", getOneContact);
contactsRouter.delete("/:id", deleteContact);
contactsRouter.post("/", validateBody(createContactSchema), createContact);
contactsRouter.put("/:id", validateBody(updateContactSchema), updateContact);
contactsRouter.patch("/:id/favorite", validateBody(updateFavoriteSchema), updateFavorite);

export default contactsRouter;
