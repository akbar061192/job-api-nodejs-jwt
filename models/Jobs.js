const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: true,
      maxLength: 20,
    },
    position: {
      type: String,
      required: true,
      maxLength: 50,
    },
    status: {
      type: String,
      enum: ["interview", "declined", "pending"],
      default: "pending",
    },
    createdByUserId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    createdByUserEmail: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", JobSchema);
