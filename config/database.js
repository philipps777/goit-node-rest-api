import { Sequelize, DataTypes } from 'sequelize';
import dotenv from "dotenv";

dotenv.config();

// const sequelize = new Sequelize({
//     dialect: process.env.DATABASE_DIALECT,
//     username: process.env.DATABASE_USERNAME,
//     password: process.env.DATABASE_PASSWORD,
//     host: process.env.DATABASE_HOST,
//     database: process.env.DATABASE_NAME,
//     port: process.env.DATABASE_PORT,
//     dialectOptions: {
//       ssl: true,
//     },
//   });
  
//   try {
//     await sequelize.authenticate();
//     console.log("Connection has been established successfully.");
//   } catch (error) {
//     console.error("Unable to connect to the database:", error);
//   }
  
//   export default sequelize;

// export const sequelize = new Sequelize(process.env.DATABASE_URL, {
//     dialect: "postgres",
//     dialectOptions: {
//         ssl: {
//             require: true,
//             rejectUnauthorized: false,
//         },
//     },
// });

// console.log("Connected to DB:", process.env.DATABASE_URL);


// export const connectDB = async () => {
//     try {
//         await sequelize.authenticate();
//         console.log("Database connection successful");
//     } catch (error) {
//         console.error("Database connection error:", error.message);
//         process.exit(1);
//     }
// };


// export const sequelize = new Sequelize(config.POSTGRES_URI, {
//     logging: false,
//     define: {
//       timestamps: false,
//     },
//   });


// +++++++++++++++++++++++++++++++++++++++
// const sequelize = new Sequelize({
//     dialect: "postgres",  
//     username: process.env.DATABASE_USERNAME,
//     password: process.env.DATABASE_PASSWORD,
//     host: process.env.DATABASE_HOST,
//     database: process.env.DATABASE_NAME,
//     port: process.env.DATABASE_PORT,
//     dialectOptions: {
//       ssl: process.env.DATABASE_SSL ? { require: true, rejectUnauthorized: false } : false,
//     },
//   });
  
//   console.log("🔗  Connected to DB:", process.env.DATABASE_HOST);
  
//   export const connectDB = async () => {
//       try {
//           await sequelize.authenticate();
//           console.log("✅  Database connection successful");
//       } catch (error) {
//           console.error("❌  Database connection error:", error.message);
//           process.exit(1);
//       }
//   };

const sequelize = new Sequelize({
    dialect: process.env.DATABASE_DIALECT,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    port: process.env.DATABASE_PORT,
    dialectOptions: {
      ssl: true,
    },
  });

try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
  


  export default sequelize;