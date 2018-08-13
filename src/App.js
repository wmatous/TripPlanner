
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory, Route } from 'react-router';
import mapboxgl, { LngLat } from 'mapbox-gl';
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


// [
//   {"url":"http://localhost:8000/trips/97d1a8e2-aebe-4e8b-83a1-ea0e2c949f2e/?format=json",
//   "id":"97d1a8e2-aebe-4e8b-83a1-ea0e2c949f2e",
//   "latitude":"49.975046",
//   "longitude":"-123.043000",
//   "title":"Black Tusk",
//   "duration":"10:30:00",
//   "distance":"25.10",
//   "description":"tusk",
//   "forecasts":
//     ["http://localhost:8000/forecasts/c31c768b-e86b-44bf-9c9c-41db030c071a/?format=json"],
//   "attributes":[]}
//   ,
//   {"url":"http://localhost:8000/trips/e209e1f4-d58a-451a-a9b5-ddda4c0a8b72/?format=json","id":"e209e1f4-d58a-451a-a9b5-ddda4c0a8b72","latitude":"49.953346","longitude":"-123.017517","title":"Panorama Ridge","duration":"09:00:00","distance":"28.10","description":"lil extra hike","forecasts":["http://localhost:8000/forecasts/cf9736c1-a8b1-43ab-a030-bca6f862f00c/?format=json"],"attributes":[]}]

