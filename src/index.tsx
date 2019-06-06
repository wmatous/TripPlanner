import * as dotenv from 'dotenv';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Map from './App';
import './index.css';
import Overlay from './Overlay.js';

dotenv.config();

if(window.location.pathname ==='/postlogin'){
    let param='';
    try{
        const hash = window.location.hash.split('&')[0];
        param += '?access_token='+hash.substring(hash.indexOf('=')+1);
    } catch (e){
        console.error('There was a problem logging in');
    } finally {
        window.location.replace('/'+param);
    }
}else {
    ReactDOM.render(<Map />, document.getElementById('map'));
    ReactDOM.render(<Overlay   />, document.getElementById('overlay-wrapper'));
}

