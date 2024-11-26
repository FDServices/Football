const mongoose = require('mongoose');

// Define the schema
const coachSchema = new mongoose.Schema({
  name: { type: String, required: true },
  player: {type: Array}
});

// Check if the model already exists, and if not, define it
const Coach = mongoose.models.acoaches || mongoose.model('Coach', coachSchema);

module.exports = Coach;
