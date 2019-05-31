import { action, observable } from "mobx";
export default class APIService {

    @observable
    public loggingIn:boolean;

    // @ts-ignore
    public accessToken:string;

    @action
    public setAccessToken(accessToken:string){
        this.accessToken = accessToken;
        console.log(accessToken);
    }    
    @action 
    public setLoggingIn(newVal:boolean){
        this.loggingIn = newVal;
    }
    
}
export const apiService = new APIService();