var geojsontext = {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "properties": {
          "title": "Grouse Mountain",
          "description": "where i always hit my head",
          "forecast_url": "/api/snow-forecast.com/resorts/Grouse-Mountain/6day/top",
          "attributes": [
            "skiing",
            "hitting head",
            "skiing2",
            "hitting 1head",
            "skiing3",
            "hitting2 head"
          ],
          "distance": 1,
          "duration": 1,

          
          
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

  var attributeicons = {
    "skiing": "media/Sports-skiing-icon.png",
    "hitting head" : "media/Sports-skiing-icon.png",
    "skiing2": "media/Sports-skiing-icon.png",
    "hitting 1head" : "media/Sports-skiing-icon.png",
    "skiing3": "media/Sports-skiing-icon.png",
    "hitting2 head" : "media/Sports-skiing-icon.png"

  }


export default class Map extends Component {

  
  // static generateInfoBox(marker){
  //   var sum = 0;
  //   Map.getSf().forEach(function(snow) {
  //     sum += snow;
  //   });

  // return ('<h3>' + marker.properties.title + '</h3><p>' + marker.properties.description + '</p>'
  //         + '<p>6 day snow: '+ sum + '</p>');

  // }


  // static makeMarker(JSONText, thisMap, marker, httpRequest){
  //   console.log(httpRequest);
  //   console.log(httpRequest.readyState);
  //   if (httpRequest.readyState === XMLHttpRequest.DONE) {
  //     // console.log('in');
  //     if (httpRequest.status === 200) {
  //     // console.log("makeing a marker");
  //     var response = JSON.parse(JSONText);
  //     // create a HTML element for each feature
  //     var el = document.createElement('div');
  //     el.className = 'marker';
  
  //     // make a marker for each feature and add to the map
  //      var mark = new mapboxgl.Marker(el)
  //     .setLngLat(marker.geometry.coordinates)
  //     .setPopup(new mapboxgl.Popup({ offset: 25 })
      
  //     // add popups
  //   //  .setHTML(Map.generateInfoBox(marker)))
  //   .setHTML('<p>' + JSONText+ '</p>'))
  //     .addTo(thisMap);
  //   }
  //   else {
  //     alert('There was a problem with the request.');
  //   }
  // }
  // };

  // static makeMarkerFetch( thisMap, marker){
  //   // ReactDOM.render(<POISidebar />, document.getElementById('poi-wrapper'))
  //   // console.log(JSONText);
  //   // ReactDOM.unmountComponentAtNode(document.getElementById('poi-wrapper'));
    
  //    // var response = JSON.parse(JSONText);
  //     // create a HTML element for each feature
  //     var el = document.createElement('div');
  //     el.className = 'marker';
  //     // console.log('marker el');
  //     el.addEventListener('click', function(e){
  //       // console.log(e.target);
  //       ReactDOM.render(<POISidebar map = {thisMap} info = {marker.properties}/>, document.getElementById('poi-wrapper'));
  //     });
  
  //     // make a marker for each feature and add to the map
  //      var mark = new mapboxgl.Marker(el)
  //     .setLngLat(LngLat(marker.))
  //     .setPopup(new mapboxgl.Popup({ offset: 25 })
      
  //     // add popups
  //   //  .setHTML(Map.generateInfoBox(marker)))
  //   .setHTML('<p>' + marker.properties.title + '</p>'))
  //     .addTo(thisMap);
  
    
    
    
  // }


  addMarkers(thisMap, JSONdata){
    // add markers to map
    // var httpRequest;
    JSONdata.forEach(function(marker) {
      console.log(marker);
      var el = document.createElement('div');
      el.className = 'marker';
      // console.log('marker el');
      el.addEventListener('click', function(e){
        // console.log(e.target);
        ReactDOM.render(<POISidebar map = {thisMap} info = {marker.url}/>, document.getElementById('poi-wrapper'));
      });
  
      // make a marker for each feature and add to the map
      var mark = new mapboxgl.Marker(el)
      .setLngLat([marker.longitude, marker.latitude])
      .setPopup(new mapboxgl.Popup({ offset: 25 })
      
      // add popups
    //  .setHTML(Map.generateInfoBox(marker)))
      .setHTML('<p>' + marker.title + '</p>'))
      .addTo(thisMap);
  
    
    
      
      // httpRequest = new XMLHttpRequest();
      // if (!httpRequest) {
      //   alert('Giving up :( Cannot create an XMLHTTP instance');
      //   return false;
      // }
      // console.log("makeing a request");
     

      // fetch(marker.properties.forecast)
      // .then(function(response) {
      //   return response.json();
      // }).then(function(myJSON){
        
      //   // console.log(myJSON)
      // }).catch(error => console.error(`Fetch Error =\n`, error));
    
      });
      // console.log('after')
      
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
    // console.log('map el');
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
    
    fetch('https://pbeta.herokuapp.com/trips/?format=json')
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((myJSON) =>{
      console.log(myJSON);
      this.addMarkers(thisMap, myJSON);
    })
    .catch(error => console.error(`Fetch Error =\n`, error));
  //  console.log(this.state);
    
    
    
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

  // collectforecast(url){
  //   var JSON;
  //     // console.log(this.props.info.forecast);
  //     fetch(url)
  //       .then(function(response) {
  //         // console.log(response);
  //         return response.json();
  //       })
  //       .then(function(myJSON){
          
  //         JSON = myJSON;
  //         console.log(myJSON);
  //       })
  //       .catch(error => console.error(`Fetch Error =\n`, error));
  
  //       return JSON;
  //     }

  constructor(props) {
    super(props);
    this.state = {json: null};
    
    fetch(this.props.info)
    .then((response) => {
      // console.log(response);
      return response.json();
    })
    .then((myJSON) =>{
      
      this.setState({json : myJSON});
    })
    .catch(error => console.error(`Fetch Error =\n`, error));
   console.log(this.state);
  }
  

  Icons(props) {
    var nodes = [];
    if(props.attributes){
     props.attributes.forEach(function(attribute){
        nodes.push(React.createElement("img",
          {src : attributeicons[attribute], key: attribute, className : "activity-icon"}, null));
        
     });
    }
    return React.createElement('div', {id: "attribute-icons"}, nodes);
  }

  render() {
    console.log(this.state);
    
    // put snowforecast shit in cache somewhere so that scrape happens less

    return (
      <div className='poi-overlay' id='poi-info' >
                  <div className = 'poi-inner' id = 'poi-info-inner'>
      
          <div className = 'trip-title'>
              <p id ='trip-title' >{this.state.json ? this.state.json.title : "Loading..."}</p>
          </div>
          <div className = 'trip-attributes'>
              
            <this.Icons attributes = {this.state.json ? this.state.json.attributes : []}/>
          </div>
          <div className = 'trip-distance'>
              <p id = 'trip-distance'>{this.state.json ? this.state.json.distance : "Loading"} Km</p>
          </div>
          <div className = 'trip-duration'>
              <p id = 'trip-duration'>{this.state.json ? this.state.json.duration : "Loading"} days</p>
          </div>
          <div className = 'trip-forecast'>
              <p id = 'trip-forecast'> Loading</p>
              
          </div>
        </div>
        </div>
      );
  }

}

{/* <p id = 'trip-forecast'>{this.state.forecast ? JSON.stringify(this.state.json.forecast) : "Loading"}</p> */}



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
