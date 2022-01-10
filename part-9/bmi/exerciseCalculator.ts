interface ExerciseInfo {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export interface exerciseValues {
  target: number;
  exercises: Array<number>;
}

type Result = ExerciseInfo;

const parseExerciseArguments = (args: Array<string>): exerciseValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  let target;
  const exercises = [];

  if (!isNaN(Number(args[2]))) {
    target = Number(args[2]);
  } else {
    throw new Error('Provided values were not numbers!');
  }

  for (let i = 3; i < args.length; i++) {
    if (isNaN(Number(args[i]))) {
      throw new Error('Provided values were not numbers!');
    } else exercises.push(Number(args[i]));
  }
  return {
    target,
    exercises,
  };
};

export const calculateExercise = (
  exercises: Array<number>,
  target: number
): Result => {
  let rating = 1;
  let desc = '';

  if (
    exercises.filter((e) => e > 0).length <= Math.floor(exercises.length / 2)
  ) {
    rating = 1;
    desc = 'exercise more!';
  } else if (
    exercises.filter((e) => e > 0).length > Math.floor(exercises.length / 2)
  ) {
    rating = 2;
    desc = 'not too bad but could be better!';
  } else if (
    !exercises.some((e) => e < 2) &&
    exercises.filter((e) => e > 0).length == exercises.length
  ) {
    rating = 3;
    desc = 'fantastic! keep up the good work!';
  }

  const result = {
    periodLength: exercises.length,
    trainingDays: exercises.filter((e) => e > 0).length,
    success: exercises.some((e) => e < 2) ? false : true,
    rating,
    ratingDescription: desc,
    target,
    average:
      exercises.reduce((sum, exercise) => sum + exercise, 0) / exercises.length,
  };

  return result;
};

try {
  const { target, exercises } = parseExerciseArguments(process.argv);
  console.log(calculateExercise(exercises, target));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}

//console.log(calculateExercise([3, 0, 2, 4.5, 0, 3, 1], 2));
