import React from 'react';
import Header from "./Components/Header"
import InfoBox from "./Components/InfoBox"
import Map from "./Components/Map"
import './App.css';

function App() {
  return (
    <div className="App">
      <Header/>
      <div className="app_stats">
        <InfoBox title="Coronavirus Cases" cases={123} total={2000}/>
        <InfoBox title="Recovered" cases={123} total={2000}/>
        <InfoBox title="Deaths" cases={123} total={2000}/>
      </div>
      {/* Tables */}
      {/* Graphs */}
      <div className='app_map'>
        <Map/>
      </div>

    </div>
  );
}

export default App;
