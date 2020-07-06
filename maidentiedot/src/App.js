import React, { useState, useEffect } from 'react'
import axios from 'axios'
let weatherSearch = false
let repeatStopper = true

const Renderoi = ( {length, countriesToShow, setNamesToShow, api_key}) =>{
  const [ weather, setWeather ] = useState([])
  console.log(length, 'pituus')
  const handleClick = (event) => {
    event.preventDefault();
    console.log('Click')
    console.log(event.target.value)
    setNamesToShow(event.target.value)
    console.log(countriesToShow)
  }
  

  if(length === 1 ){weatherSearch = true}

  useEffect(() => {

    if(weatherSearch === true && repeatStopper === true){
      console.log(weatherSearch, repeatStopper, 'repeat')
      console.log('Getting weather information')
      let capital = countriesToShow[0].capital
      console.log(capital, 'hei')
      axios
        .get('http://api.weatherstack.com/current', {
          params: {
            access_key: api_key,
            query: capital
          }
        })
        .then(response => {
          console.log('Weather done')
          setWeather(response.data.current)
          console.log(response.data.current, 'weather data')
          console.log(weather)
          weatherSearch = false
          repeatStopper = false
        })
      }
    })

  if(length === 1){
    console.log(countriesToShow)
    const maa = countriesToShow[0]
    console.log(maa)
    let capital = maa.capital
    console.log(capital)
    console.log(weather, 'sää')
    console.log(weather.temperature)
    return (
      <div>
      <h1>{maa.name}</h1>
      <p>capital {maa.capital}</p>
      <p>population {countriesToShow[0].population}</p>
      <h2>languages</h2>
      <ul>
        {maa.languages.map((country, i) =>  <li key={i}> {country.name} </li>)}
      </ul>
      <img src={countriesToShow[0].flag} alt="Flag" width="500" height="400"/>
      <h2>Weather in {maa.capital}</h2>
      <p><b>temperature</b> {weather.temperature}</p>
      <img src={weather.weather_icons} alt="Weather icon" width="100" height="100"/>
      <p><b>wind:</b> {weather.wind_speed} {weather.wind_dir}</p>
      </div>
    )
  }else if (length <= 10){
    return(
      <div>
        {countriesToShow.map((country, i) =>  <p key={i}> {country.name}  <button value={country.name} onClick={handleClick}> show</button> </p>)}
      </div>
    )
    } else {
    return <p>Too many matches, spesify another filter</p>
  }
}

function App() {
  const [ countries, setCountries] = useState([]) 
  const [ namesToShow, setNamesToShow] = useState('')
  
  const api_key = '4d7b00f53f2c6fbc8a87076b6538aa5f'

  const handleNameChange = (event) => {
    setNamesToShow(event.target.value)
    console.log(event.target.value)    
  }
  
  useEffect(() => {
    console.log('Getting country information')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('Countries done')
        setCountries(response.data)
        console.log(response.data)
      })
  }, [])

  
  
  const countriesToShow = countries.filter(name => name.name.toLowerCase().includes(namesToShow.toLowerCase()))
  let length = countriesToShow.length

  

  return (
    <div>
      <form>
        find countries: <input onChange={handleNameChange}/>
      </form>
        <div>
        <Renderoi length={length} countriesToShow={countriesToShow} setNamesToShow={setNamesToShow} api_key={api_key}/>
        </div>
    </div>    
  )
}

export default App;
