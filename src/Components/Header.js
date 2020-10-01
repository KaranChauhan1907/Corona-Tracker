import React from 'react'
import { FormControl,Select,MenuItem } from '@material-ui/core';
function Header() {

    const [countries,setCountries] = useState([])
    return (
        <div className="header">
            <h1>COVID-19 TRACKER</h1>
            <FormControl>
            <Select variant="outlined">
                <MenuItem  value="India">Option 1</MenuItem>
                <MenuItem value="India">Option 2</MenuItem>
                <MenuItem value="India">Option 3</MenuItem>
                <MenuItem value="India">Option 4</MenuItem>
            </Select>
            </FormControl>
        </div>

    )
}

export default Header;
