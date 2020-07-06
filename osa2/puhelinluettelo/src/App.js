import React, { useState, useEffect } from 'react'
import Personform from './komponentit/Personform'
import Filter from './komponentit/Filter'
import Persons from './komponentit/Persons'
import contactServise from './services/contacts'
import './index.css'
import Notification from './komponentit/Notification'




const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ showAll, setShowAll] = useState(true)
  const [ namesToShow, setNamesToShow] = useState('')
  const [ message, setMessage ] = useState(null)
  const [ className, setClassName ] = useState("success")

  useEffect(() => {
    console.log('effect')
    contactServise
      .getAll()
      .then(initialcontacts => {
        console.log('promise fulfilled')
        setPersons(initialcontacts)
    })
  }, [])

  const addname = (event) => {
    event.preventDefault()
    let add = true
    let personid = 0
    
    persons.forEach((person) => {
      if(person.name === newName){
        add = false
        personid = person.id
      }
    })

    const nameObject = {
      name: newName,
      number: newNumber
    }
    
    if(!(add)){
      let result = window.confirm(`${newName} is already included would you like to replace the number`)
      if(result){
        contactServise
        .update(personid, nameObject)
        .then(setPersons(persons.map(person => person.id !== personid ? person : nameObject )))
        .catch(error => {
          setClassName("error")
          setMessage(
            `${newName} is deleted from the server`
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
          setPersons(persons.filter(person => person.id !== personid))
        })
      }
    } else {
      
      contactServise
      .create(nameObject)
      .then(returnedContact => {
        console.log(returnedContact)
        setPersons(persons.concat(returnedContact))
      })
      
      setClassName("success")
      setMessage(`Added ${newName}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
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
  const handleDelete = (id, name) =>{
    let result = window.confirm(`Do you really want to delete ${name} ?`);
    
    if(result){
      contactServise
        .remove(id)
        .then(
          setPersons(persons.filter(names => names.id !== id)),
          setClassName("success"),
          setMessage(`Deleted ${name}`),
          setTimeout(() => {
            setMessage(null)
          }, 5000)
          )
        .catch(error => {
          setClassName("error")
          setMessage(
            `${name} is already deleted from the server`
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
          setPersons(persons.filter(names => names.id !== id))
        })
      
    }
  }
  const numbersToShow = showAll ? persons : persons.filter(name => name.name.includes(namesToShow))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} className={className}/>
        <Filter namesToShow={namesToShow} handleshown={handleshown}/>
      <h2>add a new</h2>
      <Personform addname={addname} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
        <Persons numbersToShow={numbersToShow} handleDelete={handleDelete}/>
    </div>
  )

}

export default App