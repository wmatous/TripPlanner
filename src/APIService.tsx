import {Trip} from './TripStore'
export default class APIService {

    // @ts-ignore
    public accessToken:string;

    public setAccessToken(newAccessToken:string){
        this.accessToken = newAccessToken;
    }    
    
    public fetchTrips(){
        return fetch(process.env.REACT_APP_API_BASE+'/trips/?format=json');
    }

    public saveTrip(trip:Trip){
        trip.LAYERS.forEach((el)=>delete el.ID);
        trip.MARKERS.forEach((el)=>delete el.ID);
        if (!this.accessToken){
            console.error('no access token');
        }
        if (trip.ID.length < 8){
            return fetch(process.env.REACT_APP_API_BASE+'/trips/',
            {
                headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer google-oauth2 '+this.accessToken
                },
                method: 'POST',
                body: JSON.stringify(trip)
            })
            .then(res => res.json())
            .catch((res)=> console.error(res));
        } else {
            return fetch(process.env.REACT_APP_API_BASE+'/trips/'+trip.ID+'/',
            {
                headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer google-oauth2 '+this.accessToken
                },
                method: "PUT",
                body: JSON.stringify(trip)
            })
            .then(res => res.json())
            .catch((res)=> console.error(res));
        }
    }

    public deleteTrip(trip:Trip){
        if (!this.accessToken){
            console.error('no access token');
        }
        return fetch(process.env.REACT_APP_API_BASE+'/trips/'+trip.ID+'/',
        {
            headers: {
            'Authorization': 'Bearer google-oauth2 '+this.accessToken
            },
            method: "DELETE",
        })
        .catch((res)=> {
            return res;
        });
    }
  
}
export const apiService = new APIService();