import React from 'react'
import Person from './Person'



const Persons = ({persons,query,deletePerson}) => {
    const filteredSearch = persons.filter(person => person.name.toLowerCase().includes(query.toLowerCase()))
    return <ul>{filteredSearch.map(person => <Person person={person} deletePerson={() => deletePerson(person.id)} key={person.name}/>)}</ul>
}

export default Persons