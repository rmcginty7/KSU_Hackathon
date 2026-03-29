const router = require('express').Router();
const Exercise = require('../models/Exercise');

// Get all exercises
router.get('/', async (req, res) => {
  try {
    const { muscleGroup, equipment } = req.query;
    const filter = {};
    if (muscleGroup) filter.muscleGroup = muscleGroup;
    if (equipment) filter.equipment = equipment;

    const exercises = await Exercise.find(filter).sort({ name: 1 });
    res.json(exercises);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create an exercise
router.post('/', async (req, res) => {
  try {
    const exercise = await Exercise.create(req.body);
    res.status(201).json(exercise);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single exercise
router.get('/:id', async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.id);
    if (!exercise) return res.status(404).json({ error: 'Exercise not found' });
    res.json(exercise);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;