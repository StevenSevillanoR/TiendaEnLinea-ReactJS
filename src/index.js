import React from 'react';
import { render } from 'react-dom';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
