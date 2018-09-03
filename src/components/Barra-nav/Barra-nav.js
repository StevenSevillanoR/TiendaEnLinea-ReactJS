import React, { Component } from 'react';
import {Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink} from 'reactstrap';
import './Barra-nav.css';
// import firebase from '@firebase/app';
// import '@firebase/firestore';

class Barra extends Component {

  constructor(){
    super()
    
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#"><i className="fa fa-shopping-basket fa-lg text-info"></i> La<span className="text-danger">Bodeguita</span></a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarColor03">
          <ul className="navbar-nav mr-auto d-none d-lg-block">

          </ul>
          <ul className="navbar-nav mr-auto d-none d-lg-block">

          </ul>
          <ul className="navbar-nav mr-auto d-none d-lg-block">

          </ul>
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link"><span className="fas fa-th"></span></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" ><span className="fas fa-shopping-cart"><span className="badge badge-primary badge-pill" hidden> </span></span></a>
            </li>
            <li className="nav-item">
              <a className="nav-link"><span className="fas fa-inbox"></span></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" ><span className="fas fa-sign-out-alt"></span></a>
            </li>
            <li className="nav-item" hidden>
              <a className="nav-link"> </a>
            </li>
            <li className="nav-item email" hidden>
              <img src="" className="rounded-circle"/>
              <span className="badge pill badge-secondary"> </span>
            </li >
          </ul >
        </div >
      </nav >
    );
  }
}

export default Barra;
