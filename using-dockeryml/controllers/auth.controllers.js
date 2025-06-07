const User = require("../models/user.model.js");
const bcrypt = require("bcryptjs");
// Register a new user
exports.REGISTER_USER = async (req, res, next) => {
  const {
    body: { password },
  } = req;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = {
      ...req.body,
      password: hashedPassword,
    };
    const result = await User.create(newUser);
    const { password: _, ...userWithoutPassword } = result.toObject();

    req.session.user = userWithoutPassword;

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: userWithoutPassword,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// User Login
exports.LOGIN_USER = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: `No User found with username: ${username}`,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: `Invalid credentials`,
      });
    }
    // attache user session here...
    req.session.user = user;

    const { password: _, ...userWithoutPassword } = user.toObject();
    res.status(200).json({ success: true, data: userWithoutPassword });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// User Logout
exports.LOGOUT_USER = async (req, res) => {
  try {
    await User.find(token);
    res.clearCookie("token");
    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
