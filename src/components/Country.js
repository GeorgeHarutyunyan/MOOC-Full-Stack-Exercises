import React, {useState} from 'react'

const Country = ({data,singleEntryCheck}) => {

    const [expandedView,setExpandedView] = useState(singleEntryCheck)
    console.log(singleEntryCheck)

    const handleShowChange = () => {
        setExpandedView(!expandedView)
    }

    if (expandedView) {
        if (singleEntryCheck) {
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
        else {
            return (
                <div>
                    <p>{data.name} <button onClick={handleShowChange}>Show</button></p>
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
    }

    return (
        <div>
            <div>
                <p>{data.name} <button onClick={handleShowChange}>Show</button></p>
            </div>
        </div>
   )

}

export default Country