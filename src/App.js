import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import personService from './services/persons-services'
import SuccessNotification from './components/SuccessNotification'
import ErrorNotification from './components/ErrorNotification'

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
            console.log('Persons in front: ',response)
            })
            .catch(error => {
                console.log('Error getting persons',error)
            })
	},[])

    const resetNotification = () => {
        setTimeout(() => {
            setSuccessMessage(null)
            setErrorMessage(null)
        }, 5000)
    }

	const handleNewName = (event) => {
		setNewName(event.target.value)
	  }
	  
	const handleNewNumber = (event) => {
		setNewNumber(event.target.value)
	}

	const handleSearchValue = (event) => {
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
                setSuccessMessage(`Successfully added ${newPerson.name} to the phonebook!`)
                resetNotification()
                setPersons(persons.concat(newPerson))
                setNewName('')
                setNewNumber('')
                })
            .catch(error => {
                setErrorMessage(`Failed to add ${newPerson.name} to the phonebook!`)
                resetNotification()
                setPersons(persons.filter(p => p.name !== newPerson.name))
                setNewName('')
                setNewNumber('')
                })
			}
		}	
	
	
	const handleDuplicateEntry = () => {
		if (window.confirm(`${newName} is already in the phonebook. Replace the old number with a new one?`)) {
			const person = persons.find(p => p.name === newName)
			const updatedPersonObject = {...person,number:newNumber}
            personService.updatePerson(person.id, updatedPersonObject)
                .then(response => {
                    setSuccessMessage(`Successfully updated phone number for ${person.name}!`)
                    resetNotification()
                    setPersons(persons.map(p => p.name === newName ? updatedPersonObject : p))
                    setNewName('')
                    setNewNumber('')
                })
                .catch(error => {
                    setErrorMessage(`Failed to update phone number for ${person.name}!`)
                    resetNotification()
                    setPersons(persons.filter(p => p.id !== person.id))
                    setNewName('')
                    setNewNumber('')
                })
		}
	}

    const handleDeletePerson = id => {
        if (window.confirm(`Delete ${persons.find(p => id === p.id).name} from the phonebook?`)) {
            const person = persons.find(p => p.id === id)
			personService.deletePerson(id)
    			.then(response => {
                    setSuccessMessage(`Successfully deleted ${person.name}`)
                    resetNotification()
                    setPersons(persons.filter(p => p.id !== id))
                })
                .catch(error => {
                    setErrorMessage(`${person.name} is already deleted from the phonebook!`)
                    resetNotification()
                    setPersons(persons.filter(p => p.id !== id)) //unnecessary? 
                })
		}

    }

	return (
        <div>
            <h2>Phonebook</h2>
            <SuccessNotification message={successMessage} />
            <ErrorNotification message={errorMessage}/>
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