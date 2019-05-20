import {observer} from 'mobx-react';
import React, { Component } from 'react';
import './ActionSidebar.css';
import { tripstore } from './TripStore';

@observer
export default class EditModeButton extends Component<{imgSrc:string, mode:string /* props */}, {/* state*/ }>
{

    constructor(props:any) {
        super(props)
        this.setEditMode = this.setEditMode.bind(this)
    }

    public setEditMode(){
        tripstore.setEditMode(this.props.mode, !tripstore.editMode[this.props.mode]);
    }

    public render(){
        return (
        <img className = 'actionMarker'
            data-activemode = {tripstore.editMode[this.props.mode]}
            src = {this.props.imgSrc} 
            onClick = {this.setEditMode}/>
        );
    }
}