import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import multer from "multer";
import { errorHandler, routeNotFound } from "./middleware/errorMiddleware.js";
import routes from "./routes/index.js";
import dbConnection from "./utils/connectDB.js";

dotenv.config();

dbConnection();

// Default to 5000 to match local dev and Vite proxy target
const port = process.env.PORT || 5000;

const app = express();

app.use(
  cors({
    origin: [
      "https://mern-task-manager-app.netlify.app",
      "http://localhost:3000",
      "http://localhost:3001",
      // Vite dev server default
      "http://localhost:5173",
    ],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// Configure multer for file uploads (store in memory)
const upload = multer({ storage: multer.memoryStorage() });
app.use("/api/upload", upload.single("file"));

//app.use(morgan("dev"));
app.use("/api", routes);

app.use(routeNotFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server listening on ${port}`));
