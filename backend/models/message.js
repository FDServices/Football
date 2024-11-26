const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'Login', required: true },
});

const Message = mongoose.models.Message || mongoose.model('Message', messageSchema);

module.exports = Message;
