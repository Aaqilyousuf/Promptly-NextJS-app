const { Schema, model, models } = require("mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email already used"],
  },
  userName: {
    type: String,
    required: [true, "User name is required"],
  },
  image: {
    type: String,
  },
});

const User = models.User || model("User", userSchema);
export default User;
