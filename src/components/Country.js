import React from 'react'

const Country = ({data,expanded}) => {

    if (expanded) {
        return (
            <div>
                <h1>{data.name}</h1>
                <div>
                    Capital: {data.capital}<br/>
                    Population: {data.population}
                    <h2>Languages</h2>
                    <ul>
                        {data.languages.map(language => <li key={language.name}>{language.name}</li>)}
                    </ul>
                </div>
                <img src={data.flag} alt={`Flag of ${data.name}`} width='150'  height='100'/>
            </div>
        )
    }

    return (
        <div>
            <div>
                <p>{data.name} <button>Show</button></p>
            </div>
        </div>
   )

}

export default Country