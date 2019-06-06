import {observer} from 'mobx-react';
import * as React from 'react';
import posed from 'react-pose';
import './POISidebar.css';
import { tripstore } from './TripStore';


export const Modal = posed.div({
  enter: {
    opacity: 1,
    transition: { duration: 600 },
    x: 0,
  },
  exit: {
    opacity: 0,
    transition: { duration: 600 },
    x: -100,
  }
});


@observer
export default class POISidebar extends React.Component<{}, {}>
{

  public editField(event: React.MouseEvent<HTMLElement>) {
    console.log((event.target as Element).id);
  }

  public handleChange(event: { target: HTMLInputElement; }) {
    const elementID = (event.target as HTMLElement).dataset.fieldid;
    if (elementID){
      tripstore.setTripProperty(elementID, event.target.value); 
    }
   }
  public saveTrip() {
    tripstore.saveActiveTrip();
  }

   public render(){
     const tripToRender = tripstore.payload[tripstore.currentTripId];
     if (!tripToRender){
       return (<div/>);
     }
    return (
      <Modal 
        className='poi-overlay' id='poi-info'>
        <div className = 'poi-inner' id = 'poi-info-inner'>
          <div className = 'trip-title'> 
            <input type ='text' 
                  id = 'trip-title'
                    data-fieldid ='TITLE' 
                    value = { tripToRender.TITLE } 
                    onChange={this.handleChange}
                    />
          </div>
          <div className = 'trip-desc'> 
            <input type ='text' 
                  id = 'trip-desc'
                    data-fieldid ='DESCRIPTION' 
                    value = { tripToRender.DESCRIPTION } 
                    onChange={this.handleChange}
                    />
          </div>
          <button onClick={this.saveTrip} >Save</button>
        </div>
      </Modal>
      );
  };
}





