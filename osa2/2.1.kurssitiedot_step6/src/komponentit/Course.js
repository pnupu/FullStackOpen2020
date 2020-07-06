import React from 'react'

const Header = (props) => {
    return (
        <div>
            <h2>{props.course}</h2>
        </div>
    )
}
const Content = (props) => {
    return (
         <div>
            {props.course.map((course) => 
            <Part key={course.id} part={course.name} exercises={course.exercises} />)}
         </div>
    )
}

const Part = (props) => {
    return (
        <div>
            {props.part} {props.excersices} 
        </div>
    )
}

const Total = (props) => {
    const sum = props.course.reduce((sum, exercises) => {
        return sum + exercises.exercises
    },0)
    return(
        <b>total of {sum} exercises</b>
    )
}
const Course = ({ course }) => {
    return (
        <div>
            <Header course={course.name} />
            <Content course={course.parts} />
            <Total course={course.parts} />
      </div>
    )
  }


  
export default Course
