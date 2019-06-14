
import * as React from 'react';
import posed from 'react-pose';
import ActionButton from './ActionButton';
import './ActionSidebar.css';


export const Sidebar = posed.div({
    enter: {
      opacity: 1,
      top:0,
      transition: { duration: 600 }
    },
    exit: {
      opacity: 0,
      top:0,
      transition: { duration: 600 }
    }
  });

export default class ActionSidebar extends React.Component<{icons:[{imgSrc:string, mode:string, action:(arg0:any)=> null}], /*props*/}, {/* state*/ }>
{

    public buttons = this.props.icons.map((item:{imgSrc:string, mode:string, action:(arg0:any)=>null})=>(
        <ActionButton 
            action={item.action}
            imgSrc = {item.imgSrc}  
            mode = {item.mode}
            key = {item.mode} />
    ));

    public handleLogoClick(){
        alert('Welcome to Project Beta');
    }

    public render(){
        return (
            <div>
                <div 
            className = 'actionBarWrapper' >
                {this.props.children}
                {this.buttons}
            </div>
            <div className = 'loginPromptModal'>
                this is the login modal
            </div>
            </div>

        ); 

    }

}

