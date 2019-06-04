import * as dotenv from 'dotenv';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {apiService} from './APIService'
import Map from './App';
import './index.css';
import Overlay from './Overlay.js';

dotenv.config();

if(window.location.pathname ==='/postlogin'){
    try{
        const hash = window.location.hash.split('&')[0];
        apiService.setAccessToken(hash.substring(hash.indexOf('=')+1));
    } catch (e){
        console.error('There was a problem logging in');
    } finally {
        window.location.replace('/');
    }
}else {
    ReactDOM.render(<Map />, document.getElementById('map'));
    ReactDOM.render(<Overlay   />, document.getElementById('overlay-wrapper'));
}

