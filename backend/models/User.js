const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Name is required"] },
  phoneNumber: {
    type: String,
    required: [true, "Phone number is required"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    validate: {
      validator: function (email) {
        return /^\S+@\S+\.\S+$/.test(email);
      },
      message: (props) => `${props.value} is not a valid email address`,
    },
  },
  address: { type: String, required: [true, "Address is required"] },
  zipCode: { type: String, required: [true, "Zip code is required"] },
  town: { type: String, required: [true, "Town is required"] },
  country: { type: String, required: [true, "Country is required"] },
  password: { type: String, required: [true, "Password is required"] },
});

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
