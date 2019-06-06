import * as mapboxgl  from 'mapbox-gl';
import * as React from 'react';
import './App.css';
import AppUtils from './AppUtils'
import {tripstore, Trip} from './TripStore'

  if(process.env.REACT_APP_MAPBOX_KEY){
    (mapboxgl as typeof mapboxgl).accessToken =  process.env.REACT_APP_MAPBOX_KEY;
  } else {
    // handle the issue;
  }
 
export default class Map extends React.Component<{/* props */}, {/* state*/ }> {

  private map: any;

  private mapContainer: any;
  

  public populateMap(thisMap:mapboxgl.Map){
    this.addMarkers(thisMap, tripstore.payload);
  }

  public addMarkers(thisMap:mapboxgl.Map, data:{[key:string]:Trip}){
    // add markers to map
    for(const key of Object.keys(data)){
      const markerObject = data[key].MARKERS;
      if (markerObject){
        Object.keys(markerObject).forEach(e => AppUtils.addMarker(thisMap, markerObject[e], key));
      }
    }
  }

  

  public componentDidMount() {
    
    this.map = new mapboxgl.Map({
      center: [-122.889, 49.366021],
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/satellite-v9',
      zoom: 9
    });

    tripstore.fetchData().then(()=>{
      this.populateMap(this.map);
    }).catch((err)=>{
      console.error(err);
    });

    const thisMap = this.map;

    this.mapContainer.addEventListener('dragover', (e:any)=>{
      e = e || event;
      e.preventDefault();
    });

    this.mapContainer.addEventListener('drop', (e:any)=>{
      AppUtils.handleFileDrop(e, thisMap);
    }); 

    window.addEventListener('drop', (e:any)=> {
      e = e || event;
      e.preventDefault()
    });
  
    thisMap.on('click', (event:any) =>{
      AppUtils.handleMapClick(event, thisMap);
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

}


