const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  userName:     { type: String, required: true, unique: true },
  name:         { type: String, required: true },
  email:        { type: String, required: true, unique: true },  // ← unique back here
  passwordHash: { type: String, required: true },
  createdAt:    { type: Date, default: Date.now },
  profile: {
    age:         Number,
    weight:      Number,
    height:      Number,
    fitnessGoal: { type: String, enum: ['lose_weight', 'build_muscle', 'maintain'] }
  }
});

module.exports = model('User', userSchema);