import React from "react";
import numeral from "numeral";
import { Circle, Popup ,Tooltip} from "react-leaflet";
import "../App.css"

const casesTypeColors = {
  cases: {
    hex: "#CC1034",
    multiplier: 500,
  },
  recovered: {
    hex: "#7dd71d",
    multiplier: 600,
  },
  deaths: {
    hex: "#fb4443",
    rgb: "rgb(251, 68, 67)",
    half_op: "rgba(251, 68, 67, 0.5)",
    multiplier: 2000,
  },
};

export const sortData = (data) => {
  let sortedData = [...data];
  sortedData.sort((a, b) => {
    if (a.cases > b.cases) {
      return -1;
    } else {
      return 1;
    }
  });
  return sortedData;
};

export const centerMapcolor=(countryInfo,casesType)=>
  <Circle
  center={[countryInfo.countryInfo.lat, countryInfo.countryInfo.long]}
  color={"black"}
  fillColor={"black"}
  fillOpacity={0.4}
  radius={
    Math.sqrt(countryInfo[casesType]) * casesTypeColors[casesType].multiplier
  }
  >
    <Popup className="popup__size">
        <div className="info-container">
            <div className="info-flag" style={{backgroundImage:`url(${countryInfo.countryInfo.flag})`}}></div>
            <div className="info-name">{countryInfo.country}</div>
            <div className="info-confirmed">Cases : {numeral(countryInfo.cases).format("0,0")}</div>
            <div className="info-recovered">Recovered : {numeral(countryInfo.recovered).format("0,0")}</div>
            <div className="info-deaths">Deaths : {numeral(countryInfo.deaths).format("0,0")}</div>
        </div>
      </Popup>
  </Circle>
  

export const prettyPrint = (stat)=>
    stat ? `+${numeral(stat).format("0.0a")}` : "+0";

export const showDataOnMap = (data, casesType = "cases") =>
  data.map((country) => (
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      color={casesTypeColors[casesType].hex}
      fillColor={casesTypeColors[casesType].hex}
      fillOpacity={0.4}
      radius={
        Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
      }
    >
      <Popup className="popup__size">
        <div className="info-container">
            <div className="info-flag" style={{backgroundImage:`url(${country.countryInfo.flag})`}}></div>
            <div className="info-name">{country.country}</div>
            <div className="info-confirmed">Cases : {numeral(country.cases).format("0,0")}</div>
            <div className="info-recovered">Recovered : {numeral(country.recovered).format("0,0")}</div>
            <div className="info-deaths">Deaths : {numeral(country.deaths).format("0,0")}</div>
        </div>
      </Popup>
    </Circle>
  ));
  