import patients from '../../data/patients';
import { v1 as uuid } from 'uuid';
import { Patient, NewPatient, EntryWithoutId, Entry } from '../types';

const getPatients = (): Omit<Patient, 'ssn'>[] => {
  return patients.map(
    ({ id, name, occupation, gender, dateOfBirth, entries }) => ({
      id,
      name,
      occupation,
      gender,
      dateOfBirth,
      entries,
    })
  );
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...patient,
  };

  patients.push(newPatient);
  return newPatient;
};

const findById = (id: string): Patient | undefined => {
  const patient = patients.find((p) => p.id === id);
  return patient;
};

const getPatientEntries = (id: string): Entry[] | undefined => {
  return patients.find((p) => p.id === id)?.entries;
};

const addPatientWithEntries = (newEntry: EntryWithoutId, id: string): Entry => {
  const entryWithId: Entry = { id: uuid(), ...newEntry };
  patients.find((p) => p.id === id)?.entries.push(entryWithId);
  return entryWithId;
};

export default {
  getPatients,
  addPatient,
  findById,
  getPatientEntries,
  addPatientWithEntries,
};
