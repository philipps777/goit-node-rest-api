import { Sequelize, DataTypes } from 'sequelize';
import dotenv from "dotenv";

dotenv.config();



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
    
      logging: false,
      define: {
        timestamps: false,
      },
  });


const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connection successful");
  } catch (error) {
    console.error("❌ Database connection error:", error.message);
    process.exit(1);
  }
};

export { sequelize, connectDB };
export default sequelize;