import React, { useState } from 'react'
import Person from './components/Person'
import Persons from './components/Persons'
import Filter from './components/Filter'

const App = () => {
	const [persons, setPersons] = useState([
		{ name: 'Arto Hellas', number: '040-123456' },
		{ name: 'Ada Lovelace', number: '39-44-5323523' },
		{ name: 'Dan Abramov', number: '12-43-234345' },
		{ name: 'Mary Poppendieck', number: '39-23-6423122' }
	  ]) 
	const [newName, setNewName ] = useState('')
	const [newNumber,setNewNumber] = useState('')
	const [searchValue,setSearchValue] = useState('')

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