
import React, { Component } from 'react';
import posed from 'react-pose';
import './ActionSidebar.css';
import EditModeButton from './EditModeButton';

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

export default class ActionSidebar extends Component<{icons:[{imgSrc:string, mode:string}], active:boolean/*props*/}, {/* state*/ }>
{

    public buttons = this.props.icons.map((item:{imgSrc:string, mode:string})=>(
        <EditModeButton 
            imgSrc = {item.imgSrc}  
            mode = {item.mode} 
            key = {item.mode} />
    ));

    public handleLogoClick(){
        alert('Welcome to Project Beta');
    }

    public render(){
        return (
            <Sidebar 
            pose={!this.props.active ? 'enter' : 'exit'}
            className = 'actionBarWrapper' >
                {this.props.children}
                {this.buttons}
            </Sidebar>

        ); 

    }

}

