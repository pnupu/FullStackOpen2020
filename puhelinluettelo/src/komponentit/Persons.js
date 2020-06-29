import React from 'react'



const Persons = ({ numbersToShow}) => {
    return(
        <div>
            {numbersToShow.map((person, i) =>
            <p key={i}> {person.name} {person.number}</p>
          )}
        </div>
    )

}

export default Persons