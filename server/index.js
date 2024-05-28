import cookieParser from "cookie-parser";
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import connectDB from "./utils/index.js";

dotenv.config();

connectDB();
const PORT = process.env.PORT || 5000;
const app = express();
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded());
app.use(morgan("dev"));
// app.get("/api",routes);

// app.use(routenotfound);
// app.use(errorhandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

