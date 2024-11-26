const mongoose = require('mongoose');

// Define the schema for a player
const playerSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    position: { type: String, required: true, trim: true },
    height: { type: String, required: true, trim: true },
    weight: { type: Number },
    squat: { type: Number },
    bench: { type: Number },
    clean: { type: Number },
    jerk: { type: Number },
    vertical: { type: Number },
    broad: { type: Number },
    mball: { type: Number },
    tenYard: { type: Number },
    tenFly: { type: Number },
    forty: { type: Number },
    notes: { type: Array},
    createdAt: { type: Date, default: Date.now },
});

// Create a model from the schema
const Player = mongoose.model('Player', playerSchema);

module.exports = Player;
