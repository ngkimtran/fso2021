import React, { useState, useEffect } from 'react'

import personService from './services/persons'
import PersonForm from './PersonForm'
import Persons from './Persons'
import Filter from './Filter'
import Notification from './Notification'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchParam, setSearchParam ] = useState('')
  const [ message, setMessage ] = useState(null)
  const [ errorMessage, setErrorMessage ] = useState(null)

  const personsFilter = persons.filter(p => p.name.toLowerCase().includes(searchParam.toLowerCase()))

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }
  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }
  
  const handleSearch = (e) => {
    setSearchParam(e.target.value)   
  }

  const handleAdd = (e) => { 
    e.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
    }
    persons.some(p => p.name.toLowerCase() === newName.trim().toLowerCase())
      ? handleUpdate(newName)
      : personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setMessage(`Added ${newName}`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        .catch(error => {
          console.log(error)
          setErrorMessage(error.response.data.error)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    setNewName('')
    setNewNumber('')
  }
  
  const handleUpdate = (name) => {
    if(window.confirm(`${name} is already added to phonebook, replace old number with a new one?`)){
        const person = persons.find(p => p.name.toLowerCase() === name.trim().toLowerCase())
        const changedPerson = {...person, number: newNumber}

        personService
          .update(person.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
            setMessage(`Updated ${person.name} phone number to ${newNumber}`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
          .catch(error => {
            console.log(error)
            setErrorMessage(error.response.data.error)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
    }
  }

  const handleDelete = (id) => {
    personService
      .remove(id)
      .then(setPersons(persons.filter(p => p.id !== id)))
      .catch(error => {
        console.error(error)
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} messageClass='notification' />
      <Notification message={errorMessage} messageClass='error' />
      <Filter 
        searchParam={searchParam}
        handleSearch={handleSearch}
      />
      <h3>Add a new</h3>
      <PersonForm 
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        handleAdd={handleAdd}
      />
      <h3>Numbers</h3>
      <Persons persons={searchParam.length>0 ? personsFilter : persons} handleDelete={handleDelete} />
    </div>
  )
}

export default App