import express, { json } from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercise, exerciseValues } from './exerciseCalculator';

const app = express();
app.use(json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (!req.query.height || !req.query.weight) {
    res.statusCode = 404;
    res.json({ error: calculateBmi(height, weight) });
  } else
    res.json({
      weight,
      height,
      bmi: calculateBmi(height, weight),
    });
});
//http://localhost:3003/bmi?weight=74&height=180

app.post('/exercises', (req, res) => {
  const { exercises, target } = req.body as exerciseValues;

  if (!exercises || !target) {
    res.statusCode = 404;
    res.json({ error: 'parameters missing' });
  } else if (isNaN(target) || exercises.some((e) => isNaN(e))) {
    res.statusCode = 404;
    res.json({ error: 'malformatted parameters' });
  } else if (
    !isNaN(target) &&
    exercises.every((e) => !isNaN(e)) &&
    exercises.length > 1
  ) {
    res.json(calculateExercise(exercises, target));
  }
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
