import mapboxgl from 'mapbox-gl';
import React, { Component } from 'react';
import './App.css';
import {tripstore} from './TripStore';

import { Trip } from './TripStore';

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
  
   // private hoveredRouteId: any;

  constructor(props:any) {
    super(props);
    // Don't call this.setState() here!
   //  this.hoveredRouteId =null;
    this.state= {routeColour: true};
  }
  


 


// using thisMap: Map causes issue with last line
  public addMarkers(thisMap:any, JSONdata:Trip[]){
    // add markers to map
    for(const marker of JSONdata){
      this.addMarker(thisMap, marker);
    }
  }

  public addMarker(thisMap:any, marker : Trip){
    const el = document.createElement('div');
      el.className = 'marker';
      el.addEventListener('click',  ()=> {
        if (marker.id){
          tripstore.setActiveTrip(marker.id);
          ;
        }
      });
  
      // make a marker for each feature and add to the map
      if (marker.latitude  && marker.longitude){
      new mapboxgl.Marker(el)
      .setLngLat([marker.longitude, marker.latitude])
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
    const thisMap = this.map;
    // console.log('map el');
    thisMap.on('click', (event:any) =>{
      console.log(event);
      if (tripstore.editMode.editMarker){
        const newTrip = {
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
      thisMap.setFeatureState({source: 'pathSource', id: 'routeOutline'}, { hover: false});
      thisMap.setFeatureState({source: 'pathSource', id: 'route'}, { hover: false});
  });

  /* thisMap.on("mousemove", "routeOutline", (e:any) => {
    /* thisMap.setFeatureState({source: 'pathSource', id: 'routeOutline'}, 
      { hover: !thisMap.getFeatureState({source: 'pathSource', id: 'routeOutline'}).hover});
    this.setState({routeColour: !this.state.routeColour});
return; 
    if (e.features.length > 0) {
    if (this.hoveredRouteId) {
    thisMap.setFeatureState({source: 'pathSource', id: this.hoveredRouteId}, { hover: false});
    }
    console.log(e);
    this.hoveredRouteId = e.features[0].id;
    thisMap.setFeatureState({source: 'pathSource', id: this.hoveredRouteId}, { hover: true});
    }
    });
     
  
    thisMap.on("mouseleave", "routeOutline", () => {
      console.log('leaving');
      thisMap.setFeatureState({source: 'pathSource', id: 'routeOutline'}, { hover: false});
      this.setState({routeColour: !this.state.routeColour});
    }); */

    thisMap.on("mousemove", "routeOutline", (e:any) => {
      console.log(e);
      thisMap.setFeatureState({source: 'pathSource', id: 'routeOutline'}, { hover: true});
      console.log(thisMap.getFeatureState({source: 'pathSource', id: 'routeOutline'}));
      });
       
      // When the mouse leaves the state-fill layer, update the feature state of the
      // previously hovered feature.
      thisMap.on("mouseleave", "routeOutline", ()  =>{
        thisMap.setFeatureState({source: 'pathSource', id: 'routeOutline'}, { hover: false});
      });



    
  }

  public componentWillUnmount() {
    this.map.remove();
  }

  public render() {
    
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


