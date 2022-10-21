import { useState, useEffect } from 'react'
import axios from 'axios'


const Button = ({handleClick, country}) => {

  return <button onClick={handleClick} value={country.name.common}>show</button>
}

const CountryResults = ({filter, filtered, handleClick}) => {

  if (filter === "") {
    return <p></p>
  } else if (filtered.length > 10) {
    return(<p>Too many matches, specify another filter</p>)
  } else if (filtered.length > 1){
    return (
      <><ul>{filtered.map(c => 
        <li key={c.name.common}> {c.name.common} <Button handleClick={handleClick} country={c}/> </li>)}
        </ul> 
      </>
    )
  } else if (filtered.length === 1)  {
    return (
    <CountryInfo country={filtered[0]} />)
  }
}
    
const CountryInfo = ({ country }) => {

  const [weather, setWeather] = useState()

  useEffect(() => {
    const api_key = process.env.REACT_APP_API_KEY
    const lat_lng = country.latlng
    const weather_url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat_lng[0]}&lon=${lat_lng[1]}&appid=${api_key}`
      axios
        .get(weather_url)
        .then(response => {
          setWeather(response.data)
        })
    }, [country.latlng])

  if (!weather) { 
    return null 
  }

  return (
    <>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <h4>languages: </h4>
      <ul>
        {Object.values(country.languages).map(item => <li key={item}> {item}</li>)}
      </ul>
      <img alt="flag" width="180vw" src={country.flags.png}></img>
      <CountryWeather country={country} weather={weather} />
    </>
  )
}

const CountryWeather = ({country, weather}) => {
  return (
    <>
      <h2>Weather in {country.capital}</h2>
      <p>temperature {(weather.main.temp - 273.15).toFixed(1)} Celcius</p>
      <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather icon"></img>
      <p>wind {weather.wind.speed} m/s</p>
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

  const handleClick = (event) => {
    const country = event.target.value
    setNewFilter(country)
  }

  const filtered = countries.filter(country => country.name.common.toLowerCase().includes(newFilter.toLowerCase()))
 
  return (
    <>
      find countries <input onChange={handleChange} value={newFilter}/>
      <CountryResults filter={newFilter} filtered={filtered} handleClick={handleClick}/>
    </>
  )
}


export default App
