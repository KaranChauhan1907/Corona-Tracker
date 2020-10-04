import React,{useState,useEffect} from 'react';
import Header from "./Components/Header"
import InfoBox from "./Components/InfoBox"
import Map from "./Components/Map"
import Table from "./Components/Table"
import {sortData,prettyPrint} from "./Components/utils"
import LineGraph from "./Components/LineGraph"
import './App.css';
import { Card , CardContent } from '@material-ui/core';
import "leaflet/dist/leaflet.css"

function App() {

  const [countries,setCountries] = useState([])
  const [country,setCountry] = useState("worldwide");
  const [countryInfo,setCountryInfo] = useState({})
  const [tableData,setTableData] = useState([])
  const [casesType,setCasesType] = useState("cases")
  const [mapCenter,setMapCenter] = useState({
    lat:34.80746,
    lng:-40.4796
  })
  const [mapZoom,setMapZoom] = useState(3)
  const [mapCountries,setMapCountries] = useState([])
  const [onecountryInfo,setOnecountryInfo] = useState(null)

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
                  flag : country.countryInfo.flag
                  }))
              let sortedData = sortData(data)
              setTableData(sortedData)
              setCountries(countries)
              setMapCountries(data)
          })
      }
      getCountriesData()
  }, [])

  const ChangeCountry = async(e,value)=>{
      const countrycode = value
      
      const url =
          countrycode === "worldwide"
          ? "https://disease.sh/v3/covid-19/all"
          :  `https://disease.sh/v3/covid-19/countries/${countrycode}`;

          await fetch(url)
          .then((response)=>response.json())
          .then((data)=>{

              setCountry(countrycode)
              setCountryInfo(data);
              setMapZoom(5)
              setMapCenter([data.countryInfo.lat,data.countryInfo.long])
          }
         )
         let pop = document.getElementById("popup")
         console.log(pop);
  }
  
  

  return (
    <div className="App">
      <div className="app_left">
        <Header onChange={ChangeCountry}  countries={countries}/>
        {/* {console.log(countryInfo)} */}
        <div className="app_stats">

          <InfoBox isRed active={casesType==="cases"} onClick={e=>setCasesType("cases")} title="Coronavirus Cases" cases={prettyPrint(countryInfo.todayCases)} total={prettyPrint(countryInfo.cases)}/>
          <InfoBox active={casesType==="recovered"}  onClick={e=>setCasesType("recovered")} title="Recovered" cases={prettyPrint(countryInfo.todayRecovered)} total={prettyPrint(countryInfo.recovered)}/>
          <InfoBox isRed active={casesType==="deaths"}  onClick={e=>setCasesType("deaths")} title="Deaths" cases={prettyPrint(countryInfo.todayDeaths)} total={prettyPrint(countryInfo.deaths)}/>
        </div>
        <div className='app_map'>
          <Map
          countries={mapCountries}
          countryInfo={countryInfo}
          casesType={casesType}
          center={mapCenter}
          zoom={mapZoom}
          />
        </div>
      </div>
      <Card className="app_right">
        <CardContent>
          <div className="app_table">
          <h3>Live Case By Country</h3>
          <Table countries={tableData}/>
          </div>
          <div className="app_graph">
          <h3>Worldwide New {casesType}</h3>
          <LineGraph casesType= {casesType} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
