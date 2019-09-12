import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Display from './components/Display'

const App = () => {

	const [searchValue,setSearchValue] = useState('')
	const [countryData,setCountryData] = useState([])

	useEffect(() => {
		axios.get("https://restcountries.eu/rest/v2/all")
		.then(response => {setCountryData(response.data)})
	},[])


	const handleSearchValue = (event) => {
		console.log(event.target.value)
		setSearchValue(event.target.value)
	}

	return (
		<div>
			<Filter searchValue={searchValue} onChange={handleSearchValue}/>
			<Display data={countryData} searchValue={searchValue}/>
		</div>
	)
}

export default App