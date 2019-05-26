import * as dotenv from 'dotenv';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Map from './App';
import './index.css';
import Overlay from './Overlay.js';

dotenv.config();

ReactDOM.render(<Map />, document.getElementById('map'));
ReactDOM.render(<Overlay   />, document.getElementById('overlay-wrapper'));
