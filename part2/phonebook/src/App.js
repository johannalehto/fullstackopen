import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

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

    const findPerson = persons.includes(persons.find((person) => person.name.toLowerCase() === newName.toLowerCase()))
  
    findPerson 
    ? alert(`${newName} is already added to the phonebook`)
    : setPersons(persons.concat(newPerson)) 
   
    setNewName('')
  }

  const viewPersons = (newFilter === "")
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase(), 0))

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter handleFilter={handleFilter} newFilter={newFilter}/>
      <h2>Add a new</h2>
      <PersonForm 
        addName={addName} 
        handleName={handleName} 
        newName={newName} 
        handleNumber={handleNumber} 
        newNumber={newNumber}/>
      <h2>Numbers</h2>
      <Persons viewPersons={viewPersons} />
    </div>
  )
}

export default App
