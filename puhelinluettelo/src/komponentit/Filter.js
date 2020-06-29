import React from 'react'



const Filter = ({ namesToShow, handleshown}) => {
    return (
        <div>
          filter shown with <input value={namesToShow} onChange={handleshown}/>
        </div>
    )

}

export default Filter