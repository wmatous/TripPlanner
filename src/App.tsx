import * as mapboxgl  from 'mapbox-gl';
import * as React from 'react';
import './App.css';
import {AppUtilsInstance} from './AppUtils'
import {tripstore} from './TripStore'

  if(process.env.REACT_APP_MAPBOX_KEY){
    (mapboxgl as typeof mapboxgl).accessToken =  process.env.REACT_APP_MAPBOX_KEY;
  } else {
    // handle the issue;
  }
 
export default class Map extends React.Component<{/* props */}, {/* state*/ }> {

  private map: any;

  private mapContainer: any;
  

  public componentDidMount() {
    
    this.map = new mapboxgl.Map({
      center: [-122.889, 49.366021],
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/satellite-v9',
      zoom: 9
    });
    const thisMap = this.map;

    AppUtilsInstance.setMapInstance(thisMap);

    tripstore.fetchData()
      .then((data)=>{
        AppUtilsInstance.populateMap(data);
      }).catch((err)=>{
      console.error(err);
    });

    /*
    reaction(() => tripstore.currentTripId,
    (data, rxn) => {AppUtils.refreshMarkers(thisMap);}
    );
    */

    this.mapContainer.addEventListener('dragover', (e:any)=>{
      e = e || event;
      e.preventDefault();
    });

    this.mapContainer.addEventListener('drop', (e:any)=>{
      AppUtilsInstance.handleFileDrop(e);
    }); 

    window.addEventListener('drop', (e:any)=> {
      e = e || event;
      e.preventDefault()
    });
  
    thisMap.on('click', (event:any) =>{
      AppUtilsInstance.handleMapClick(event);
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


