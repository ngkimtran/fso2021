interface bmiValues {
  height: number;
  weight: number;
}

const parseBmiArguments = (args: Array<string>): bmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

export const calculateBmi = (height: number, weight: number): string => {
  const h = height / 100;
  const result = weight / (h * h);

  if (result < 18.5) return 'Abnormal (underweight)';
  else if (result >= 18.5 && result <= 24.9) return 'Normal (healthy weight)';
  else if (result >= 25 && result <= 29.9) return 'Abnormal (overweight)';
  else if (result >= 30) return 'Obesity';
  else return 'malformatted parameters';
};

try {
  const { height, weight } = parseBmiArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}

//console.log(calculateBmi(180, 74))
