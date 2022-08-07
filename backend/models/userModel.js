import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// A method to compare the entered plain password with the one saved in the database which is encrypted
// This method can be accessed through stantiated user
// When we call matchPassword method on specific user we get the encrypted password for that user through this.password

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Adding a middleware to encrypt the password before saved
userSchema.pre("save", async function (next) {
  // This if statement is to check if the password field is sent or modified
  // isModified is a mongoose method to check if somthing is modified and in this case the password field
  if (!this.isModified("password")) {
    next();
  }

  // create a salt to hash the password asynchronously with 10 number of rounds
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

export default User;
