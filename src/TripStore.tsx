import { action, observable } from "mobx";


export interface Trip {
    id?: string;
    latitude?: string;
    longitude?: string;
    title?: string;
    duration?: string;
    distance?: string;
    description?: string;
    forecasts?:[URL];
    attributes?: [URL];
  }

  export class TripStore {
    @observable
    public payload: Trip = {};
  
  
    @action
    public setPayload(input: Trip) {
      this.payload = input;
    }
  }
  
  export const tripstore = new TripStore();