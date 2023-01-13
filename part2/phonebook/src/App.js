import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons-service'
import './index.css'


const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [notificationContent, setNotificationContent] = useState(null)
  const [notificationType, setNotificationType] = useState('default')


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

  const clearInputs = () => {
    setNewName('')
    setNewNumber('')
  }

  const handleName = (event) => {
    setNewName(event.target.value)
  }

  const handleNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setNewFilter(event.target.value)
  }

  const handleAddContact = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }

    const personTemp = persons.find(p => p.name.toLowerCase() === newName.toLowerCase())
    const findPerson = persons.includes(personTemp)

    if (findPerson) {
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with this new one?`)) {
        updatePerson(personTemp, newPerson)
      }
    } else {
      createPerson(newPerson)
    }
  }

  const handleDelete = (event) => {
    const personId = Number(event.target.value)
    const person = persons.find(p => p.id === personId)

    if (window.confirm(`Delete ${person.name}?`)) {
      deletePerson(personId, person)
    }
  }

  const createPerson = (newPerson) => {
    personService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        clearInputs()
        setNotificationType('confirmation')
        setNotificationContent(`Added ${returnedPerson.name}`)
        setTimeout(() => {
          setNotificationContent(null)
        }, 3000)
      })
  }

  const updatePerson = (personTemp, newPerson) => {
    const updatedPerson = { ...personTemp, number: newPerson.number }
    personService
      .update(personTemp.id, updatedPerson)
      .then(returnedPerson => {
        setPersons(persons.map(p => p.name === newName ? returnedPerson : p))
        clearInputs()
        setNotificationType('confirmation')
        setNotificationContent(`Updated ${returnedPerson.name}`)
        setTimeout(() => {
          setNotificationContent(null)
        }, 3000)
      })
      .catch(error => {
        setNotificationType('error')
        setNotificationContent(
          `${personTemp.name} has already been removed from the server`
        )
        setTimeout(() => {
          setNotificationContent(null)
        }, 3000)
        clearInputs()
        setPersons(persons.filter(p => p.id !== personTemp.id))
      })
  }

  const deletePerson = (personId, person) => {
    personService
      .deletePerson(personId)
      .then(() => {
        setPersons(persons.filter(p => p.id !== personId))
      })
    setNotificationType('confirmation')
    setNotificationContent(`Removed ${person.name}`)
    setTimeout(() => {
      setNotificationContent(null)
    }, 3000)

  }


  return (
    <div>
      <h1>Phonebook</h1>
      <Notification content={notificationContent} type={notificationType} />
      <Filter handleFilter={handleFilter} newFilter={newFilter} />
      <h2>Add a new</h2>
      <PersonForm
        handleAddContact={handleAddContact}
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
