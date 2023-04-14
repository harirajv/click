import './App.css';
import { useState, useEffect } from 'react';
import GoogleMapsComponent from './GoogleMapsComponent';

function App() {
  let [clickCount, setCickCount] = useState(() => {
    let ct = localStorage.getItem("count");
    return +ct || 0;
  });
  let [latitude, setLatitude] = useState(0);
  let [longitude, setLongitude] = useState(0);
  let [clickLocations, setClickLocations] = useState(() => {
    let locArr = localStorage.getItem("locations");
    return locArr ? JSON.parse(locArr) : []
  });

  useEffect(() => {
    localStorage.setItem("count", clickCount);
    localStorage.setItem("locations", JSON.stringify(clickLocations));
  });

  const counter = () => {
    setCickCount(clickCount+1);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude)
        setLongitude(position.coords.longitude)
        setClickLocations(arr => [...arr, {
          key: localStorage.getItem("count"),
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }])
      }, () => console.error("No location info"))
    }
  }

  const resetCounter = () => {
    setCickCount(0);
    setLatitude(0);
    setLongitude(0);
    setClickLocations([]);
  }

  const loaded = () => clickCount !== 0 && latitude !== null && longitude !== null;

  return (
    <div className="App">
      <div className='button-container'>
        <button onClick={counter}>Click Me!</button>
        {clickCount && <button onClick={resetCounter}>Reset</button>}
      </div>
      {clickCount && (<h2># of Clicks: {clickCount}</h2>)}
      {latitude !== 0 && longitude !== 0 && <h3>Latest click location: {latitude}, {longitude}</h3>}
      <div className='location-elements'>
        <table className='location-table'>
          <thead>
            <tr><th>Location Cordinates</th></tr>
          </thead>
          <tbody>
          {clickLocations && clickLocations.map(location => {
            console.log(location)
            return (
              <tr>
                <td key={location.key}>{location.lat}&deg;{location.lat>0 ? "N" : "S"}, {Math.abs(location.lng)}&deg;{location.lng>0 ? "E" : "W"}</td>
              </tr>
            )
          })}
          </tbody>
        </table>
        <GoogleMapsComponent 
          location={{lat: latitude, lng: longitude}}
          locations={clickLocations}
          styleClass={loaded}
        />
      </div>
      
    </div>
  );
}

export default App;
