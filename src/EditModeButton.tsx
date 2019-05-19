import React, { Component } from 'react';
import './ActionSidebar.css';
import { tripstore } from './TripStore';

export default class EditModeButton extends Component<{imgSrc:string, activeMode:boolean, mode:string /* props */}, {/* state*/ }>
{

    constructor(props:any) {
        super(props)
        this.setEditMode = this.setEditMode.bind(this)
    }

    public setEditMode(){
        tripstore.setEditMode(this.props.mode, !this.props.activeMode);
    }

    public render(){
        return (
        <img className = 'actionMarker'
            data-activemode = {JSON.stringify(this.props.activeMode)}
            src = {this.props.imgSrc} 
            onClick = {this.setEditMode}/>
        );
    }
}