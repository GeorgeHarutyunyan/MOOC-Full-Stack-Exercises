import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Display = ({good,neutral,bad}) => (
    <div>
        <p>good: {good}</p>
        <p>neutral: {neutral}</p>
        <p>bad: {bad}</p>
        <p>all: {good+neutral+bad}</p>
        <p>average: {(good-bad)/(good+bad+neutral)}</p>
        <p>positive: {(good/(neutral+bad+good))*100}%</p>
    </div>
)

const Button = ({onClick,text}) => (
    <button onClick={onClick}>{text}</button>
)

const App = props => {
  const [good,setGood] = useState(0)
  const [neutral,setNeutral] = useState(0)
  const [bad,setBad] = useState(0)

  return (
      <div>
        <h2>give feedback</h2>
        <Button onClick={() => setGood(good+1)} text='good'/>
        <Button onClick={() => setNeutral(neutral+1)} text='neutral'/>
        <Button onClick={() => setBad(bad+1)} text='bad'/>
        <h2>statistics</h2>
        <Display good={good} neutral={neutral} bad={bad}/>
      </div>
  )
}

ReactDOM.render(<App/>,document.getElementById('root'))