import * as mapboxgl  from 'mapbox-gl';
import {tripstore, DBLayer, Trip} from './TripStore';



import { MarkerSource, LayerPoint} from './TripStore';
import {apiService} from './APIService';


export default class AppUtils {


public static handleFileDrop(e:any, thisMap: mapboxgl.Map){
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
        const points:LayerPoint[] = [];
        for(const field of Object.keys(trkpts)){
          const children = trkpts[field].children;
          let ele=0;
          let time= '';
          try{
            for (const item of children){
              if(item.tagName === 'ele'){
                ele = Number(item.textContent);
              } else if (item.tagName === 'time'){
                time = item.textContent;
              } 
            }
          } catch (e){
            console.error(e);
          }
          points.push(
            {
              LONG:Number(trkpts[field].getAttribute('lon')),
              LAT:Number(trkpts[field].getAttribute('lat')),
              ALT:ele,
              TS:time
            });
        }

        const tripId =  Math.random().toString(36).substring(7);
        const layerId = tripId +  Math.random().toString(36).substring(7);
        const newLayer = {
          ID:layerId,
          COLOUR: '33C9EB',
          POINTS: points
        };

          const markerList:MarkerSource[] = [];
          const layerList:DBLayer[] = [newLayer];
          const newTrip = {
            ID: tripId,
            TITLE:'test',
            DESCRIPTION:'test',
            LAYERS: layerList,
            MARKERS: markerList
          };
          tripstore.updateTrip(newTrip);
          tripstore.setCurrentLayer({trip:tripId, layer:layerId});
      };
      reader.readAsText(files[0]);
    }

    public static handleMapClick(event:any, thisMap: mapboxgl.Map) {

        if (tripstore.editMode.editMarker){
          const newMarkerId = Math.random().toString(36).substring(7);
          const newMarkers:MarkerSource[] = [];
          const layers:DBLayer[] = [];
          const newMarker: MarkerSource= { ALT:0,
            TS: new Date(Date.now()).toISOString(),
            CLS: 'marker',
            EL: 'div',
            LAT: event.lngLat.lat,
            LONG: event.lngLat.lng,
            ID: newMarkerId
          };
          newMarkers.push(newMarker); 
          
          const newTrip:Trip = {
            DESCRIPTION: 'test',
            TITLE: 'test',
            ID: Math.random().toString(36).substring(7),
            MARKERS: newMarkers,
            LAYERS: layers,
            };
          tripstore.setEditMode('editMarker', false);
          this.addMarker(thisMap, newMarker, newTrip.ID);
          tripstore.updateTrip(newTrip);
          tripstore.setSidebar(true);
          thisMap.flyTo({center: event.lngLat});
          return;
        }
        else if (tripstore.editMode.editPath){
          if (tripstore.currentLayer){
          
          let currentLayerSourceData = tripstore.currentLayerSourceData;
          if (!currentLayerSourceData){
            currentLayerSourceData = [] as LayerPoint[];
          }
          currentLayerSourceData.push({
            LONG: event.lngLat.lng,
            LAT: event.lngLat.lat,
            ALT: 0,
            TS: new Date(Date.now()).toISOString()
          });
          tripstore.setCurrentSourceData(currentLayerSourceData);
          AppUtils.updateLayer(thisMap, tripstore.currentLayer);
          thisMap.panTo(event.lngLat);
  
          } else{
  
          const newLayerId = Math.random().toString(36).substring(7);
          const newTripId = Math.random().toString(36).substring(7);
          const newMarkers:MarkerSource[] = [];
          const newLayers:DBLayer[] = [];
          const newLayer: DBLayer= { 
            POINTS:
              [{
                ALT:0,
                TS: new Date(Date.now()).toISOString(),
                LAT: event.lngLat.lat,
                LONG: event.lngLat.lng
              }],
            COLOUR: "33C9EB",
            ID: newLayerId
          };
          newLayers.push(newLayer);
  
          const newLayerTrip:Trip = {
            DESCRIPTION: 'test',
            TITLE: 'test',
            ID: newTripId,
            MARKERS: newMarkers,
            LAYERS: newLayers,
            };
          
          tripstore.updateTrip(newLayerTrip);
          tripstore.setCurrentLayer({trip:newTripId, layer:newLayerId})
          AppUtils.updateLayer(thisMap, {trip:newTripId, layer:newLayerId});
          tripstore.setSidebar(true);
          thisMap.flyTo({center: event.lngLat});
          }
          return;
        }
        AppUtils.handleNormalMapClick(thisMap);
  }

  public static handleNormalMapClick (thisMap: mapboxgl.Map) {
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

  public static addMarker(thisMap:mapboxgl.Map, marker : MarkerSource, key:string){
    // make a marker for each feature and add to the map
    if (marker.LAT && marker.LONG){
      const el = document.createElement(marker.EL || 'div');
        el.className = (marker.CLS || 'marker');
        el.addEventListener('click',  ()=> {
            tripstore.setActiveTrip(key);
            tripstore.setSidebar(true);
            thisMap.flyTo({center:new mapboxgl.LngLat(marker.LONG,marker.LAT)
            });
          });
              
      new mapboxgl.Marker(el)
      .setLngLat([marker.LONG, marker.LAT])
      .addTo(thisMap);
    }
}

public static updateLayer(thisMap:mapboxgl.Map, toUpdate:{trip:string, layer:string}){
    const source = thisMap.getSource(toUpdate.layer);
    const trip = tripstore.payload[toUpdate.trip];
    console.log(source, trip);

    let updatedLayer;
    trip.LAYERS.forEach(dbLayer => {
        if (dbLayer.ID ===toUpdate.layer){
            updatedLayer= apiService.dbToLayer(dbLayer);
            if (source){
                // @ts-ignore
                source.setData(updatedLayer.source.data);
            } else{
                // @ts-ignore
                thisMap.addSource(updatedLayer.layer.id, updatedLayer.source);
                thisMap.addLayer(updatedLayer.layer);
            }
            return;
        }
    });
}

}