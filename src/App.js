import React,{useState,useEffect} from 'react';
import Header from "./Components/Header"
import InfoBox from "./Components/InfoBox"
import Map from "./Components/Map"
import './App.css';
import { Card , CardContent } from '@material-ui/core';

function App() {

  const [countries,setCountries] = useState([])
  const [country,setCountry] = useState("worldwide");
  const [countryInfo,setCountryInfo] = useState({})

  useEffect(()=>{
    fetch("https://disease.sh/v3/covid-19/all")
    .then((response)=>response.json())
    .then((data)=>{
    setCountryInfo(data)
    })
  })

  useEffect(() => {
      //async data
      const getCountriesData = async() =>{
          await fetch("https://disease.sh/v3/covid-19/countries")
          .then((response)=>response.json())
          .then((data)=>{
              const countries = data.map((country)=>({
                  name : country.country,
                  value : country.countryInfo.iso2,
                  }))
              setCountries(countries)
          })
      }
      getCountriesData()
  }, [])

  const ChangeCountry = async(e)=>{
      const countrycode = e.target.value
      const url =
          countrycode === "worldwide"
          ? "https://disease.sh/v3/covid-19/all"
          :  `https://disease.sh/v3/covid-19/countries/${countrycode}`;

          await fetch(url)
          .then((response)=>response.json())
          .then((data)=>{
              setCountry(countrycode)
              setCountryInfo(data);
          })
  }


  return (
    <div className="App">
      <div className="app_left">
        <Header onChange={ChangeCountry} country={country} countries={countries}/>
        <div className="app_stats">

          <InfoBox title="Coronavirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases}/>
          <InfoBox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered}/>
          <InfoBox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths}/>
        </div>
        <div className='app_map'>
          <Map/>
        </div>
      </div>
      <Card className="app_right">
        <CardContent>
          <h2>First</h2>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
