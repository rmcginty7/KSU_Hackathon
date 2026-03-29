const router = require('express').Router();
const Workout = require('../models/workout');

// Create a new workout
router.post('/', async (req, res) => {
  try {
    const { userId, name, duration, exercises = [], notes } = req.body;

    // Basic validation: name and at least one exercise with at least one set
    if (!name || !Array.isArray(exercises) || exercises.length === 0) {
      return res.status(400).json({ message: 'Missing required fields.' });
    }

    // Normalize/validate sets: require numeric reps & weight
    const normalizedExercises = exercises.map((ex) => ({
      name: ex.name,
      sets: (ex.sets || [])
        .map((s) => ({
          reps: Number(s.reps),
          weight: Number(s.weight),
        }))
        .filter((s) => !Number.isNaN(s.reps) && !Number.isNaN(s.weight)),
    })).filter((ex) => ex.name && ex.sets.length > 0);

    if (normalizedExercises.length === 0) {
      return res.status(400).json({ message: 'Each exercise needs at least one valid set.' });
    }

    const workout = new Workout({
      userId,
      name,
      duration: Number(duration) || undefined,
      exercises: normalizedExercises,
      notes,
    });

    const savedWorkout = await workout.save();
    res.status(201).json(savedWorkout);
  } catch (error) {
    console.error('Error creating workout:', error)
    res.status(500).json({ message : "Failed to create workout" });
  }
})

// Get all workouts for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const workouts = await Workout.find({ userId: req.params.userId }).sort({ date: -1 });
    res.status(200).json(workouts);
  } catch (error) {
    console.error('Error fetching workouts:', error);
    res.status(500).json({ message: "Failed to retrieve workouts" });
  }
});

// Get a single workout
router.get('/:id', async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);
    if (!workout) return res.status(404).json({ error: 'Workout not found' });
    res.json(workout);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a workout
router.put('/:id', async (req, res) => {
  try {
    const workout = await Workout.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(workout);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a workout
router.delete('/:id', async (req, res) => {
  try {
    await Workout.findByIdAndDelete(req.params.id);
    res.json({ message: 'Workout deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
