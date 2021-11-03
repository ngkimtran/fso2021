import React from 'react'

const Header = ({ course }) => {
    return (
      <>
        <h2>{course}</h2>
      </>
    )
}
  
const Content = ({ parts }) => {
    return (
      <>
        {parts.map(p =>(
            <Part key={p.id} part={p}/>
        ))}
      </>
    )
}
  
const Total = ({ parts }) => {
    return (
      <p><strong>
          Number of exercises {parts.reduce((acc, p) => acc + p.exercises, 0)}
      </strong></p>
    )
}
  
const Part = ({ part }) => {
    return (
      <p>
        {part.name} {part.exercises}
      </p>
  
    )
}

const Course = ({ course }) => {
    return (
        <div>
          <Header course={course.name} />
          <Content parts={course.parts} />
          <Total parts={course.parts} />
        </div>
      )
}

export default Course
