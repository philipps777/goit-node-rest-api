import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import { User } from "./userModel.js";

const Contact = sequelize.define(
    "contact",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        favorite: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        owner: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: "id",
            },
        },
    },
    {
        tableName: "contacts",
        timestamps: true,
    }
);


User.hasMany(Contact, { foreignKey: "owner", onDelete: "CASCADE" });
Contact.belongsTo(User, { foreignKey: "owner" });


// Contact.sync();

export default Contact;

