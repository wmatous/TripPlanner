import { observer } from 'mobx-react';
import React, { Component } from 'react';
import ActionSidebar from './ActionSidebar';
import POISidebar from './POISidebar';
import {tripstore} from './TripStore';


@observer
export default class Overlay extends Component {

public render(){

    return (
    <div className = 'overlayContainer'>
        {tripstore.payload[tripstore.currentTripId] && tripstore.activePOISidebar? <POISidebar/> : <ActionSidebar/>}
    </div>);
    
}
}

