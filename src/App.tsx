import mapboxgl from 'mapbox-gl';
import React, { Component } from 'react';


// import ReactDOM from 'react-dom';
// import posed from 'react-pose';

// import {POISidebar} from './POISidebar';
import {tripstore} from './TripStore';


import './App.css';
import { Trip } from './TripStore';

// import trips from './pbeta_trips.js';
// import tusk from './pbeta_blacktusk.js';




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

// var geojsontext = {
//     "type": "FeatureCollection",
//     "features": [
//       {
//         "type": "Feature",
//         "properties": {
//           "title": "Grouse Mountain",
//           "description": "where i always hit my head",
//           "forecast_url": "/api/snow-forecast.com/resorts/Grouse-Mountain/6day/top",
//           "attributes": [
//             "skiing",
//             "hitting head",
//             "skiing2",
//             "hitting 1head",
//             "skiing3",
//             "hitting2 head"
//           ],
//           "distance": 1,
//           "duration": 1,

          
          
//         },
//         "geometry": {
//           "coordinates": [
//              -123.082754,
//              49.379609
//           ],
//           "type": "Point"
//         }
//       },

//     ],

//   };

  // const attributeicons = {
    
  //   "hitting 1head" : "media/Sports-skiing-icon.png",
  //   "hitting 2head" : "media/Sports-skiing-icon.png",
  //   "hitting head" : "media/Sports-skiing-icon.png",
  //   "skiing": "media/Sports-skiing-icon.png",
  //   "skiing2": "media/Sports-skiing-icon.png",
    
  //   "skiing3": "media/Sports-skiing-icon.png"
    

  // }
  if(process.env.REACT_APP_MAPBOX_KEY){
    mapboxgl.accessToken =  process.env.REACT_APP_MAPBOX_KEY;
  } else {
    // handle the issue;
  }

   
export default class Map extends Component {
  
  public static fixURL(urlstring: string){
    
    // var s = string.indexOf("pbeta.herokuapp.com/");
    // console.log(s);
    // if (s !== -1){
    //   return "api"+string.substring(s+"pbeta.herokuapp.com".length);
    // }
    const s = urlstring.indexOf("http://localhost:8000/");
    console.log(s);
    if (s !== -1){
      return urlstring.substring(s+"http://localhost:8000/".length);
    }

  return urlstring;
  }

  // public static PosedSidebar = posed(POISidebar)
  // ({
  //   left: { x: -100 },
  //   right: { x: 0 }
  // });
  private map: any;
  private mapContainer: any;

  
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
// uncomment lines for deployment
 


// using thisMap: Map causes issue with last line
  public addMarkers(thisMap:any, JSONdata:Trip[]){
    // add markers to map
    // var httpRequest;
    for(const marker of JSONdata){
      console.log(marker);
      const el = document.createElement('div');
      el.className = 'marker';
      // console.log('marker el');
      el.addEventListener('click',  ()=> {
        if (marker.url){
          tripstore.setActiveTrip(marker.url);
          tripstore.setSidebar(true);
          
          
          ;
        }
      });
  
      // make a marker for each feature and add to the map
      if (marker.latitude  && marker.longitude){
      new mapboxgl.Marker(el)
      .setLngLat([marker.longitude, marker.latitude])
      .setPopup(new mapboxgl.Popup({ offset: 25 })
      
      // add popups
    //  .setHTML(Map.generateInfoBox(marker)))
      .setHTML('<p>' + marker.title + '</p>'))
      .addTo(thisMap);
      }
  
    
    }
   
      // console.log('after')
      
     /*  console.log(marker.properties.forecast);
      httpRequest.open('GET', marker.properties.forecast , true);
      httpRequest.send();
      httpRequest.onreadystatechange = null
      console.log("sent"); */

  }

  public componentDidMount() {
    this.map = new mapboxgl.Map({
      center: [-122.889, 49.366021],
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9',
      
      zoom: 9
    });
    const thisMap = this.map;
    // console.log('map el');
    thisMap.on('click', () =>{
      let targ;
      let e;
      if (!e && window.event){ 
        e = window.event;}
      if (e) {
        if (e.target) 
          {targ = e.target;}
        else if (e.srcElement) 
        {targ = e.srcElement;}
        if (targ instanceof Element){
          if (targ.nodeType === 3){ // defeat Safari bug
            targ = targ.parentNode;
          }
        // const element = document.getElementById('poi-wrapper')
        if (targ === thisMap.getCanvas()){
          tripstore.setSidebar(false);
      
        // ReactDOM.unmountComponentAtNode(element);
        }
    }}});
      // console.log(e);
      // console.log(targ);
      // console.log(thisMap);



      // console.log('map');
      // console.log(e);
      // console.log(e.originalevent);
    // console.log(Map.fixURL('https://pbeta.herokuapp.com/trips/?format=json'));

    // '/api/trips/?format=json' for deployment
    fetch('trips/')
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

  public componentWillUnmount() {
    this.map.remove();
  }

  public render() {
    
    return <div style ={{position: "absolute", top: 0, bottom: 0, width: "100%"}} ref={el => this.mapContainer = el} />;
  }
}


// document.getElementById('startmap').addEventListener("click", <Map />);




// ReactDOM.render(<POISidebar />, document.getElementById('poi-wrapper'));

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
