const mongoose = require('mongoose');

// Define the schema for the Login model
const loginSchema = new mongoose.Schema({
  username: { type: String, required: true, trim: true, unique: true },
  password: { type: String, required: true, trim: true },
  role: { type: String, required: true, enum: ['Coach', 'Player'] }
});

// Check if the model is already defined; if not, define it
const Login = mongoose.models.Login || mongoose.model('Login', loginSchema);

// Export the model for use in other parts of the application
module.exports = Login;


