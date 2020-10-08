import React from 'react'
import "../css/table.css"
import numeral from "numeral"
import "../App.css"
function Table({countries}) {
    return (
        <div className="table">
            {countries.map((country)=>(
                <tr>
                    <td><img src={country.countryInfo.flag} width="50" height="40" className="Image__Size"/></td>
                    <td>{country.country}</td>
                    <td><strong>{numeral(country.cases).format("0,0")}</strong></td>
                </tr>
            ))}
        </div>
    )
}

export default Table
