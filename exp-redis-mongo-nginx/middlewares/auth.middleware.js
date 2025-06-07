require("dotenv").config();

const authenticationMiddleware = async (req, res, next) => {
  try {
    const { user } = req.session;

    if (!user) {
      return res
        .status(400)
        .json({
          status: "failed",
          message: "Unauthorized to access this route",
        });
    }
    req.user = user;

    return next();
  } catch (error) {
    console.log("AUTHENTICATION ERROR", error);
    next(error);
  }
};

module.exports = authenticationMiddleware;
