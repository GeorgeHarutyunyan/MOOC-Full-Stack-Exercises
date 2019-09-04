import React, { useState } from 'react'
import Person from './components/Person'

const App = () => {
	const [persons, setPersons] = useState([
    	{ name: 'Arto Hellas',id:0 }
  	]) 
	const [ newName, setNewName ] = useState('')

	const handleNewPerson = (event) => {
		setNewName(event.target.value)
  	}

	const addNewPerson = (event) => {
		event.preventDefault()
		const newPerson = {
			name: newName,
			id: persons.length+1 //minor addition added
		}
		setPersons(persons.concat(newPerson))
		setNewName('')
	}

	const rows = () => (
		persons.map(person => <Person person={person} key={person.id}/>)
	)

	return (
    <div>
    	<h2>Phonebook</h2>
      	<form onSubmit={addNewPerson}>
        	<div>
          	name: <input value={newName} onChange={handleNewPerson}/>
        	</div>
        	<div>
          		<button type="submit">add</button>
        	</div>
      	</form>
      	<h2>Numbers</h2>
		<ul>{rows()}</ul>
    </div>
  )
}

export default App