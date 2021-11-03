import React from 'react'

const Persons = ({ persons, handleDelete }) => {
    const handleClick =(id, name) => {
        if (window.confirm(`Delete ${name}?`)) 
            handleDelete(id)
    }

    return (
        <table><tbody>
            {persons.map(p => (
                <tr key={p.id}>
                    <td>{p.name}</td>
                    <td>{p.number}</td>
                    <td>
                        <button onClick={() => {handleClick(p.id, p.name)}}>
                            delete
                        </button>
                    </td>
                </tr>
            ))}
        </tbody></table>
    )
}

export default Persons
