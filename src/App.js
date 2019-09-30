import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import personService from './services/persons-services'
import personsServices from './services/persons-services'

const App = () => {
	const [persons, setPersons] = useState([]) 
	const [newName, setNewName ] = useState('')
	const [newNumber,setNewNumber] = useState('')
	const [searchValue,setSearchValue] = useState('')

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
				setPersons(persons.concat(response))
				setNewName('')
				setNewNumber('')
			})
		}	
	}
	
	const handleDuplicateEntry = () => {
		if (window.confirm(`${newName} is already in the phonebook. Replace the old number with a new one?`)) {
			const person = persons.find(p => p.name === newName)
			const updatedPersonObject = {...person,number:newNumber}
			personsServices.updatePerson(person.id,updatedPersonObject)
			setPersons(persons.map(p => p.name === newName ? updatedPersonObject: p))
		}
	}

    const handleDeletePerson = id => {
		if (window.confirm(`Delete ${persons.find(p => id === p.id).name} from the phonebook?`)){
			const request = personService.deletePerson(id)
			return request.then(response => {
				setPersons(persons.filter(p => p.id !== id))
			}
			)
		}

    }

	return (
    <div>
    	<h2>Phonebook</h2>
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