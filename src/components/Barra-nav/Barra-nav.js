import React, { Component } from 'react';
import logo from './logo.svg';
import './Barra-nav.css';
// import firebase from '@firebase/app';
// import '@firebase/firestore';

class Barra extends Component {

  constructor(){
    super()
    this.state = {name: "Barra Nav" }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">{this.state.name}</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/Barra-nav.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default Barra;
