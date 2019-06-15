import {observer} from 'mobx-react';
import * as React from 'react';
import posed from 'react-pose';
import './POISidebar.css';
import {tripstore} from './TripStore';
import {AppUtilsInstance, cssColors} from './AppUtils';
import {apiService} from './APIService';


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
  public handleChange = (event: { target: HTMLTextAreaElement })=> {
    const elementID = (event.target as HTMLTextAreaElement).dataset.fieldid;
    this.calculateRows(event.target as HTMLTextAreaElement);
    if (elementID){
      tripstore.setTripProperty(elementID, event.target.value); 
    }
   }

  public componentDidMount(){
    this.calculateRows(document.getElementById('trip-title') as HTMLTextAreaElement);
    this.calculateRows(document.getElementById('trip-desc') as HTMLTextAreaElement);
  }

  public componentDidUpdate(){
    this.calculateRows(document.getElementById('trip-title') as HTMLTextAreaElement);
    this.calculateRows(document.getElementById('trip-desc') as HTMLTextAreaElement);
  }

  public saveTrip() {
    tripstore.saveActiveTrip();
  }

  public deleteTrip() {
    tripstore.deleteActiveTrip();
  }

  public togglePublic(){
    tripstore.setTripProperty('PUBLIC', !(tripstore.currentTripData!.PUBLIC));
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
     const btnParams = apiService.accessToken? {
      saveStyle: {background:cssColors.posMute, color:cssColors.pos} as React.CSSProperties,
      saveAction:this.saveTrip,
      delStyle: {background:cssColors.negMute, color: cssColors.neg} as React.CSSProperties,
      delAction: this.deleteTrip
     }:{
      saveStyle: {background:cssColors.highMute, color:cssColors.lowMute} as React.CSSProperties,
      delStyle: {background:cssColors.highMute, color: cssColors.lowMute} as React.CSSProperties
     };

    return (<Modal 
      className='poi-overlay'>
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
        </div>
        <div className = 'tripActions'>
          <div>
          <button className= 'buttonStyle' 
            onClick={this.togglePublic} 
            style ={{color: tripToRender.PUBLIC? cssColors.pos:'#a0a0a0' } as React.CSSProperties}>
              {tripToRender.PUBLIC? 'Public' : 'Private'}
              </button>
          </div>
            <button className= 'buttonStyle' 
            onClick={btnParams.saveAction} 
            style ={btnParams.saveStyle}>
              Save
              </button>
            <button className= 'buttonStyle' 
            onClick={btnParams.delAction} 
            style ={btnParams.delStyle}
            >
              Delete
            </button>
        </div>
    </Modal>);

      
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





