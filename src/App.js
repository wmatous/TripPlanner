
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory, Route } from 'react-router';
import mapboxgl from 'mapbox-gl';
import './App.css';
import InfoBox from './Infobox';


mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

// const Page = ({ title }) => (

//     <div className="App" id = 'appview'>
//       <div className="App-header">
//         <div className= "header-title">
//         <h2>{title}</h2>
//         </div>
//       </div>
// </div>

// );

// const Home = (props) => (
//   <Page title="Home"/>
// );

// const About = (props) => (
//   <Page title="About"/>
// );

// const Settings = (props) => (
//   <Page title="Settings"/>
// );

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


export default class Map extends Component {

  
  // static generateInfoBox(marker){
  //   var sum = 0;
  //   Map.getSf().forEach(function(snow) {
  //     sum += snow;
  //   });

  // return ('<h3>' + marker.properties.title + '</h3><p>' + marker.properties.description + '</p>'
  //         + '<p>6 day snow: '+ sum + '</p>');

  // }


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
    // ReactDOM.render(<POISidebar />, document.getElementById('poi-wrapper'))
    // console.log(JSONText);
    // ReactDOM.unmountComponentAtNode(document.getElementById('poi-wrapper'));
    
     // var response = JSON.parse(JSONText);
      // create a HTML element for each feature
      var el = document.createElement('div');
      el.className = 'marker';
      console.log('marker el');
      el.addEventListener('click', function(e){
        console.log(e.target);
        ReactDOM.render(<POISidebar map = {thisMap} />, document.getElementById('poi-wrapper'));
      });
  
      // make a marker for each feature and add to the map
       var mark = new mapboxgl.Marker(el)
      .setLngLat(marker.geometry.coordinates)
      .setPopup(new mapboxgl.Popup({ offset: 25 })
      
      // add popups
    //  .setHTML(Map.generateInfoBox(marker)))
    .setHTML('<p>' + JSONText + '</p>'))
      .addTo(thisMap);
  
    
    
    
  }


  addMarkers(thisMap){
    // add markers to map
    // var httpRequest;
    geojsontext.features.forEach(function(marker) {
      
      // httpRequest = new XMLHttpRequest();
      // if (!httpRequest) {
      //   alert('Giving up :( Cannot create an XMLHTTP instance');
      //   return false;
      // }
      // console.log("makeing a request");
     

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
    console.log('map el');
    thisMap.on('click', function(){
      var targ;
      if (!e) var e = window.event;
      if (e.target) targ = e.target;
      else if (e.srcElement) targ = e.srcElement;
      if (targ.nodeType === 3) // defeat Safari bug
        targ = targ.parentNode;

      if (targ === thisMap.getCanvas()){
      ReactDOM.unmountComponentAtNode(document.getElementById('poi-wrapper'));
      }
    });
      // console.log(e);
      // console.log(targ);
      // console.log(thisMap);



      // console.log('map');
      // console.log(e);
      // console.log(e.originalevent);
  
    
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


class POISidebar extends Component{

  // constructor(props) {
  //   super(props);
   
  // }

  

  render() {
    return (
      <div className='poi-overlay' id='poi-info' >
        
      
      <div className = 'poi-inner' id = 'poi-info-inner'>
          <div className = 'trip-title'>
              <p>title of trip goes here</p>
          </div>
          <div className = 'trip-sports'>
              <p>sports</p>
          </div>
          <div className = 'trip-distance'>
              <p>N Km</p>
          </div>
          <div className = 'trip-location'>
              <p>N days</p>
          </div>
          <div className = 'trip-forecast'>
              <p>forecast of trip goes here</p>
          </div>
        </div>
        </div>
      );
  }

}
//ReactDOM.render(<POISidebar />, document.getElementById('poi-wrapper'));

// class App extends Component {
//   render() {
//     return (
//       <Router history={browserHistory}>
//          <Route path="/" component={Home}/>
//         {/*<Route path="/about" component={About}/>
//         <Route path="/settings" component={Settings}/> */}
//       </Router>
//     );
// }
// }

// export default App;
