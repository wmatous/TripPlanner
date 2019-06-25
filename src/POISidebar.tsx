import {observer} from 'mobx-react';
import * as React from 'react';
import posed from 'react-pose';
import './POISidebar.css';
import {tripstore} from './TripStore';
import {AppUtilsInstance, cssColors} from './AppUtils';
import {apiService} from './APIService';

// doesnt change when window resized unless refresh
export const Modal = posed.div({
  enter: {
    opacity: 1,
    transition: { duration: window.orientation? 600 : 0 },
    x: 0,
  },
  exit: {
    opacity: 0,
    transition: { duration: window.orientation? 600 : 0 },
    x: -100,
  }
});


@observer
export default class POISidebar extends React.Component<{}, {height:number|null, buttonPosition:string}>
{

  private  active:boolean = false;
  private  offsetY:number;
  private  initialY:number;
  private initialRenderY:number;

  constructor(props:any){
    super(props);
    const winHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    this.state = { 
      height:
      window.orientation? null : (0.4 * winHeight),
      buttonPosition: 'static'};
  }
  

  public dragStart = (e:any)=>{
    console.log(e);
    e.preventDefault();
    
    if (e.type === "touchstart") {
      this.initialY = e.touches[0].clientY;
    } else {
      this.initialY = e.clientY;
    }
    this.active = true;
    this.initialRenderY = this.state.height!;
  }

  public dragEnd = (e:any)=> {
    console.log(e);
    e.preventDefault();
    this.active = false;
  }

  public drag = (e:any)=> {
    console.log(e);
    e.preventDefault();
    if (this.active) {
    
      if (e.type === "touchmove") {
        this.offsetY = e.touches[0].clientY - this.initialY;
      } else {
        this.offsetY = e.clientY - this.initialY;
      }
      if (this.state.height){
        this.setState({height:this.initialRenderY - this.offsetY});
      }
    }
  }

  public setButtonPosition(){
    // use refs
    const innerDetails = document.getElementById('poi-info-inner');
    const tripActions = document.getElementById('tripActions');
    if (innerDetails && tripActions){
      const innerDetailBox = innerDetails.getBoundingClientRect();
      const actionBox = tripActions.getBoundingClientRect();
      if (innerDetailBox.bottom >= actionBox.top){
        this.setState({buttonPosition: 'static'});
      } else if(actionBox.bottom < window.innerHeight-28){
        if (this.state.buttonPosition !== 'absolute'){
          this.setState({buttonPosition: 'absolute'});
        }
      }
    }
  }

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
    this.setButtonPosition();
  }

  public componentDidUpdate(){
    this.calculateRows(document.getElementById('trip-title') as HTMLTextAreaElement);
    this.calculateRows(document.getElementById('trip-desc') as HTMLTextAreaElement);
    this.setButtonPosition();
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
      className='poi-overlay' style={{height:this.state.height}as React.CSSProperties}
      onMouseDown={this.dragStart}
      onMouseMove={this.drag}
      onMouseUp={this.dragEnd}
      onTouchStart={this.dragStart}
      onTouchMove={this.drag}
      onTouchEnd={this.dragEnd}>
      <div className = 'poi-inner' id = 'poi-info-inner'>
          <div id='dragWrapper'>
          <div id='dragHeader'/>
          </div>
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
        <div className = 'tripActions' 
        id = 'tripActions' 
        style={{position:this.state.buttonPosition} as React.CSSProperties}>
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





