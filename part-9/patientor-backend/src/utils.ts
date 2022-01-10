/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  NewPatient,
  Gender,
  Diagnosis,
  HealthCheckRating,
  EntryWithoutId,
  NoIdBaseEntry,
} from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseString = (str: unknown, type: string): string => {
  if (!str || !isString(str)) {
    throw new Error(`Incorrect or missing string for ${type}`);
  }
  return str;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name: ' + name);
  }
  return name;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation: ' + occupation);
  }
  return occupation;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const parseSSN = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn: ' + ssn);
  }
  return ssn;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDOB = (dateOfBirth: unknown): string => {
  if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error('Incorrect or missing date of birth: ' + dateOfBirth);
  }
  return dateOfBirth;
};

const isDiagnosisCodes = (
  diagnosisCodes: Array<unknown>
): diagnosisCodes is Array<Diagnosis['code']> => {
  return diagnosisCodes.every((code: unknown) => isString(code));
};

const parseDiagnosisCodes = (
  diagnosisCodes: Array<unknown>
): Array<Diagnosis['code']> => {
  if (!diagnosisCodes || !isDiagnosisCodes(diagnosisCodes))
    throw new Error('Incorrect or missing diagnosis codes: ' + diagnosisCodes);
  return diagnosisCodes;
};

const isHealthCheckRating = (
  healthRate: any
): healthRate is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(healthRate);
};

const parseHealthCheckRating = (healthRate: unknown): HealthCheckRating => {
  if (healthRate === 0 || isHealthCheckRating(healthRate)) {
    return healthRate;
  } else if (!healthRate || !isHealthCheckRating(healthRate)) {
    throw new Error('Incorrect or missing health check:' + healthRate);
  }
  return healthRate;
};

type Fields = {
  name: unknown;
  occupation: unknown;
  gender: unknown;
  ssn: unknown;
  dateOfBirth: unknown;
  entries: unknown;
};

const toNewPatient = ({
  name,
  occupation,
  gender,
  ssn,
  dateOfBirth,
}: Fields): NewPatient => {
  const newPatient: NewPatient = {
    name: parseName(name),
    occupation: parseOccupation(occupation),
    gender: parseGender(gender),
    ssn: parseSSN(ssn),
    dateOfBirth: parseDOB(dateOfBirth),
    entries: [],
  };

  return newPatient;
};

const toNewPatientWithEntry = (obj: any): EntryWithoutId => {
  const newBaseEntry: NoIdBaseEntry = {
    description: parseString(obj.description, 'description'),
    date: parseDOB(obj.date),
    specialist: parseString(obj.specialist, 'specialist'),
  };

  if (obj.diagnosisCodes)
    newBaseEntry.diagnosisCodes = parseDiagnosisCodes(obj.diagnosisCodes);
  if (!obj.type || !isString(obj.type)) {
    throw new Error('Incorrect or missing type value:' + obj.type);
  }

  switch (obj.type) {
    case 'HealthCheck':
      return {
        ...newBaseEntry,
        type: 'HealthCheck',
        healthCheckRating: parseHealthCheckRating(obj.healthCheckRating),
      };
    case 'Hospital':
      return {
        ...newBaseEntry,
        type: 'Hospital',
        discharge: {
          date: parseDOB(obj.discharge.date),
          criteria: parseString(obj.discharge.criteria, 'discharge criteria'),
        },
      };
    case 'OccupationalHealthcare':
      const entry: EntryWithoutId = {
        ...newBaseEntry,
        type: 'OccupationalHealthcare',
        employerName: parseString(obj.employerName, 'employer name'),
      };
      if (obj.sickLeave) {
        if (obj.sickLeave.startDate && obj.sickLeave.endDate) {
          const sickLeave = {
            startDate: parseDOB(obj.sickLeave.startDate),
            endDate: parseDOB(obj.sickLeave.startDate),
          };
          entry.sickLeave = sickLeave;
        } else throw new Error('One of the date is missing');
      }
      return entry;
    default:
      throw new Error('No matching type found for ' + obj.type);
  }
};

export { toNewPatient, toNewPatientWithEntry };
