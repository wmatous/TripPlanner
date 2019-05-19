import {observer} from 'mobx-react';

import React, { Component } from 'react';
import posed from 'react-pose';
import './ActionSidebar.css';
import EditModeButton from './EditModeButton';
import { tripstore } from './TripStore';

const Sidebar = posed.div({
    enter: {
      opacity: 1,
      transition: { duration: 600 }
    },
    exit: {
      opacity: 0,
      transition: { duration: 600 }
    }
  });

@observer
export default class ActionSidebar extends Component<{/*props*/}, {/* state*/ }>
{
    public handleLogoClick(){
        alert('Welcome to Project Beta');
    }

    public render(){
        return (
            <Sidebar 
            pose={!tripstore.activePOISidebar ? 'enter' : 'exit'}
            className = 'actionBarWrapper' >
                <div className = 'pBetaLogo' onClick= {this.handleLogoClick}>
                    β
                </div>
                <EditModeButton 
                    imgSrc = './newMarker.png' 
                    activeMode = {tripstore.editMode.editMarker} 
                    mode= 'editMarker' />
                <EditModeButton 
                    imgSrc = './pathEdit.png' 
                    activeMode = {tripstore.editMode.editPath} 
                    mode= 'editPath' />
            </Sidebar>

        ); 

    }

}

