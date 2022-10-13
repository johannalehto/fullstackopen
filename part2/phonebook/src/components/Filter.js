    
const Filter = (props) => {
    return (
        <div>
            filter shown with <input onChange={props.handleFilter} value={props.newFilter} />
        </div>
    )
}   

export default Filter
