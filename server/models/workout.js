const { Schema, model } = require('mongoose');

const workoutSchema = new Schema({
  userId:   { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name:     { type: String, required: true },
  date:     { type: Date, default: Date.now },
  duration: Number, // in minutes
  exercises: [
    {
      name:   { type: String, required: true },
      sets:   Number,
      reps:   Number,
      weight: Number // in lbs
    }
  ],
  notes: String
});

module.exports = model('Workout', workoutSchema);