import React, {useState} from "react";
import "./App.css";

function City(props) {
  const data = props.data;
  let firstData = data[0];
  let city = '';
  let state = '';
  let lat = '';
  let long = '';
  let estimatedPop = '';
  let totalWages = '';
  
  if(firstData !== undefined){
    city = firstData.City;
    state = firstData.State;
    lat = firstData.Lat;
    long = firstData.Long;
    estimatedPop = firstData.EstimatedPopulation;
    totalWages = firstData.TotalWages;
  } else{
    city = 'No results found';
    state = '';
    lat = '';
    estimatedPop = '';
    totalWages = '';
  }

  return(
    <div>
      <div class="container">
        <div class="row">
            <div class="col-12 rounded">
              <div>
                <pre>{city}</pre>
              </div>
              <div>
                <ul>
                  <li><pre>State: {state}</pre></li>
                  <li><pre>Location: ({lat}, {long})</pre></li>
                  <li><pre>Population (estimated): {estimatedPop}</pre></li>
                  <li><pre>Total Wages: {totalWages}</pre></li>
                </ul>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}

function ZipSearchField(props) {
  const setZipCode = props.setZipCode;
  const fetchData = props.fetchData;
  const data = props.data;
  const zipCode = props.zipCode;

  return(
    <div>
      <br></br>
        <div class="container">
          <div class="row">
            <div>
              <form>
                <label htmlFor="zip">Zip Code:</label><br></br>
                <input type="text" id="zip" name="zip" class="rounded w-100" onChange={(e) => setZipCode(e.target.value) & fetchData(e.target.value) & console.log("Zipcode: " + zipCode) & console.log("Data: " + data)} required pattern="[0-9]+"></input>
                <br></br>
              </form>
            </div>
          </div>
        </div>
      <br></br>
    </div>
  );
}

function App() {
  const [data, setData] = useState([]);
  const [zipCode, setZipCode] = useState('');

  const fetchData = () => {
    fetch('https://ctp-zip-api.herokuapp.com/zip/' + zipCode , {
    'mode' : 'cors',
    headers: {
      'Content-Type' : 'application/json',
    }
    })
    .then((response) => response.json())
    .then((reponse) => setData(reponse))
    .catch((error) => console.log("NO RESULTS FOUND FOR " + zipCode));
  }

  return (
    <div className="App">
      <div className="App-header">
        <h1>Zip Code Search</h1>
      </div>
      <div className="mx-auto" style={{ maxWidth: 400 }}>
        <ZipSearchField setZipCode={setZipCode} fetchData={fetchData} data={data} zipCode={zipCode}/>
        <div>
          <City data={data}/>
        </div>
      </div>
    </div>
  );
}

export default App;