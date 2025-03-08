

import HttpError from "../helpers/HttpError.js";
import Contact from "../models/contactModel.js";


export const getAllContacts = async (req, res, next) => {
    try {
        const contacts = await Contact.findAll({
            where: { owner: req.user.id }
        });

        res.status(200).json(contacts);
    } catch (error) {
        next(error);
    }
};

export const getOneContact = async (req, res, next) => {
    try {
        const { id } = req.params;
        const contact = await Contact.findOne({
            where: { id, ownerId: req.user.id } 
        });
        if (!contact) {
            throw HttpError(404, "Not found");
        }
        res.status(200).json(contact);
    } catch (error) {
        next(error);
    }
};

export const deleteContact = async (req, res, next) => {
    try {
        const { id } = req.params;
        const contact = await Contact.findOne({
            where: { id, ownerId: req.user.id }
        });
        if (!contact) {
            throw HttpError(404, "Not found");
        }
        res.status(200).json(contact);
    } catch (error) {
        next(error);
    }
};


export const createContact = async (req, res, next) => {
    try {
        const { name, email, phone } = req.body;
        const owner = req.user.id;

        const contact = await Contact.create({ name, email, phone, owner });

        res.status(201).json(contact);
    } catch (error) {
        next(error);
    }
};

export const updateContact = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (Object.keys(req.body).length === 0) {
            throw HttpError(400, "Body must have at least one field");
        }

        const contact = await Contact.findOne({
            where: { id, ownerId: req.user.id } 
        });

        if (!contact) throw HttpError(404, "Not found");

        await contact.update(req.body);
        res.status(200).json(contact);
    } catch (error) {
        next(error);
    }
};

export const updateFavorite = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { favorite } = req.body;

        const contact = await Contact.findOne({
            where: { id, ownerId: req.user.id }
        });

        if (!contact) throw HttpError(404, "Not found");

        await contact.update({ favorite });
        res.status(200).json(contact);
    } catch (error) {
        next(error);
    }
};