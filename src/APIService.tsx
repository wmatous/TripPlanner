export default class APIService {

    // @ts-ignore
    public accessToken:string;

    public setAccessToken(accessToken:string){
        this.accessToken = accessToken;
    }    
    
    public fetchTrips(){
        return fetch('http://localhost:8000/trips/?format=json');

    }
  
}
export const apiService = new APIService();