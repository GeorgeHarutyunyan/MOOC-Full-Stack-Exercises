import React from 'react'
import Country from './Country'

const Display = ({data,searchValue}) => {
    const filteredData = data.filter(country => country.name.toLowerCase().includes(searchValue.toLowerCase()))
    console.log(filteredData)

    if (filteredData.length > 10) {
        if (searchValue !== '') {
            return (
                <p>Too many matches, specify another filter</p>
            )
        }
        return (null)
    }
    
    else if (filteredData.length === 1) {
        return (
            <Country data={filteredData[0]} expanded={true}/>
        )
    }

    return (
        filteredData.map(country => <Country key={country.name} data={country} expanded={false}/>)
    )
}

export default Display