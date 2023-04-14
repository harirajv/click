import './App.css';
import { useState, useEffect } from 'react';
import GoogleMapsComponent from './GoogleMapsComponent';

function App() {
  let [clickCount, setCickCount] = useState(() => {
    let ct = localStorage.getItem("count");
    return +ct || 0;
  });
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
    setClickLocations([]);
  }

  const coordsHTML = ({lat, lng}) =>
                     `${lat}\u00B0${lat > 0 ? "N" : "S"}, ${Math.abs(lng)}\u00B0${lng>0 ? "E" : "W"}`

  return (
    <div className="App">
      <div className='button-container'>
        <button onClick={counter}>Click Me!</button>
        {clickCount !== 0 && <button onClick={resetCounter}>Reset</button>}
      </div>
      {clickCount !== 0 && (<h2># of Clicks: {clickCount}</h2>)}
      {clickLocations.length !== 0 && (
        <h3>
          Latest location: {coordsHTML(clickLocations[clickLocations.length-1])}
        </h3>
      )}
      <div className='location-elements'>
        <table className='location-table'>
          <thead>
            <tr><th>Location Cordinates</th></tr>
          </thead>
          <tbody>
          {clickLocations && clickLocations.map(location => {
            console.log(location)
            return (
              <tr key={location.key}>
                <td key={location.key}>{location.lat}&deg;{location.lat>0 ? "N" : "S"}, {Math.abs(location.lng)}&deg;{location.lng>0 ? "E" : "W"}</td>
              </tr>
            )
          })}
          </tbody>
        </table>
        <GoogleMapsComponent
          locations={clickLocations}
          styleClass={clickCount !== 0}
        />
      </div>
      
    </div>
  );
}

export default App;
