import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import errorHandler from "./middlewares/error.middleware.js";
import router from "./routes/index.js";
const app = express();

/* -------------------- Global Middlewares -------------------- */

// Parse JSON request body
app.use(express.json());

// Parse URL Encoded Data
app.use(express.urlencoded({ extended: true }));

// Parse Cookies
app.use(cookieParser());

// Enable CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);




/* -------------------- Health Check -------------------- */

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Tutor Room Backend Running 🚀",
  });
});

/* ---------------- API Routes ---------------- */

app.use("/api/v1", router);


app.use(errorHandler);

export default app;