import {observer} from 'mobx-react';
import * as React from 'react';
import posed from 'react-pose';
import './POISidebar.css';
import { tripstore } from './TripStore';
import { AppUtilsInstance } from './AppUtils';


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
  /*
  public resizeIt() {
    const str = $('text-area').value;
    const cols = $('text-area').cols;

    let linecount = 0;
    $A(str.split("\n")).each( function(l) {
        linecount += Math.ceil( l.length / cols ); // Take into account long lines
    })
    $('text-area').rows = linecount + 1;
  };

   You could attach to keyUp, etc. if keydown doesn't work
  Event.observe('text-area', 'keydown', resizeIt );

  resizeIt(); //Initial on load
  
*/

  public handleChange = (event: { target: HTMLTextAreaElement })=> {
    const elementID = (event.target as HTMLTextAreaElement).dataset.fieldid;
    this.calculateRows((event.target as HTMLTextAreaElement));
    if (elementID){
      tripstore.setTripProperty(elementID, event.target.value); 
    }
   }

  public componentDidMount(){
    this.calculateRows(document.getElementById('trip-title') as HTMLTextAreaElement);
    this.calculateRows(document.getElementById('trip-desc') as HTMLTextAreaElement);
  }

  public saveTrip() {
    tripstore.saveActiveTrip();
  }

  public deleteTrip() {
    tripstore.deleteActiveTrip();
  }

  public listPayload(){
    for(const key of Object.keys(tripstore.payload)){
      console.log(tripstore.payload[key]);
      console.log(key);
    }
    AppUtilsInstance.listMarkers();
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
            <textarea
                  id = 'trip-title'
                    data-fieldid ='TITLE' 
                    value={tripToRender.TITLE}
                    onChange={this.handleChange}
                    />
          </div>
          <div className = 'trip-desc'> 
            <textarea 
                  id = 'trip-desc'
                    data-fieldid ='DESCRIPTION'
                    value={tripToRender.DESCRIPTION}
                    onChange={this.handleChange}
                    />
          </div>
          <button onClick={this.saveTrip} >Save</button>
          <button onClick={this.deleteTrip} >Delete</button>
          <button onClick={this.listPayload} > list </button>
        </div>
      </Modal>
      );

      
  };
  private calculateRows(el:HTMLTextAreaElement){
    if (!el) {return};
    const cols = el.cols;
    const value = el.value;
    let linecount = 0;
    value.split(/\r*\n/).forEach((l:string) => {
        linecount += l? Math.ceil( l.length / cols ):1; // Take into account long lines
    });
    el.rows = linecount;
  }
}





