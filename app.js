import express from "express";
import morgan from "morgan";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./config/database.js";

const { PORT = 3000 } = process.env;

import contactsRouter from "./routes/contactsRouter.js";


const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});


// app.listen(3000, () => {
//   console.log("Server is running. Use our API on port: 3000");
// });

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
  });
};

startServer();