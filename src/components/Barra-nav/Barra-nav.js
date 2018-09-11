import React, { Component } from 'react';
import {Collapse, /*Navbar*/ NavbarToggler, NavbarBrand, Nav, NavItem, NavLink} from 'reactstrap';
import { Link } from 'react-router-dom';
import {auth} from '../../Firebase/firebase';
import './Barra-nav.css';
import Badge from './Badge';

//let counter = sessionStorage.getItem('Total');
let isLogin = false;
let emailUsuario = '';
let fotoUsuario = '';
let nombreUsuario = '';

class Barra extends Component {

  constructor(props){
    super(props)
    
    console.log(sessionStorage.getItem('Total'));
    console.log(sessionStorage.getItem('Badge'));
    console.log(this.props.Count);

    this.state={
      contador: sessionStorage.getItem('Total'),
    }
    
    console.log(this.state.contador);
    this.getAuth();
  }

  componentWillMount(){
    this.setState({contador:sessionStorage.getItem('Total')})
  }

  goHome = () => {
    window.location.href = "/home"
  }

  isLoginOut = (event) =>{

    sessionStorage.setItem('Login', false);
    sessionStorage.setItem('Total', 0);
    console.log(JSON.parse(sessionStorage.getItem('Login')));

    auth.doSignOut()
      .then(()=>{        
        //window.location.href="/Login";
      }).catch((err) => {
        console.log(err);
      });
      
    event.preventDefault();
  }

  getAuth = () => {

    let authorization = [];
    auth.onAuthStateChanged(auth=>{
      console.log(auth.email);
      emailUsuario = auth.email;
      console.log(auth.displayName);
      nombreUsuario = auth.displayName;
      console.log(auth.photoURL);
      fotoUsuario = auth.photoURL;
      isLogin = true;
      authorization = auth;
      console.log(authorization);
    });
    console.log(authorization);
    console.log(nombreUsuario, emailUsuario, fotoUsuario);
    return authorization;
  }

  render() {

    const{
      contador,
    } = this.state;
    

    let boleano = false;
    console.log(contador)

    Number(contador) === 0 ? boleano = true : boleano = false;
    console.log(boleano);
    

    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <NavbarBrand onClick={this.goHome}><i className="fa fa-shopping-basket fa-lg text-info"></i> La<span className="text-danger">Bodeguita</span></NavbarBrand>
        <NavbarToggler type="button" data-toggle="collapse" data-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </NavbarToggler>
        <Collapse className="collapse navbar-collapse" id="navbarColor03">
          <ul className="navbar-nav mr-auto d-none d-lg-block">

          </ul>
          <ul className="navbar-nav mr-auto d-none d-lg-block">

          </ul>
          <ul className="navbar-nav mr-auto d-none d-lg-block">

          </ul>
          <Nav color="warning" navbar>
            <NavItem>
              <NavLink href="/Home" className="nav-link"><span className="fas fa-th"></span></NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/Carrito" className="nav-link" ><span className="fas fa-shopping-cart"><Badge Total = {this.state.contador} Boleano = {boleano}></Badge></span></NavLink>
            </NavItem>
            <li className="nav-item">
              <Link to="/Home" className="nav-link"><span className="fas fa-inbox"></span></Link>
            </li>
            <NavItem>
              <NavLink href="/" className="nav-link" onClick = {this.isLoginOut}><span className="fas fa-sign-out-alt"></span></NavLink>
            </NavItem>
            <li className="nav-item email" hidden={!isLogin}>
              <a className="nav-link">{emailUsuario}</a>
            </li>
            <li className="nav-item" hidden={!JSON.parse(localStorage.getItem('GoogleKey'))}>
              <img src={fotoUsuario} className="rounded-circle" alt=""/>
              <span className="badge pill badge-secondary">{nombreUsuario}</span>
            </li>
          </Nav>
        </Collapse>
      </nav>
    );
  }
}

export default Barra;

