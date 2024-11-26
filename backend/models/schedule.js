const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  identifier: {type: String},
  title: {type: String},
  desc: {type: String},
  time: {type: String}
})

const dateSchema = new mongoose.Schema({
  events: eventSchema,
  timeslots: {type: Array}
}
)

// Define the schema
const scheduleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, require: true},
  monday: dateSchema,
  tuesday: dateSchema,
  wednesday: dateSchema,
  thrusday: dateSchema,
  friday: dateSchema,
  saturday: dateSchema,
});

// Check if the model already exists, and if not, define it
const Schedule = mongoose.models.Schedule || mongoose.model('Schedule', scheduleSchema);

module.exports = Schedule;
