import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import personService from './services/persons-services'
import SuccessNotification from './components/SuccessNotification'

const App = () => {
	const [persons, setPersons] = useState([]) 
	const [newName, setNewName ] = useState('')
	const [newNumber,setNewNumber] = useState('')
    const [searchValue, setSearchValue] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)
    const [successMessage,setSuccessMessage] = useState(null)

	useEffect (() => {
		personService
		.getAll()
		.then(response => {
			setPersons(response)
		})
	},[])

	const handleNewName = (event) => {
		setNewName(event.target.value)
	  }
	  
	const handleNewNumber = (event) => {
		setNewNumber(event.target.value)
	}

	const handleSearchValue = (event) => {
		console.log(searchValue)
		setSearchValue(event.target.value)
	}

	const addNewPerson = (event) => {
		event.preventDefault()
		const newPerson = {
			name: newName,
			number: newNumber
		}
		if (persons.some(ele => ele.name === newName)) { //checks for duplicate name entry
			handleDuplicateEntry(newName)
		}
		else {
			personService
			.createPerson(newPerson)
			.then(response => {
                setSuccessMessage(`Successfully added ${newPerson.name} to the phonebook`)
                setTimeout(() => {
                    setSuccessMessage(null)
                },5000)
                setPersons(persons.concat(response))
                setNewName('')
                setNewNumber('')})
			}
		}	
	
	
	const handleDuplicateEntry = () => {
		if (window.confirm(`${newName} is already in the phonebook. Replace the old number with a new one?`)) {
			const person = persons.find(p => p.name === newName)
			const updatedPersonObject = {...person,number:newNumber}
            personService.updatePerson(person.id, updatedPersonObject)
                .then(response => {
                    setSuccessMessage(`Successfully updated phone number for ${person.name}`)
                    setTimeout(() => {
                        setSuccessMessage(null)
                    }, 5000)
                    setPersons(persons.map(p => p.name === newName ? updatedPersonObject : p))
                }
                )
		}
	}

    const handleDeletePerson = id => {
        if (window.confirm(`Delete ${persons.find(p => id === p.id).name} from the phonebook?`)) {
            const person = persons.find(p => p.name === newName)
			personService.deletePerson(id)
    			.then(response => {
                    setSuccessMessage(`Successfully deleted ${person.name}`)
                    setTimeout(() => {
                        setSuccessMessage(null)
                    }, 5000)
                    setPersons(persons.filter(p => p.id !== id))
    			}
    			)
		}

    }

	return (
        <div>
            <h2>Phonebook</h2>
            <SuccessNotification message={successMessage}/>
    		<Filter value={searchValue} onChange={handleSearchValue}/>
          	<form onSubmit={addNewPerson}>
            	<div>
    				name: <input value={newName} onChange={handleNewName}/>
    				<br/>
    				number: <input value={newNumber} onChange={handleNewNumber}/>
            	</div>
            	<div>
              		<button type="submit">add</button>
            	</div>
          	</form>
          	<h2>Numbers</h2>
            <Persons persons={persons} deletePerson={handleDeletePerson} query={searchValue}/>
     </div>
  )
}

export default App