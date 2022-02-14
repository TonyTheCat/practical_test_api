const mongoose = require("mongoose");

const { Schema } = mongoose;

const Provider = new Schema(
  {
    name: { type: String, required: true },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Provider", Provider);
module.exports = Provider;
