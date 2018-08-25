import {observer} from 'mobx-react';
import React, { Component } from 'react';

import './App.css'; 
import { tripstore } from './TripStore';

// interface IPOIProps{
//     // map: Map
//     // info?: URL
// }

@observer
export default class POISidebar extends Component {

  // collectforecast(url){
  //   var JSON;
  //     // console.log(this.props.info.forecast);
  //     fetch(url)
  //       .then(function(response) {
  //         // console.log(response);
  //         return response.json();
  //       })
  //       .then(function(myJSON){
          
  //         JSON = myJSON;
  //         console.log(myJSON);
  //       })
  //       .catch(error => console.error(`Fetch Error =\n`, error));
  
  //       return JSON;
  //     }

//   constructor(props: IPOIProps) {
//     super(props);
//     this.state = {json: null};
//     console.log(Map.fixURL(this.props.info.toString()));
//     fetch(Map.fixURL(this.props.info))
//     .then((response) => {
//       // console.log(response);
//       return response.json();
//     })
//     .then((myJSON) =>{
      
//       this.setState({json : myJSON});
//     })
//     .catch(error => console.error(`Fetch Error =\n`, error));
//    console.log(this.state);
//   }
  

//   Icons(props) {
//     var nodes = [];
//     if(props.attributes){
//      props.attributes.forEach(function(attribute){
//         nodes.push(React.createElement("img",
//           {src : attributeicons[attribute], key: attribute, className : "activity-icon"}, null));
        
//      });
//     }
//     return React.createElement('div', {id: "attribute-icons"}, nodes);
//   }

  public render() {
      if (!tripstore.payload){
          return (<div/>)
      }
    // console.log(this.state);
    

    return (
      <div className='poi-overlay' id='poi-info' >
                  <div className = 'poi-inner' id = 'poi-info-inner'>
      
          <div className = 'trip-title'>
              <p id ='trip-title' >{tripstore.payload.active ? tripstore.payload.title : "Loading..."}</p>
          </div>
          <div className = 'trip-attributes'>
              Fucking Loading...
            {/* <this.Icons attributes = {this.state.json ? this.state.json.attributes : []}/> */}
          </div>
          <div className = 'trip-distance'>
              <p id = 'trip-distance'>{tripstore.payload.active ? tripstore.payload.distance : "Loading..."} Km</p>
          </div>
          <div className = 'trip-duration'>
              <p id = 'trip-duration'>{tripstore.payload.active ? tripstore.payload.duration : "Loading..."} days</p>
          </div>
          <div className = 'trip-forecast'>
              <p id = 'trip-forecast'> {tripstore.payload.active ? tripstore.payload.forecasts : "Loading..."}</p>
              
          </div>
        </div>
        </div>
      );
  }

}

{/* <p id = 'trip-forecast'>{this.state.forecast ? JSON.stringify(this.state.json.forecast) : "Loading"}</p> */}
