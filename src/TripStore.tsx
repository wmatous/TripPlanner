import { action, computed, observable } from "mobx";


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

interface LayerData {
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
}
export interface LayerSource {
  data: LayerData,
  id: string,
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
    public currentLayer :{trip:string, layer:string, source:string} | null = null;


    @observable
    public activePOISidebar: boolean = false;


    @observable
    public editMode: {editPath:boolean, editMarker:boolean} = 
      {
        editMarker: false,
        editPath:false
      };

    @computed get currentLayerSource():string {
      try{
        return this.payload[this.currentLayer!.trip].layers![this.currentLayer!.layer].layer.source!;
      } catch(e){
        return '';
      }
    }

    @computed get currentLayerSourceData():LayerData | null{
      try{
        return this.payload[this.currentLayer!.trip].layers![this.currentLayer!.layer].source.data!;
      } catch(e){
        return null;
      }
    }
    
    @action
    public resetEditMode(){
      this.editMode = {
        editMarker: false,
        editPath:false
      };
    }

    @action
    public setCurrentLayer(newLayer:{trip:string, layer:string, source:string} | null){
      if(newLayer){
        this.currentTripId = newLayer.trip;
      }
      this.currentLayer = newLayer;
    }

    @action
    public setCurrentSourceData(data:LayerData){
      try{
      this.payload[this.currentLayer!.trip].layers![this.currentLayer!.layer].source.data = data;
      } catch(e){
        console.error(e);
        console.error('problem updating source data');
      }
    }


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
    public updateTrip(newTrip:Trip){
      const existingTrip = this.payload[newTrip.id];
      this.payload[newTrip.id] = newTrip;
      this.setActiveTrip(newTrip.id);
      return existingTrip;
    }
    @action
    public deleteTrip(tripId:string){
      delete this.payload[tripId];
    }

    @action
    public clearPayload(){
      this.payload = {};
    }

  }
  export const tripstore = new TripStore();