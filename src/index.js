import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <h1>{props.courseName}</h1>
  )
}

const Part = (props) => {
  return (
    <p>{props.part} {props.exercise}</p>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part part={props.part[0].name} exercise={props.part[0].exercise}/>
      <Part part={props.part[1].name} exercise={props.part[1].exercise}/>
      <Part part={props.part[2].name} exercise={props.part[2].exercise}/>
    </div>
  )
}


const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercise: 10
    },
    {
      name: 'Using props to pass data',
      exercise: 7
    },
    {
      name: 'State of a component',
      exercise: 14
    }
  ]

  return (
    <div>
      <Header courseName={course}/>
      <Content part={parts}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))