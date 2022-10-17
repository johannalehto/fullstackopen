import { useState, useEffect } from 'react'
import axios from 'axios'


const CountryResults = (props) => {

  if (props.filter === "") {
    return <p></p>
  } else if (props.filtered.length > 10) {
    return(<p>Too many matches, specify another filter</p>)
  } else if (props.filtered.length > 1){
    return (
      <><ul>{props.filtered.map(c => 
        <li key={c.name.common}> {c.name.common}  </li>)}
        </ul> 
      </>
    )
  } else if (props.filtered.length === 1) {
    return (
    <CountryInfo 
              name={props.filtered[0].name.common} 
              capital={props.filtered[0].capital} 
              area={props.filtered[0].area} 
              languages={props.filtered[0].languages} 
              flag={props.filtered[0].flags.png}
    />)
  }
}
    
const CountryInfo = (props) => {
  return (
    <>
      <h1>{props.name}</h1>
      <p>capital {props.capital}</p>
      <p>area {props.area}</p>
      <h4>languages: </h4>
      <ul>
        {Object.values(props.languages).map(item => <li key={item}> {item}</li>)}
      </ul>
      <img alt="flag" src={props.flag}></img>
    </>
  )
}


const App = () => {

  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState("")


  useEffect( () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleChange = (event) => {
    const newInput = event.target.value
    setNewFilter(newInput)
  }

  const filtered = countries.filter(country => country.name.common.toLowerCase().includes(newFilter.toLowerCase()))
 
  return (
    <>
      find countries <input onChange={handleChange} value={newFilter}/>
      <CountryResults filter={newFilter} filtered={filtered}/>
    </>
  )
}

export default App
