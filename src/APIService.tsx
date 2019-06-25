import { action, computed, observable } from "mobx";
import {Trip} from './TripStore'
export default class APIService {

    @observable
    // @ts-ignore
    public accessToken:string;

    @observable
    public userDetails:{
        imageUrl:string,
        fName:string,
        lName:string};

    @computed
    public get imageUrl():string{
        if (this.userDetails){
            return this.userDetails.imageUrl;
        }
        return '';
    }
    @action
    public setUserDetails(){
        if (apiService.accessToken){
            fetch('https://www.googleapis.com/plus/v1/people/me?access_token='+apiService.accessToken)
            .then(res=>res.json())
            .then(data=> {
                this.userDetails= {
                    lName:data.name.familyName,
                    fName:data.name.givenName,
                    imageUrl:data.image.url
                }
            })
            // tslint:disable-next-line:no-console
            .catch(res=>console.error(res));
        }
    }

    @action
    public setAccessToken(newAccessToken:string){
        this.accessToken = newAccessToken;
        this.setUserDetails();
    }    
    
    public fetchTrips(){
        let requestInit;
        if (this.accessToken){
            requestInit= {
                headers:{'Authorization': 'Bearer google-oauth2 '+this.accessToken}
                };
        }
        return fetch(process.env.REACT_APP_API_BASE+'/trips/?format=json', requestInit);
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