import React from 'react'
import "../App.css"
import {Map as LeafletMap,TileLayer} from "react-leaflet"
import { showDataOnMap,centerMapcolor } from './utils'

function Map({countries,casesType,countryInfo,center,zoom}) {
    return (
        <div className="map">
            <LeafletMap center={center} zoom={zoom}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright";>OpenStreetMap</a> contributors'
                />
                 {showDataOnMap(countries,casesType)}
                {console.log(countryInfo)}
                {
                    countryInfo.countryInfo &&  centerMapcolor(countryInfo,casesType) 
                }
                
            </LeafletMap>
        </div>
    )
}
export default Map
