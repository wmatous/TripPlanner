import { observer } from 'mobx-react';
import React, { Component } from 'react';
import ActionSidebar from './ActionSidebar';
import POISidebar from './POISidebar';
import {tripstore} from './TripStore';




export default observer( class Overlay extends Component {

 render(){

    return (
    <div className = 'overlayContainer'>
        <POISidebar/>
        <ActionSidebar/>
    </div>);
    
}
}
)

