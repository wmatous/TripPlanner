import * as dotenv from 'dotenv';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Map from './App';
import './index.css';
import Overlay from './Overlay.js';
import { apiService } from './APIService';

dotenv.config();

if(window.location.pathname ==='/postlogin'){
    try{
        const hash = window.location.hash.split('&')[0];
        apiService.accessToken =hash.substring(hash.indexOf('=')+1);
        console.log(apiService.accessToken);
    } catch (e){
        console.error('There was a problem logging in');
    } finally {
        if (history.pushState) {
            window.history.pushState({path:window.location.origin},'',window.location.origin);
        }
    }
}

ReactDOM.render(<Map />, document.getElementById('map'));
ReactDOM.render(<Overlay />, document.getElementById('overlay-wrapper'));


