import { observer } from 'mobx-react';
import React, { Component } from 'react';
import ActionSidebar from './ActionSidebar';
import POISidebar from './POISidebar';
import {tripstore} from './TripStore';




export default observer( class Overlay extends Component {

    defaultButtons = 
    [   {
        imgSrc : './newMarker.png',
        mode: 'editMarker'
        },
        {
        imgSrc : './pathEdit.png',
        mode: 'editPath'
        }
    ];

 render(){

    return (
    <div className = 'overlayContainer'>
        <POISidebar/>
        <ActionSidebar icons = {this.defaultButtons} active = {tripstore.activePOISidebar}>
            <div className = 'pBetaLogo' onClick= {this.handleLogoClick}>
                β
            </div>
        </ActionSidebar>
    </div>);
    
}
}
)

