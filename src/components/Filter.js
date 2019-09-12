import React from 'react'

const Filter = ({searchValue,onChange}) => {
    return (
        <div>Find countries: <input value={searchValue} onChange={onChange}></input></div>
    )
}

export default Filter