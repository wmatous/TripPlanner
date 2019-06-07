import { action, computed, observable } from "mobx";
import {apiService} from './APIService';


// tslint:disable-next-line:interface-name
export interface Trip {
    ID:string,
    TITLE:string,
    DESCRIPTION:string,
    MARKERS:MarkerSource[];
    LAYERS:DBLayer[];
  }

export interface MarkerSource {
  CLS:string,
  EL:string,
  LAT:number,
  LONG:number,
  ID:string,
  ALT:number,
  TS:string
}

export interface DBLayer {
  ID:string,
  COLOUR:string,
  POINTS:LayerPoint[]
}

export interface LayerPoint {
  LAT:number,
  LONG:number,
  ALT:number,
  TS:string
}

export interface Layer {
  id: string,  
  type: string,
  layout: {[key:string]: string},
  paint: {[key:string]: any},
  source :{
    data: {
      features: [{
      geometry: {
        coordinates: Array<[
          number,
          number
        ]>
      ,
        type: string,
        },
      properties: {[key:string]: string},
      type: string,
      }],
      type: string,
    },
    id:string,
    type: string,
    }
  };


  export default class TripStore {
    @observable
    public payload: { [key:string]:Trip; } = {};

    @observable
    public currentTripId: string ='';

    @observable
    public currentLayer :{trip:string, layer:string} | null = null;


    @observable
    public activePOISidebar: boolean = false;


    @observable
    public editMode: {editPath:boolean, editMarker:boolean} = 
      {
        editMarker: false,
        editPath:false
      };

    /* @computed get currentLayerSource():string {
      try{
         this.payload[this.currentLayer!.trip].LAYERS.forEach(element => {
           
         });![this.currentLayer!.layer].layer.source!;
      } catch(e){
        return '';
      }
    }
    */
    

    @computed get currentLayerSourceData():LayerPoint[] | null {
      try{
        let data = null;
        this.payload[this.currentLayer!.trip].LAYERS.forEach((layer:DBLayer) =>{
          if (layer.ID === this.currentLayer!.layer){
            data = layer.POINTS;
          }
        });
         return data;
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
    public setCurrentLayer(newLayer:{trip:string, layer:string} | null){
      if(newLayer){
        this.currentTripId = newLayer.trip;
      }
      this.currentLayer = newLayer;
    }

    @action
    public setCurrentSourceData(data:LayerPoint[]){
      try{
        this.payload[this.currentLayer!.trip].LAYERS.forEach((layer:DBLayer) =>{
          if (layer.ID === this.currentLayer!.layer){
            layer.POINTS = data;
          }
        });
      } catch(e){
        console.error(e);
        console.error('problem updating source data');
      }
    }


    @action
    public fetchData(){
      try{
        return apiService.fetchTrips()
              .then((response) => 
                response.json())
              .then((data) => {
                this.payload = data;
                return data;
              })
            .catch(error => console.error(`Fetch Error =\n`, error));
            } catch (err){
              console.error(err);
          }
      return new Promise((reject) => reject());
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
      if (property === 'LAT' || property === 'LONG' ){
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

    @action
    public updateTrip(newTrip:Trip){
      const existingTrip = this.payload[newTrip.ID];
      this.payload[newTrip.ID] = newTrip;
      this.setActiveTrip(newTrip.ID);
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

    public saveActiveTrip(){
      apiService.saveTrip(this.payload[this.currentTripId]);
    }
   
}
  export const tripstore = new TripStore();