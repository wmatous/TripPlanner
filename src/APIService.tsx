import {Trip} from './TripStore'
export default class APIService {

    // @ts-ignore
    public accessToken:string;

    public setAccessToken(newAccessToken:string){
        this.accessToken = newAccessToken;
    }    
    
    public fetchTrips(){
        return fetch('http://localhost:8000/trips/?format=json');
    }

    public saveTrip(trip:Trip){
        if (!this.accessToken){
            console.error('no access token');
        }
        fetch("http://localhost:8000/trips/",
        {
            headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer google-oauth2 '+this.accessToken
            },
            method: "POST",
            body: JSON.stringify(trip)
        })
        .then((res)=> console.log(res))
        .catch((res)=> console.log(res));
    }
  
}
export const apiService = new APIService();