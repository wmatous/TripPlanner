import { action, observable } from "mobx";


// tslint:disable-next-line:interface-name
export interface Trip {
    active?: boolean;
    url?: URL;
    id?: string;
    latitude?: number;
    longitude?: number;
    title?: string;
    duration?: string;
    distance?: string;
    description?: string;
    forecasts?:[URL];
    attributes?: [URL];
  }

  export default class TripStore {
    @observable
    public payload: Trip = {};
    @observable
    public currentTrip: URL;
  
  
    @action
    public setActiveTrip(input: URL) {
      if(input !== this.payload.url){
      this.currentTrip = input;
      this.updatePayload();
      }
    }
    public URLMap(input: string){
      return new URL(input);
    } 
    @action
    public updatePayload = async () => {
      this.payload.active = false;
      const response = await fetch(this.currentTrip.toString());
      const json = await response.json();
      if (json){
        this.payload.active = true;
        this.payload.url = new URL(json.url);
        this.payload.id = json.id;
        this.payload.latitude = json.latitude;
        this.payload.longitude = json.longitude;
        this.payload.title = json.title;
        this.payload.duration = json.duration;
        this.payload.distance = json.distance;
        this.payload.description = json.description;
        this.payload.forecasts = json.forecasts.map(this.URLMap);
        this.payload.attributes = json.attributes.map(this.URLMap);
      }
      }

      @action
      public clearPayload(){
        this.payload = {};
      }
      

    
  
  }
  export const tripstore = new TripStore();