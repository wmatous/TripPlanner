import { observer } from 'mobx-react';
import React, { Component } from 'react';
import posed, { PoseGroup } from 'react-pose';
import ActionSidebar, {Sidebar} from './ActionSidebar';
import POISidebar, {Modal} from './POISidebar';
import {tripstore} from './TripStore';



export default observer( class Overlay extends Component {
    setEditMode = (event)=>{
        try{
            var mode = event.target.dataset.mode;
            tripstore.setEditMode(mode, !tripstore.editMode[mode])
        }catch (e){
            // tslint:disable-next-line:no-console
            console.error(e);
        }
    }
        
    defaultButtons = 
    [   {
        action: this.setEditMode,
        imgSrc : './newMarker.png',
        mode: 'editMarker',
        },
        {
        action: this.setEditMode,
        imgSrc : './pathEdit.png',
        mode: 'editPath'
        }
    ];

    endPathEdit = (event)=>{
        try{
            var confirm = 'confirm' === event.target.dataset.mode;
            tripstore.resetEditMode();
            if (confirm){
                // tripstore.updateTrip();
            }
        }catch (e){
            // tslint:disable-next-line:no-console
            console.error(e);
        }
    }
    confirmationButtons = 
    [   {
        action: this.setEditMode,
        imgSrc : './checked.png',
        mode: 'confirm',
        },
        {
        action: this.setEditMode,
        imgSrc : './delete.png',
        mode: 'reject'
        }
    ];

      

 render(){

    return (
    <div className = 'overlayContainer'>
        <PoseGroup >
            
            {!tripstore.activePOISidebar && [
                <Sidebar key='action'>
                    <ActionSidebar  icons = {this.defaultButtons}>
                        <div className = 'pBetaLogo' onClick= {this.handleLogoClick}>
                            β
                        </div>
                    </ActionSidebar>
                    <ActionSidebar  icons = {this.defaultButtons}/>
                </Sidebar>
                ]}
                {tripstore.activePOISidebar && [
                <Modal key ='poi'>
                    <POISidebar />
                </Modal>]} 
        </PoseGroup>

    </div>);
    
}
}
)

