import * as mapboxgl  from 'mapbox-gl';
import * as React from 'react';
import './App.css';
import {tripstore} from './TripStore';


import { MarkerSource, Trip } from './TripStore';

  if(process.env.REACT_APP_MAPBOX_KEY){
    (mapboxgl as typeof mapboxgl).accessToken =  process.env.REACT_APP_MAPBOX_KEY;
  } else {
    // handle the issue;
  }

 
export default class Map extends React.Component<{/* props */}, {/* state*/ routeColour:boolean }> {

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

  public addMarker(thisMap:mapboxgl.Map, marker : Trip | MarkerSource){
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
                tripstore.setSidebar(true);
                if (tripstore.setActiveTrip(id) &&
                    tripstore.payload[tripstore.currentTripId].latitude &&
                    tripstore.payload[tripstore.currentTripId].longitude){
                     thisMap.flyTo({center:new mapboxgl.LngLat(
                      Number(tripstore.payload[tripstore.currentTripId].longitude),
                      Number(tripstore.payload[tripstore.currentTripId].latitude)
                        )
                      });


                  }
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
      e = e || event;
      e.stopPropagation();
      e.preventDefault();
      e.dataTransfer.dropEffect = 'copy';
      const dt = e.dataTransfer;
      const files = dt.files;
      const reader = new FileReader();
      reader.onload =(theFile:any)=>{
        const oParser = new DOMParser();
        const oDOM = oParser.parseFromString(theFile.target.result, "application/xml");
        const trkpts = oDOM.getElementsByTagName('trkpt');
        const latLonData = [];
        for(const field of Object.keys(trkpts)){
          latLonData.push(
            [
              Number(trkpts[field].getAttribute('lon')),
              Number(trkpts[field].getAttribute('lat'))
            ]);
        }

        const tripId =  Math.random().toString(36).substring(7);
        const sourceId = tripId +  Math.random().toString(36).substring(7);
        const layerId = tripId +  Math.random().toString(36).substring(7);
        
        const newPathSource = {
          "data": {
            'features': [{
            "geometry": {
              "coordinates": latLonData,
              "type": "LineString",
              },
            "properties": {'color': '#33C9EB'},
            "type": "Feature",
            }],
            'type': 'FeatureCollection',
          },
          "type": "geojson",
          };

          thisMap.addSource(sourceId, newPathSource);
          const newMapPath = {
            "id": layerId,
            "layout": {
              "line-cap": "round",
            "line-join": "round"
            },
            "paint": {
              'line-color': ['get', 'color'],
              "line-width": 8
            },
            "source": sourceId,
              "type": "line"              
          };
          thisMap.addLayer(newMapPath);
          thisMap.panTo(latLonData[0]);
          const newlayers=  {};
          newlayers[layerId] = {source:newPathSource, layer:newMapPath};
          const newTrip = {
            id: tripId,
            layers: newlayers
          };
          tripstore.updateTrip(newTrip);
          tripstore.setCurrentLayer({trip:tripId, layer:layerId, source:sourceId});

      };
      reader.readAsText(files[0]);
    }); 
    window.addEventListener('drop', (e:any)=> {
      e = e || event;
      e.preventDefault()});
    

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
        tripstore.updateTrip(newTrip);
        tripstore.setSidebar(true);
        thisMap.flyTo({center: event.lngLat});
        return;
      }
      else if (tripstore.editMode.editPath){
        if (tripstore.currentLayer){
          try{
            const sourceId = tripstore.currentLayer.source;
            const mapSource = thisMap.getSource(sourceId);
            
            if(mapSource){
              const data = mapSource._data;
              data.features[0].geometry.coordinates.push([
                event.lngLat.lng,
                event.lngLat.lat
              ]);
              mapSource.setData(data);
              thisMap.panTo([
                event.lngLat.lng,
                event.lngLat.lat
              ]);
              tripstore.setCurrentSourceData(data);
            }
          } catch(e){
            console.log(e);
            console.error('Problem Updating path');
          }

        } else{

        
        
        const tripId =  Math.random().toString(36).substring(7);
        const sourceId = tripId +  Math.random().toString(36).substring(7);
        const layerId = tripId +  Math.random().toString(36).substring(7);
        
        const newPathSource = {
          "data": {
            'features': [{
            "geometry": {
              "coordinates": [[
                event.lngLat.lng,
                event.lngLat.lat
              ]
            ],
              "type": "LineString",
              },
            "properties": {'color': '#33C9EB'},
            "type": "Feature",
            }],
            'type': 'FeatureCollection',
          },
          "type": "geojson",
          };
          
          thisMap.addSource(sourceId, newPathSource);
          const newMapPath = {
            "id": layerId,
            "layout": {
              "line-cap": "round",
            "line-join": "round"
            },
            "paint": {
              'line-color': ['get', 'color'],
              "line-width": 8
            },
            "source": sourceId,
              "type": "line"              
          };
          thisMap.addLayer(newMapPath);
          const newlayers=  {};
          newlayers[layerId] = {source:newPathSource, layer:newMapPath};
          const newTrip = {
            id: tripId,
            layers: newlayers
          };
          tripstore.updateTrip(newTrip);
          tripstore.setCurrentLayer({trip:tripId, layer:layerId, source:sourceId});
        }
        return;
      }

      this.handleNormalMapClick(thisMap);
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

