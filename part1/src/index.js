import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Statistic = ({text,value}) => {

    return (
        <tr>
            <td>{text} {value}</td>
        </tr>
    )
}

const Button = ({onClick,text}) => (
    <button onClick={onClick}>{text}</button>
)

const App = props => {
  const [good,setGood] = useState(0)
  const [neutral,setNeutral] = useState(0)
  const [bad,setBad] = useState(0)

  if (good+bad+neutral === 0){
      return (
          <div>
            <h2>give feedback</h2>
            <Button onClick={() => setGood(good+1)} text='good'/>
            <Button onClick={() => setNeutral(neutral+1)} text='neutral'/>
            <Button onClick={() => setBad(bad+1)} text='bad'/>
            <h2>statistics</h2>
            <p>No feedback given</p>
          </div>

      )
  }
  return (
      <div>
        <h2>give feedback</h2>
        <Button onClick={() => setGood(good+1)} text='good'/>
        <Button onClick={() => setNeutral(neutral+1)} text='neutral'/>
        <Button onClick={() => setBad(bad+1)} text='bad'/>
        <h2>statistics</h2>
          <table>
              <tbody>
                <Statistic text={'good:'} value={good}/>
                <Statistic text={'neutral:'} value={neutral}/>
                <Statistic text={'bad:'} value={bad}/>
                <Statistic text={'all:'} value={good+bad+neutral}/>
                <Statistic text={'average:'} value={(good-bad)/(good+bad+neutral)}/>
                <Statistic text={'positive:'} value={(good / (neutral + bad + good)) * 100 + '%'} />
            </tbody>
        </table>
      </div>
  )
}

ReactDOM.render(<App/>,document.getElementById('root'))