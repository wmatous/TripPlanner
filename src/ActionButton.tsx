import {observer} from 'mobx-react';
import React, { Component } from 'react';
import './ActionSidebar.css';
import { tripstore } from './TripStore';

@observer
export default class ActionButton extends Component<{imgSrc:string, mode:string, action:(arg0:any)=> null /* props */}, {/* state*/ }>
{

    public render(){
        return (
        <img className = 'actionMarker'
            data-activemode = {tripstore.editMode[this.props.mode]}
            data-mode = {this.props.mode}
            src = {this.props.imgSrc} 
            onClick = {this.props.action}/>
        );
    }
}