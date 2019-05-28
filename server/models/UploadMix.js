const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UploadMixSchema = new Schema(
  {
    name: { type: String, default: "Unnamed Mix" },
    description: String,
    owner: { type: Schema.Types.ObjectId, ref: "User" },
    rating: Number,
    file: String,
    midiname: { type: Schema.Types.ObjectId, ref: "Midi" }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const UploadMix = mongoose.model("UploadMix", UploadMixSchema);
module.exports = UploadMix;
