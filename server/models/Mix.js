const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MixSchema = new Schema(
  {
    name: { type: String, default: "Unnamed Mix" },
    description: String,
    owner: { type: Schema.Types.ObjectId, ref: "User" },
    rating: Number,
    file: String,
    midiname: String
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const Mix = mongoose.model("Mix", MixSchema);
module.exports = Mix;
