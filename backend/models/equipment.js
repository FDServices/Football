const mongoose = require('mongoose');

// Define the schema
const equipmentSchema = new mongoose.Schema({
  equipment: { type: String, required: true },
  size: { type: String, required: true },
  player: { type: String, default: '' },
  number: {type: String, default: ''},
  type: { type: String, default: '' },
});

// Check if the model already exists, and if not, define it
const Equipment = mongoose.models.Equipment || mongoose.model('Equipment', equipmentSchema);

module.exports = Equipment;
