const { Schema, model } = require('mongoose');

const setSchema = new Schema({
  reps: { type: Number, required: true },
  weight: { type: Number, required: true } 
}, { _id: false });

const exerciseSchema = new Schema({
  name: { type: String, required: true},
  sets: [setSchema]
}, { _id: false});

const workoutSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: false },
  name: { type: String, required: true },
  date: { type: Date, default: Date.now },
  exercises: [exerciseSchema],
  notes: String
})

module.exports = model('Workout', workoutSchema);