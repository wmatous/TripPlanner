import mapboxgl from 'mapbox-gl';
import React, { Component } from 'react';
import './App.css';
import {tripstore} from './TripStore';

import { MarkerSource, Trip } from './TripStore';

  if(process.env.REACT_APP_MAPBOX_KEY){
    mapboxgl.accessToken =  process.env.REACT_APP_MAPBOX_KEY;
  } else {
    // handle the issue;
  }

  const pathSource = {

    "data": {
      'features': [{
      "geometry": {
        "coordinates": [[
          -123.12822275518005,
          49.9646443798518
        ],
        [
          -123.09732370732848,
          49.94675254120151
        ],
        [
          -123.07157450078552,
          49.94675254120151
        ],
        [
          -123.05131845830505,
          49.96221501408653
        ],
        [
          -123.04376535771911,
          49.9761269947761
        ],
        [
          -123.05131845830505,
          49.96221501408653
        ],
        [
          -123.02041941045348,
          49.95580973485
        ],
        [
          -123.05166178105895,
          49.962435870585786
        ],
        [
          -123.07191782353942,
          49.94653161276007
        ],
        [
          -123.09766703008239,
          49.94675254120151
        ],
        [
          -123.12822275518005,
          49.9646443798518
        ]
      ],
        "type": "LineString",
        },
      "properties": {'color': '#33C9EB'},
      "type": "Feature",
      }],
      'type': 'FeatureCollection',
    },
    
    'generateId': true,
    "type": "geojson",
    
    };
  const mapPath = {
    "id": "route",
    
"type": "line",

        "layout": {
          "line-cap": "round",
        "line-join": "round"
        
        },
        "paint": {
          'line-color': ['get', 'color'],
          "line-width": 8
        },
        "source": 'pathSource'
        };

    const pathOutline = {
          "id": "routeOutline",
      
      
      
      "layout": {},
      "paint": {
      "fill-color": "#627BC1",
      "fill-opacity": ["case",
      ["boolean", ["feature-state", "hover"], true],
      1,
      0
      ]
      },
      "source": "pathSource",
      "type": "fill",
    };
   
export default class Map extends Component<{/* props */}, {/* state*/ routeColour:boolean }> {

  public static fixURL(urlstring: string){
    const s = urlstring.indexOf("http://localhost:8000/");
    if (s !== -1){
      return urlstring.substring(s+"http://localhost:8000/".length);
    }

  return urlstring;
  }

  private map: any;

  private mapContainer: any;
  

  constructor(props:any) {
    super(props);
    this.state= {routeColour: true};
  }

  public populateMap(thisMap:mapboxgl.Map){
    this.addMarkers(thisMap, tripstore.payload);
  }


// using thisMap: Map causes issue with last line
  public addMarkers(thisMap:mapboxgl.Map, data:any){
    // add markers to map
    for(const key of Object.keys(data)){
      this.addMarker(thisMap, data[key]);
    }
  }

  public addMarker(thisMap:any, marker : Trip | MarkerSource){
    const lat = (marker as MarkerSource).lat || (marker as Trip).latitude;
    const long = (marker as MarkerSource).long || (marker as Trip).longitude;
      // make a marker for each feature and add to the map
      if (lat && long){
        const el = document.createElement((marker as MarkerSource).element || 'div');
          el.className = ((marker as MarkerSource).className || 'marker');
          const id = (marker as Trip).id
          if (id){
            el.addEventListener('click',  ()=> {
                tripstore.setActiveTrip(id);
            });
          }
          
        new mapboxgl.Marker(el)
        .setLngLat([long, lat])
        .addTo(thisMap);
      }
  }

  

  public componentDidMount() {
    this.map = new mapboxgl.Map({
      center: [-122.889, 49.366021],
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9',
      zoom: 9
    });

    tripstore.fetchData().then((res)=>{
      this.populateMap(this.map);
    }).catch((err)=>{
      console.error(err);
    });

    const thisMap = this.map;

    thisMap.on('click', (event:any) =>{
      if (tripstore.editMode.editMarker){
        const newTrip:Trip = {
          active : true,
          description: 'test',
          distance: '0',
          duration: '0',
          id: Math.random().toString(36).substring(7),
          latitude: event.lngLat.lat,
          longitude: event.lngLat.lng,
          title: 'test'
          };
        tripstore.setEditMode('editMarker', false);
        this.addMarker(thisMap, newTrip);
        tripstore.addTrip(newTrip);
        return;
      }
      else if (tripstore.editMode.editPath){
        return;
      }

      this.handleNormalMapClick(thisMap);
});

    // '/api/trips/?format=json' for deployment
    fetch('trips/')
    .then((response) => {
      return response.json();
    })
    .then((myJSON) =>{
      this.addMarkers(thisMap, myJSON);
    })
    .catch(error => console.error(`Fetch Error =\n`, error));

    thisMap.on('load', () =>{
      thisMap.addSource('pathSource', pathSource)
      thisMap.addLayer(mapPath);
      thisMap.addLayer(pathOutline);
  });

    
  }

  public componentWillUnmount() {
    this.map.remove();
  }

  public render() {
    console.log('rendering');
    
    return <div 
      style ={{position: "absolute", top: 0, bottom: 0, width: "100%"}} 
      ref={el => this.mapContainer = el} />;
  }

  private handleNormalMapClick (thisMap: mapboxgl.Map) {
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

        if (targ === thisMap.getCanvas()){
          tripstore.setSidebar(false);
      
        }

    }}
  }
}


