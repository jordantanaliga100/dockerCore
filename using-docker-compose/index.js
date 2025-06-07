// IMPORTS
const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");

const {
  MONGO_PASSWORD,
  MONGO_USER,
  MONGO_IP,
  MONGO_PORT,
  SESSION_SECRET,
  REDIS_URL,
  REDIS_PORT,
} = require("./config/config.js");
const authRouter = require("./routes/user.routes.js");
const postRouter = require("./routes/post.routes.js");
const { RedisStore, redisClient } = require("./redis/redis.js");
// const { RedisStore, redisClient } = require("./redis/redis.js");

dotenv.config();
// ENV CONFIG
const envFile =
  process.env.NODE_ENV === "production" ? ".env.prod" : ".env.dev";
dotenv.config({ path: envFile });
console.log("Loaded " + envFile + ":");

const app = express();
app.set("trust proxy", true);
app.use(cors());

// const { REDIS_PORT, REDIS_URL } = require("../config/config.js");

// TOP MIDDLEWARES
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: SESSION_SECRET,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 30000,
    },
  })
);

app.use(express.json());
app.use(express.static("./public"));

// ROUTES

app.get("/api/v1", (req, res) => {
  console.log("yeah it ran");
  res.send(`Handled by ${process.env.HOSTNAME}`);
  // res.json({
  //   msg: "Node_Express Server Alive 🛩️",
  // });
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", () => {});
app.use("/api/v1/posts", postRouter);

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
    await redisClient.connect();

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
