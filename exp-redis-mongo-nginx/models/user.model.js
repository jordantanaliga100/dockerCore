const { default: mongoose } = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    require: [true, "User must have a username"],
    unique: true,
  },
  password: {
    type: String,
    require: [true, "User must have a password"],
  },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
