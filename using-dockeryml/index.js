// IMPORTS
const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const {
  MONGO_PASSWORD,
  MONGO_USER,
  MONGO_IP,
  MONGO_PORT,
} = require("./config/config.js");
const postRouter = require("./routes/post.routes.js");
dotenv.config();
// ENV CONFIG
const envFile =
  process.env.NODE_ENV === "production" ? ".env.prod" : ".env.dev";
dotenv.config({ path: envFile });
console.log("Loaded " + envFile + ":");
const app = express();

// TOP MIDDLEWARES
app.use(express.json());
app.use(express.static("./public"));

// ROUTES
const users = [
  { name: "jordan100", pro: "dev" },
  { name: "chris100", pro: "col" },
];
app.get("/", (req, res) => {
  res.json({
    msg: "Node_Express Server Alive 🛩️",
    data: users.slice(0, 2),
  });
});

app.use("/api/v1/auth", () => {});
app.use("/api/v1/user", () => {});
app.use("/api/v1/post", postRouter);

// BOTTOM MIDDLEWARES
app.use((req, res, next) => {
  res
    .status(404)
    .send("<h3>Route Does not Exist</h3>" + "<a href='/'>Go Back</a>");
});
app.use((err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || 500,
    msg: err.message || "Something went wrong",
  };

  res.status(customError.statusCode).json({
    ERROR: customError.msg,
  });
});

// SERVER INSTANCE
const DB_URL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/post?authSource=admin`;

const connectWithRetry = async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log("✅ MongoDB connected!");
  } catch (err) {
    console.error(
      "❌ MongoDB connection failed. Retrying in 3s...",
      err.message
    );

    setTimeout(connectWithRetry, 3000);
  }
};
const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectWithRetry();
    app.listen(port, () => {
      console.log("🚀 Server started at port", port);
      console.log("🌱 Environment:", process.env.NODE_ENV);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
console.log("... on " + process.env.NODE_ENV + " environment 🚀");
