import React from 'react'



const Persons = ({ numbersToShow, handleDelete}) => {
    return(
        <div>
            {numbersToShow.map((person, i) =>
                <Person key={i} name={person.name} number={person.number} handleDelete={() => handleDelete(person.id, person.name)}/>)}
        </div>
    )
}

const Person = (props) =>{
    return(
        <div>
            {props.name} {props.number} 
            <button onClick={props.handleDelete}>delete</button>
        </div>
    )
}

export default Persons