import React,{useState,useEffect} from 'react';
import Header from "./Components/Header"
import InfoBox from "./Components/InfoBox"
import Map from "./Components/Map"
import Table from "./Components/Table"
import {sortData} from "./Components/utils"
import './App.css';
import { Card , CardContent } from '@material-ui/core';

function App() {

  const [countries,setCountries] = useState([])
  const [country,setCountry] = useState("worldwide");
  const [countryInfo,setCountryInfo] = useState({})
  const [tableData,setTableData] = useState([])

  useEffect(()=>{
    fetch("https://disease.sh/v3/covid-19/all")
    .then((response)=>response.json())
    .then((data)=>{
    setCountryInfo(data)
    })
  },[])

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
              const sortedData = sortData(data)
              setTableData(sortedData)
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
        {/* {console.log(countryInfo)} */}
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
          <Table countries={tableData}/>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
