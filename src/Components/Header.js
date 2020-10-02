import React , {useState , useEffect} from 'react'
import { FormControl,Select,MenuItem } from '@material-ui/core';
function Header({onChange,country,countries}) {

    return (
        <div className="header">
            <h1>COVID-19 TRACKER</h1>
            <FormControl>
                
            <Select 
                variant="outlined" 
                onChange={onChange} 
                value={country}
            >
                <MenuItem value= "worldwide">WorldWide</MenuItem>
                {countries.map((country,index) => (
                        <MenuItem key ={index} value={country.value}>{country.name}</MenuItem>
                    ))}
            </Select>
            </FormControl>
        </div>

    )
}

export default Header;
