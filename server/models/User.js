const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: String,
    password: String,
    name: String,
    favorites: [],
    imgUrl: {
      type: String,
      default: "https://s3.us-east-2.amazonaws.com/midibank/mixavatar.jpg"
    }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
