import React from 'react'
import { FormControl,Select,MenuItem,TextField} from '@material-ui/core';
import "../App.css"
import { Autocomplete } from '@material-ui/lab';
function Header({onChange,countries}) {
    
    return (
        <div className="header">
            <h1>COVID-19 TRACKER</h1>
            <FormControl>
                
            {/* <Select className="dropdown"
                labelId="label"
                variant="outlined" 
                onChange={onChange} 
                value={countries.value}
                
            >
                <MenuItem value= "worldwide">WorldWide</MenuItem>
                {countries.map((country,index) => (
                        <MenuItem key ={index} value={country.value}>{country.name}</MenuItem>
                    ))}
            </Select>
            */}
            
            <Autocomplete className="dropdown"
                onChange={(event,value)=>{
                    if (value) {
                        onChange(event,value.value)}
                    }}
                options = {countries}
                autoHighlight
                getOptionLabel={(option)=>option.name}
                renderOption={(option)=>(
                    <React.Fragment>
                    <div className= "search__dropdown">
                        <img src={option.flag} width="40" height="30" />
                        {option.name}
                    </div>
                    </React.Fragment>
                )}
            renderInput={(params)=>(
                <TextField className="input__search"
                {...params}
                label="World Wide"
                variant="outlined"
                placeholder="World Wide"
                />
            )}
            />
            </FormControl> 
        </div>

    )
}

export default Header;