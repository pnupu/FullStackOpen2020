import React, { useState, useEffect } from 'react'
import Personform from './komponentit/Personform'
import Filter from './komponentit/Filter'
import Persons from './komponentit/Persons'
import axios from 'axios'





const App = () => {
  const [ persons, setPersons] = useState([]) 
  
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ showAll, setShowAll] = useState(true)
  const [ namesToShow, setNamesToShow] = useState('')
  useEffect(() => {
    console.log('effect')
    axios
    .get('http://localhost:3001/persons')
    .then(response => {
      console.log('promise fulfilled')
      setPersons(response.data)
    })
  }, [])
  console.log('render', persons.length, 'persons')

  const addname = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }
    const included = persons.map(name => name.name)
    if(included.includes(newName)){
      window.alert(`${newName} is already included`)
    } else {
      setPersons(persons.concat(nameObject))
    }
    
    
  
    setNewName('')
    setNewNumber('')
  }
  
  
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
  setNewNumber(event.target.value)
  }
  
  const handleshown = (event) => {
  setNamesToShow(event.target.value)
  if(!(event.target.value === '')){
    setShowAll(false)
  }
  
  }
  
  const numbersToShow = showAll ? persons : persons.filter(name => name.name.includes(namesToShow))

  return (
    <div>
      <h2>Phonebook</h2>
        <Filter namesToShow={namesToShow} handleshown={handleshown}/>
      <h2>add a new</h2>
      <Personform addname={addname} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
        <Persons numbersToShow={numbersToShow}/>
    </div>
  )

}

export default App