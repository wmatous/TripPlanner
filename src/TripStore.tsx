import { action, observable } from "mobx";


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
    markers?:{[key:string]:MarkerSource};
    layers?:{[key:string]: {source:LayerSource, layer:Layer}};
  }

export interface MarkerSource {
  className:string,
  element:string,
  markerId:string,
  long:number,
  lat:number
}

export interface Layer {
  id: string,  
  type: string,
  layout: {[key:string]: string},
  paint: {[key:string]: any},
  source? :string
  };

export interface LayerSource {
  data: {
    features: [{
    geometry: {
      coordinates: [[
        number,
        number
      ]
    ],
      type: string,
      },
    properties: {[key:string]: string},
    type: string,
    }],
    type: string,
  },
  generateId: boolean,
  type: string,
  };

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
    public currentTripId: string = 'testId';

    @observable
    public activePOISidebar: boolean = false;


    @observable
    public editMode: {editPath:boolean, editMarker:boolean} = 
      {
        editMarker: false,
        editPath:false
      };


    @action
    public fetchData(){
      return new Promise((resolve)=>{
        setTimeout(() => resolve("payload ready"), 2000);
      })
    }

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
    }
  
  
    @action
    public setActiveTrip(input: string):boolean {
      if(this.payload[input]){
        const prev = this.currentTripId === input;
        this.currentTripId = input;
        this.setSidebar(true);
        return prev;
      }
      return false;
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
    public clearPayload(){
      this.payload = {};
    }

  }
  export const tripstore = new TripStore();