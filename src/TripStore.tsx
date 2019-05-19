import { action, observable } from "mobx";
// import { string } from "prop-types";


// tslint:disable-next-line:interface-name
export interface Trip {
    active?: boolean;
    url?: URL;
    id: string;
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
    public payload: { [key:string]:Trip; } = { 'testId': {
    description: 'brisk hike',
    distance: '25.1',
    duration: '10:30:00',
    id : 'testId',
    latitude: 49.975046,
    longitude: -123.043000,
    title: 'Black Tusk',
    
     }
    };

    @observable
    public currentTripId: string;

    @observable
    public currentTrip: Trip = {
      active : true,
      description: 'brisk hike',
      distance: '25.1',
      duration: '10:30:00',
      id : 'testId',
      latitude: 49.975046,
      longitude: -123.043000,
      title: 'Black Tusk'
      };

    @observable
    public activePOISidebar: boolean = false;


    @observable
    public editMode: {editPath:boolean, editMarker:boolean} = 
      {
        editMarker: false,
        editPath:false
      };

    @action
    public setEditMode(mode:string, active:boolean){

      Object.keys(this.editMode).map(key => {
        if(key === mode){
          this.editMode[key] = active;
        } else {
          this.editMode[key] = false;
        }
      });
    }

    @action
    public setSidebar(input: boolean){
      this.activePOISidebar = input;
    }

    @action
    public setTripProperty(property:string, newVal:any){
      if (property === 'active'){
        newVal = newVal === 'true' ? true : false;
      } else if (property === 'latitude' || property === 'longitude' ){
        newVal = Number(newVal);
      }
      this.payload[this.currentTripId][property] = newVal;
      console.log(this.payload[this.currentTripId]);
    }
  
  
    @action
    public setActiveTrip(input: string) {
      if(this.payload[input]){
        this.currentTripId = input;
        this.setSidebar(true);
        console.log(JSON.stringify(this.payload[this.currentTripId]));
        console.log(this.currentTripId);
      }
    }
  
    public URLMap(input: string){
      return new URL(input);
    } 

    public submitTrip(id:string){
      // const tripToSubmit = this.payload[id];
      fetch("/trips",
      {
        body : JSON.stringify({
          description: 'brisk hike',
          distance: '25.1',
          duration: '10:30:00',
          id : 'testId',
          latitude: 49.975046,
          longitude: -123.043000,
          title: 'Black Tusk',
          
           }),
        method : "POST"
          
      })
      .then((res:any) =>  res.json() )
      .then((data:any) => { alert( JSON.stringify( data ) ) })
    }

    @action
    public addTrip(newTrip:Trip){
      this.payload[newTrip.id] = newTrip;
      this.setActiveTrip(newTrip.id);
    }

    @action
    public updateCurrentTrip(){
      this.currentTrip = this.payload[this.currentTripId];


    
    /*async () => {
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
      */
    }

      @action
      public clearPayload(){
        this.payload = {};
      }
      

    
  
  }
  export const tripstore = new TripStore();