import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import axios from 'axios'

const App = () => {
	const [persons, setPersons] = useState([]) 
	const [newName, setNewName ] = useState('')
	const [newNumber,setNewNumber] = useState('')
	const [searchValue,setSearchValue] = useState('')

	useEffect (() => {
		axios.get("http://localhost:3001/persons")
		.then(response => {
			setPersons(response.data)
			console.log(response.data)
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
			window.alert(`${newName} is already in the phonebook `)
		}
		else {
			setPersons(persons.concat(newPerson))
			setNewName('')
			setNewNumber('')
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
		<Persons persons={persons} query={searchValue}/>
    </div>
  )
}

export default App