import React from 'react'


const Header = ({ name }) => (
    <h2>{name}</h2>
)

const Content = ({ course }) => {
    const rows = () => course.parts.map(part =>
        <Part
            part={part}
            key={part.id}
        />)

    return (
        <ul>
            {rows()}
        </ul>
    )
}

const Part = ({ part }) => {

    return (
        <li>
            <p>{part.name} {part.exercises}</p>
        </li>
    )
}

const Course = ({ course }) => (
    <div>
        <Header name={course.name} />
        <Content course={course} />
    </div>
)

export default Course