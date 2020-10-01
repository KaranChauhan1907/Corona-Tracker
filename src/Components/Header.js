import React , {useState , useEffect} from 'react'
import { FormControl,Select,MenuItem } from '@material-ui/core';
function Header() {

    const [countries,setCountries] = useState([])
    const [country,setCountry] = useState("worldwide");

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

    const ChangeCountry = (e)=>{
        const countrycode = e.target.value
        setCountry(countrycode)
    }

    return (
        <div className="header">
            <h1>COVID-19 TRACKER</h1>
            <FormControl>
                
            <Select variant="outlined" onChange={ChangeCountry} value={country}>
                <MenuItem value= "worldwide">WorldWide</MenuItem>
                {countries.map((country) => (
                        <MenuItem value={country.value}>{country.name}</MenuItem>
                    ))}
            </Select>
            </FormControl>
        </div>

    )
}

export default Header;
