const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MidiSchema = new Schema(
  {
    name: { type: String, default: "Unnamed Track" },
    description: String,
    owner: { type: Schema.Types.ObjectId, ref: "User" },
    rating: Number,
    file: String
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const Midi = mongoose.model("Midi", MidiSchema);
module.exports = Midi;
