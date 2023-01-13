import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons-service'
import './index.css'

const Notification = ({ content }) => {
  if (content === null) {
    return null
  }

  return (
    <div className="notification">
      {content}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [notificationContent, setNotificationContent] = useState(null)


  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const displayPersons =
    newFilter === ""
      ? persons
      : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase(), 0))

  const handleName = (event) => {
    setNewName(event.target.value)
  }

  const handleNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setNewFilter(event.target.value)
  }


  const addName = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }

    const personTemp = persons.find(p => p.name.toLowerCase() === newName.toLowerCase())
    const findPerson = persons.includes(personTemp)

    if (findPerson) {
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with this new one?`)) {

        const updatedPerson = { ...personTemp, number: newPerson.number }
        personService
          .update(personTemp.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.name === newName ? returnedPerson : p))
            setNewName('')
            setNewNumber('')
            setNotificationContent(`Updated ${returnedPerson.name}`)
            setTimeout(() => {
              setNotificationContent(null);
            }, 3000);
          })
      }
    } else {
      personService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setNotificationContent(`Added ${returnedPerson.name}`)
          setTimeout(() => {
            setNotificationContent(null);
          }, 3000);

        })
    }
  }

  const handleDelete = (event) => {
    const personId = Number(event.target.value)
    const person = persons.find(p => p.id === personId)

    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .deletePerson(personId)
        .then(() => {
          setPersons(persons.filter(p => p.id !== personId))
        })
        setNotificationContent(`Removed ${person.name}`)
        setTimeout(() => {
          setNotificationContent(null);
        }, 3000);
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification content={notificationContent} />
      <Filter handleFilter={handleFilter} newFilter={newFilter} />
      <h2>Add a new</h2>
      <PersonForm
        addName={addName}
        handleName={handleName}
        newName={newName}
        handleNumber={handleNumber}
        newNumber={newNumber} />
      <h2>Numbers</h2>
      <Persons
        displayPersons={displayPersons}
        handleDelete={handleDelete} />
    </div>
  )

}

export default App
