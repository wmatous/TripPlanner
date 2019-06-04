import {MarkerSource, Layer, LayerSource} from './TripStore'
export default class APIService {

    // @ts-ignore
    public accessToken:string;

    public setAccessToken(accessToken:string){
        this.accessToken = accessToken;
        console.log(accessToken);
    }    
    
    public fetchTrips(){
        return fetch('http://localhost:8000/trips/?format=json');
    }
    public dbToTrip(element:{[key:string]:any}){
        console.log(element);
        const newTrip = {
          description: element.DESCRIPTION,
          id: element.ID,
          layers: {},
          markers: {},
          title: element.TITLE
        };
        element.MARKERS.map((mk:any)=> apiService.dbToMarker(mk)).forEach((marker:MarkerSource) => {
          console.log(marker);
            newTrip.markers[marker.markerId] = marker;
        });
        element.LAYERS.map((ly:any)=> apiService.dbToLayer(ly)).forEach((layer:Layer) => {
          console.log(layer);
          newTrip.markers[layer.id] = layer;
      });
        return newTrip; 
      }

    public dbToMarker(dbMarker:{[key:string]:any}){
        return {
          className: dbMarker.CLS,
          element: dbMarker.EL,
          lat: dbMarker.LAT,
          long: dbMarker.LONG,
          markerId: dbMarker.ID
        };
      }

    public markerToDB(marker:MarkerSource){
        return {
            CLS:marker.className,
            EL:marker.element,
            LAT:marker.lat,
            LONG:marker.long,
            ID:marker.markerId,
            ALT:0
        }
    }
  
    public dbToLayer(dbLayer:{[key:string]:any}){
        return ({layer:{
          "id": dbLayer.ID,
          "layout": {
            "line-cap": "round",
          "line-join": "round"
          },
          "paint": {
            'line-color': ['get', 'color'],
            "line-width": 8
          },
          "source": dbLayer.ID,
            "type": "line"              
        },
      source:{
        "data": {
          'features': [{
          "geometry": {
            "coordinates": dbLayer.POINTS.map((point:{LAT:number, LONG:number})=>[point.LAT, point.LONG]),
            "type": "LineString",
            },
          "properties": {'color': '#'+dbLayer.COLOUR+''},
          "type": "Feature",
          }],
          'type': 'FeatureCollection',
        },
        "type": "geojson",
        }
      });
    }
    public layerToDB(item:{layer:Layer, source:LayerSource}){
        return ({
            
        });
    }
}
export const apiService = new APIService();