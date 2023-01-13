const Persons = ({ displayPersons, handleDelete }) => {

    return (
        <ul>
            {displayPersons.map(p => <li key={p.name}>{p.name} {p.number} <button onClick={handleDelete} value={p.id}>delete</button></li>)}
        </ul>
    )
}

export default Persons