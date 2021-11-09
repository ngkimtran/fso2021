import React from 'react'

const PersonForm = ({newName, newNumber, handleNameChange, handleNumberChange, handleAdd}) => {
    

    return (
        <form onSubmit={handleAdd} >
            <table style={{textAlign:'left'}}>
                <tbody>
                <tr>
                    <th>name:</th>
                    <td>
                        <input 
                            type='text' 
                            onChange={handleNameChange} 
                            value={newName} 
                        />
                    </td>
                </tr>
                <tr>
                    <th>number:</th>
                    <td>
                        <input 
                            type='tel' 
                            onChange={handleNumberChange} 
                            value={newNumber} 
                        />
                    </td>
                </tr>
                <tr>
                    <td>
                        <button type="submit">add</button>
                    </td>
                </tr>
                </tbody>
             </table>
        </form>  
        
    )
}

export default PersonForm
