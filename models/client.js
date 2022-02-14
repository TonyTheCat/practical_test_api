const mongoose = require('mongoose');

const { Schema } = mongoose;

const Client = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    providers: { type: Array },
    created_at: { type: Date, default: Date.now() },
    updated_at: { type: Date, default: Date.now() },
  },
  { versionKey: false },
);

module.exports = mongoose.model('Client', Client);