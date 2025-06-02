// IMPORTS
const dotenv = require("dotenv");
const express = require("express");
dotenv.config();
// ENV CONFIG
const envFile =
  process.env.NODE_ENV === "production" ? ".env.prod" : ".env.local";
dotenv.config({ path: envFile });
console.log("Loaded " + envFile + ":");
const app = express();

// TOP MIDDLEWARES
app.use(express.json());
app.use(express.static("./public"));

// ROUTES
app.get("/", (req, res) => {
  res.send("Node_Express Server Alive 🛩️🛩️🛩️🛩️🛩️");
});

app.use("/api/v1/auth", () => {});
app.use("/api/v1/users", () => {});

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
const port = process.env.PORT || 8080;
const start = async () => {
  try {
    await function () {};
    app.listen(port, () => {
      console.log("Server started at " + port + " and connected to DB !!");
    });
  } catch (error) {
    console.log(error);
  }
};
start();
console.log("... on " + process.env.NODE_ENV + " environment 🚀");
