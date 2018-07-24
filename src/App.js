
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory, Route } from 'react-router';
import mapboxgl from 'mapbox-gl';
import './App.css';
import InfoBox from './Infobox';


mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

const Page = ({ title }) => (

    <div className="App" id = 'appview'>
      <div className="App-header">
        <div className= "header-title">
        <h2>{title}</h2>
        </div>
      </div>
</div>

);

const Home = (props) => (
  <Page title="Home"/>
);

const About = (props) => (
  <Page title="About"/>
);

const Settings = (props) => (
  <Page title="Settings"/>
);

var geojsontext = {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "properties": {
          "title": "Grouse",
          "description": "where i always hit my head",
          "forecast": "/api/snow-forecast.com/resorts/Grouse-Mountain/6day/top"
        },
        "geometry": {
          "coordinates": [
             -123.082754,
             49.379609
          ],
          "type": "Point"
        }
      },

    ],

  };


class Map extends Component {

  static getSf(){
    var snow = require('snow-forecast-sfr');

    var snowdata =  snow.parseResort('Tignes', 'mid', function(json){
          //return json;
    });


    return snowdata;
  }

  static generateInfoBox(marker){
    var sum = 0;
    Map.getSf().forEach(function(snow) {
      sum += snow;
    });

  return ('<h3>' + marker.properties.title + '</h3><p>' + marker.properties.description + '</p>'
          + '<p>6 day snow: '+ sum + '</p>');

  }

  y() {
    console.log('y');
}


  static makeMarker(JSONText, thisMap, marker, httpRequest){
    console.log(httpRequest);
    console.log(httpRequest.readyState);
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
      console.log('in');
      if (httpRequest.status === 200) {
      console.log("makeing a marker");
      var response = JSON.parse(JSONText);
      // create a HTML element for each feature
      var el = document.createElement('div');
      el.className = 'marker';
  
      // make a marker for each feature and add to the map
       var mark = new mapboxgl.Marker(el)
      .setLngLat(marker.geometry.coordinates)
      .setPopup(new mapboxgl.Popup({ offset: 25 })
      
      // add popups
    //  .setHTML(Map.generateInfoBox(marker)))
    .setHTML('<p>' + JSONText+ '</p>'))
      .addTo(thisMap);
    }
    else {
      alert('There was a problem with the request.');
    }
  }
  };

  static makeMarkerFetch(JSONText, thisMap, marker){
    console.log(JSONText);
     // var response = JSON.parse(JSONText);
      // create a HTML element for each feature
      var el = document.createElement('div');
      el.className = 'marker';
  
      // make a marker for each feature and add to the map
       var mark = new mapboxgl.Marker(el)
      .setLngLat(marker.geometry.coordinates)
      .setPopup(new mapboxgl.Popup({ offset: 25 })
      
      // add popups
    //  .setHTML(Map.generateInfoBox(marker)))
    .setHTML('<p>' + JSONText + '</p>'))
      .addTo(thisMap);
  };


  addMarkers(thisMap){
    // add markers to map
    var httpRequest;
    geojsontext.features.forEach(function(marker) {
      
      httpRequest = new XMLHttpRequest();
      if (!httpRequest) {
        alert('Giving up :( Cannot create an XMLHTTP instance');
        return false;
      }
      console.log("makeing a request");
     

      fetch(marker.properties.forecast)
      .then(function(response) {
        return response.json();
      }).then(function(myJSON){
        Map.makeMarkerFetch(myJSON, thisMap, marker);
        console.log(myJSON)
      }).catch(error => console.error(`Fetch Error =\n`, error));
    
      });
      console.log('after')
      
     /*  console.log(marker.properties.forecast);
      httpRequest.open('GET', marker.properties.forecast , true);
      httpRequest.send();
      httpRequest.onreadystatechange = null
      console.log("sent"); */

      


  }




  componentDidMount() {
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [-122.889, 49.366021],
      zoom: 9
    });
    var thisMap = this.map;
    this.addMarkers(thisMap);
  }

  componentWillUnmount() {
    this.map.remove();
  }

  render() {
    const style ={
      position: 'absolute',
      top : 0,
      bottom: 0,
      width: '100%'
    };
    return <div style={style} ref={el => this.mapContainer = el} />;
  }
}
//document.getElementById('startmap').addEventListener("click", <Map />);
ReactDOM.render(<Map />, document.getElementById('map'));

class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
         <Route path="/" component={Home}/>
        {/*<Route path="/about" component={About}/>
        <Route path="/settings" component={Settings}/> */}
      </Router>
    );
}
}

export default App;
