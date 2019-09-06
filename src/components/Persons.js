import React from 'react'
import Person from './Person'


const Persons = ({persons,query}) => {
    const filteredSearch = persons.filter(person => person.name.toLowerCase().includes(query.toLowerCase()))
    return <ul>{filteredSearch.map(person => <Person person={person} key={person.name}/>)}</ul>
}

export default Persons