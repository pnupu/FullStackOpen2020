import React from 'react'



const Personfrom = ({ addname, newName, newNumber, handleNameChange, handleNumberChange}) => {
    return (
      <div>
        <form onSubmit={addname}>
          <div>
            name: <input value={newName} onChange={handleNameChange}/>
          </div>
          <div>
            number: <input value={newNumber} onChange={handleNumberChange}/>
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
      </div>
  
    )
  }

export default Personfrom