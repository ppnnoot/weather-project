const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  // Define your schema fields here
  // For example:
  name: { type: String, required: true },
  value: { type: Number, required: true },
});

const DataModel = mongoose.model('Data', dataSchema);

module.exports = DataModel;
g