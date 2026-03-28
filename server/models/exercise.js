const { Schema, model } = require('mongoose');

const exerciseSchema = new Schema({
  name:        { type: String, required: true },
  muscleGroup: { type: String, enum: ['chest', 'back', 'legs', 'shoulders', 'arms', 'core', 'cardio'] },
  equipment:   { type: String, enum: ['barbell', 'dumbbell', 'machine', 'bodyweight', 'cable', 'other'] },
  description: String
});

module.exports = model('Exercise', exerciseSchema);