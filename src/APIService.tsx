import {MarkerSource, Layer, DBLayer, LayerPoint} from './TripStore'
export default class APIService {

    // @ts-ignore
    public accessToken:string;

    public setAccessToken(accessToken:string){
        this.accessToken = accessToken;
    }    
    
    public fetchTrips(){
        return fetch('http://localhost:8000/trips/?format=json');

    }
    public dbToTrip(element:{[key:string]:any}){
        const newTrip = {
          description: element.DESCRIPTION,
          id: element.ID,
          layers: {},
          markers: {},
          title: element.TITLE
        };
        element.MARKERS.forEach((marker:MarkerSource) => {
            newTrip.markers[marker.ID] = marker;
        });
        element.LAYERS.map((ly:any) => apiService.dbToLayer(ly)).forEach((layer:Layer) => {
          console.log(layer);
          newTrip.markers[layer.id] = layer;
      });
        return newTrip; 
    }
  
    public dbToLayer(dbLayer:DBLayer):Layer {
        return ({
            id: dbLayer.ID,  
            type: "line",
            layout: {
                "line-cap": "round",
              "line-join": "round"
              },
            paint: {
                'line-color': ['get', 'color'],
                "line-width": 8
              },
            source :{
              data: {
                features: [{
                geometry: {
                  coordinates: (dbLayer.POINTS.map((el:LayerPoint)=> [el.LAT, el.LONG]) as [[number, number]]),
                  type: 'LineString',
                  },
                properties: {'color': '#33C9EB'},
                type: "Feature",
                }],
                type: "FeatureCollection",
              },
              id: dbLayer.ID,
              type: "geojson"
              }
            });
    }
}
export const apiService = new APIService();