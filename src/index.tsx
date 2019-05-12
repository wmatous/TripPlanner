import dotenv from 'dotenv';
import React from 'react';
import ReactDOM from 'react-dom';
import Map from './App';
import './index.css';
import POISidebar from './POISidebar';

dotenv.config();

// import registerServiceWorker from './registerServiceWorker';
console.log(process.env);
ReactDOM.render(<Map />, document.getElementById('map'));
ReactDOM.render(<POISidebar   />, document.getElementById('poi-wrapper'));
// ReactDOM.render(<Map.PosedSidebar initialPose= "left" hostRef = {React.createRef()} />, document.getElementById('poi-wrapper'));
// registerServiceWorker();
