const { log } = require("console");
const express = require("express");
const connectToDatabase = require("./database");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const { default: mongoose } = require("mongoose");
const userRouter = require("./routes/user");

dotenv.config();

const Port = process.env.PORT;

const app = express();

connectToDatabase();

app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = ['https://netflix-beta-smoky.vercel.app', 'http://localhost:5173'];
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('CORS policy violation'));
      }
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/user", userRouter);

// Handling all other routes
app.all("*", (req, res) => {
  res.status(404).send({
    success: false,
    message: "API not found",
  });
});

app.listen(Port, () => {
  log(`Server is up and running at ${Port}`);
});
