import React, { useState } from 'react';
import Select from 'react-select';

import { useMutation } from '@apollo/client';
import { EDIT_BIRTHYEAR } from '../queries/libraryQueries';

const EditBirthYear = ({ authors }) => {
  const [name, setName] = useState('');
  const [born, setBorn] = useState('');

  const [changeBirthYear] = useMutation(EDIT_BIRTHYEAR);

  const options = authors.map((a) => ({ value: a.name, label: a.name }));

  const submit = async (event) => {
    event.preventDefault();

    changeBirthYear({
      variables: { name: name.value, setBornTo: Number(born) },
    });

    setBorn('');
  };

  return (
    <div>
      <h2>Set birthyear</h2>

      <form onSubmit={submit}>
        <div>
          name{' '}
          <Select defaultValue={name} onChange={setName} options={options} />
        </div>
        <div>
          born{' '}
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  );
};

export default EditBirthYear;
