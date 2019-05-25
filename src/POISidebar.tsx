import {observer} from 'mobx-react';
import React, { Component } from 'react';
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
export default class POISidebar extends Component<{}, {}>
{

  public editField(event: React.MouseEvent<HTMLElement>) {
    console.log((event.target as Element).id);
  }

  public handleChange(event: { target: HTMLInputElement; }) {
    const elementID = (event.target as HTMLElement).dataset.fieldid;
    const suffix = (event.target as HTMLElement).dataset.suffix;
    if (elementID){
      let newVal = event.target.value;
      if (suffix){
        newVal = newVal.substring(0, newVal.length-suffix.length);
      }
      tripstore.setTripProperty(elementID, newVal); 
    }
   }

   public render(){
     let tripToRender = tripstore.payload[tripstore.currentTripId];
     if (!tripToRender){
       tripToRender = {id:''};
     }
    return (
      <Modal 
        className='poi-overlay' id='poi-info'>
        <div className = 'poi-inner' id = 'poi-info-inner'>
          <div className = 'trip-title'> 
          <input type ='text' 
                id = 'trip-title'
                  data-fieldid ='title' 
                  value = { tripToRender.title } 
                  onChange={this.handleChange}
                   />
          </div>
          <div className = 'trip-attributes'>
              Loading...
            {/* <this.Icons attributes = {this.state.json ? this.state.json.attributes : []}/> */}
          </div>
          <div className = 'trip-distance'>
            <input type ='text' 
                id = 'trip-distance'
                  data-fieldid ='distance' 
                  data-suffix = ' Km'
                  value = { tripToRender.distance + ' Km'} 
                  onChange={this.handleChange}
                   />
          </div>
          <div className = 'trip-duration'>
              <p id = 'trip-duration'>{tripToRender.active ? tripToRender.duration : "Loading..."} days</p>
              <input type ='text' 
                id = 'trip-duration'
                  data-fieldid ='duration' 
                  value = { tripToRender.duration } 
                  onChange={this.handleChange}/> 
                  <span> days</span>
          </div>
          <div className = 'trip-forecast'>
            <span>
              <p id = 'trip-forecast'> {tripToRender.active ? tripToRender.forecasts : "Loading..."}</p>
              </span>
            <span>
                <button onClick = {this.editField} id ='forecast-edit'>edit</button>
            </span>
              
          </div>
        </div>
        {/* <p id = 'trip-forecast'>{this.state.forecast ? JSON.stringify(this.state.json.forecast) : "Loading"}</p> */}
        </Modal>
        
      );
  };
}





