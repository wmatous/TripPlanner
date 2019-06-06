import {DBLayer, LayerPoint} from './TripStore'
export default class APIService {

    // @ts-ignore
    public accessToken:string;

    public setAccessToken(accessToken:string){
        this.accessToken = accessToken;
    }    
    
    public fetchTrips(){
        return fetch('http://localhost:8000/trips/?format=json');

    }
  
    public dbToLayer(dbLayer:DBLayer):{[key:string]:any} {
        return ({layer:{
            id: dbLayer.ID,  
            type: "line",
            layout: {
                "line-cap": "round",
              "line-join": "round"
              },
            paint: {
                'line-color': '#33C9EB',
                "line-width": 8
              },
            source:dbLayer.ID
            },
            source:{
              data: {
                features: [{
                geometry: {
                  coordinates: (dbLayer.POINTS.map((el:LayerPoint)=> [el.LAT, el.LONG]) as [[number, number]]),
                  type: 'LineString',
                  },
                type: "Feature",
                }],
                type: "FeatureCollection",
              },
              type: "geojson"
              }
            });
    }
}
export const apiService = new APIService();