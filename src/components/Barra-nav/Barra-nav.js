import React, { Component } from 'react';
import {Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink} from 'reactstrap';
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
