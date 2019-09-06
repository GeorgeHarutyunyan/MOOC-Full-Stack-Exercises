import React from 'react'

const Person = ({ person }) => {
  console.log("hi")
    return (
      <li>{person.name} {person.number}</li>
    )
  }
  
export default Person