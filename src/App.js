import React, {useState} from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [zipCode, setZipCode] = useState('');
  
  let firstData = data[0];
  let city = '';
  let state = '';
  let lat = '';
  let long = '';
  let estimatedPop = '';
  let totalWages = '';

  if(firstData !== undefined){
    document.getElementById("the-info").className = "list-unstyled d-block"
    city = firstData.City + ', ' + firstData.State;
    state = 'State: ' + firstData.State;
    lat = 'Location: (' + firstData.Lat + ', ';
    long = firstData.Long + ')';
    estimatedPop = 'Population (estimated): ' + firstData.EstimatedPopulation;
    totalWages = 'Total Wages: ' + firstData.TotalWages;
  } else{
    city = <b>No results found</b>;
  }

  const fetchData = () => {
    fetch('https://ctp-zip-api.herokuapp.com/zip/' + zipCode , {
    'mode' : 'cors',
    headers: {
      'Content-Type' : 'application/json',
    }
    })
    .then((response) => response.json())
    .then((responseData) => setData(responseData))
    .catch((error) => (console.log("NO RESULTS FOUND FOR " + zipCode)) & (
      document.getElementById("city-section").innerHTML = "<b>No results found</b>",
      document.getElementById("the-info").className = "list-unstyled d-none"
    ));
  }
  
  return (
  <div className="App">
    <div className="App-header">
      <h1>Zip Code Search</h1>
    </div>
    <br></br>

    <div className="container">
      <div className="row">
        <div style={{marginTop: 20}}>
          <div className="Main-box d-flex justify-content-center">
            <form>
              <label>Zip Code:</label>
              <input type="text" onChange={(e) => setZipCode(e.target.value)} className="rounded" required pattern="[0-9]+"></input>
            </form>
          </div>

          <div className="Main-box d-flex justify-content-center mt-1">
            <button onClick={() => fetchData(zipCode)}>Search</button>
          </div>
          <br></br>

          <div>
              <div className="row">
                <div className="Main-box row bg-light border border-dark rounded-top w-100">
                  <pre id="city-section">{city}</pre>
                </div>
                <div className="row bg-primary border border-dark rounded-bottom w-100 text-white">
                  <ul className="list-unstyled d-none" id="the-info">
                    <li className="justify-content-left" id="under-city"><pre>{state}</pre></li>
                    <li className="justify-content-left"><pre id="under-city">{lat}{long}</pre></li>
                    <li className="justify-content-left"><pre id="under-city">{estimatedPop}</pre></li>
                    <li className="justify-content-left"><pre id="under-city">{totalWages}</pre></li>
                  </ul>
                </div>
              </div>
            </div>
            <br></br>
        </div>
      </div>
    </div>
  </div>
  ) 
}

export default App;