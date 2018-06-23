
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
      // <div className = 'MapWrapper'>
      //   <div className = "MapView" id='map'>
      //   </div>
      // </div>


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
          "title": "Lincoln Park",
          "description": "A northside park that is home to the Lincoln Park Zoo"
        },
        "geometry": {
          "coordinates": [
            -87.637596,
            41.940403
          ],
          "type": "Point"
        }
      },

    ],

  };
//
// var geojson = JSON.parse(geojsontext);

class Map extends Component {
  componentDidMount() {
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [-122.889, 49.366021],
      zoom: 9
    });
    var thisMap = this.map;
    var geojson = {
        "type": "FeatureCollection",
        "features": [
          {
            "type": "Feature",
            "properties": {
              "title": "Lincoln Park",
              "description": "A northside park that is home to the Lincoln Park Zoo"
            },
            "geometry": {
              "coordinates": [
                -87.637596,
                41.940403
              ],
              "type": "Point"
            }
          },

        ],

      };
      // add markers to map
      geojson.features.forEach(function(marker) {

        // create a HTML element for each feature
        var el = document.createElement('div');
        el.className = 'marker';

        // make a marker for each feature and add to the map
        var mark = new mapboxgl.Marker(el)
        mark.setLngLat(marker.geometry.coordinates)
        mark.addTo(thisMap);
      });
  }
  // map = this.map;

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
        <Route path="/about" component={About}/>
        <Route path="/settings" component={Settings}/>
      </Router>
    );




}
}

export default App;
