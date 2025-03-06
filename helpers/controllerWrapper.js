import { ValidationError } from "sequelize";
import HttpError from "./HttpError.js";

const ctrlWrapper = (controller) => {
  const func = async (req, res, next) => {
    try {
      await controller(req, res);
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        return next(HttpError(400, error.message));
      }
      if (error.name === "SequelizeUniqueConstraintError") {
        return next(HttpError(409, error.message));
      }
      next(error);
    }
  };
  return func;
};

export default ctrlWrapper;