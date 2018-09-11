import React, { Component } from 'react';
import {Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink} from 'reactstrap';
import { Link } from 'react-router-dom';
import {auth} from '../../Firebase/firebase';
import './Barra-nav.css';
import Badge from './Badge';

const BarraNav = ({ history }) =>
  <div>
    <Barra history={history} />
  </div>

let counter = sessionStorage.getItem('Total');
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
    this.isLoginAuth();

    //console.log(fi.shoppCartBadge())

    /*contador = fi.shoppCartBadge();
    if (contador == null)
      contador = 0;
    else {
      contador = contador.length
    }
    this.updateNotification = this.updateNotification.bind(this)*/
  }

  componentWillMount(){
    this.setState({contador:sessionStorage.getItem('Total')})
  }

  goHome = () => {
    window.location.href = "/home"
  }

  isLoginOut = (event) =>{

    const {
      history,
    } = this.props;

    auth.doSignOut()
      .then(()=>{
        sessionStorage.setItem('Total', 0);
        sessionStorage.setItem('Login', false);
        window.location.href="/Login";
        //history.push("/Login");
      }).catch((err) => {
        //this.setState(byPropKey('error', err));
        console.log(err);
      });
      
    event.preventDefault();
  }

  getAuth() {
    //let authorization = auth.authState.map(auth => auth);
    //console.log(authorization);
    let authorization = [];
    auth.onAuthStateChanged(auth=>{
      console.log(auth.email);
      emailUsuario = auth.email;
      console.log(auth.displayName);
      nombreUsuario = auth.displayName;
      console.log(auth.photoURL);
      fotoUsuario = auth.photoURL;

      authorization = auth;
      console.log(authorization);
    });
    console.log(authorization);
    return authorization;
  }

  isLoginAuth = () => {
    let auth = this.getAuth();
    console.log(auth);
    console.log(JSON.parse(localStorage.getItem('GoogleKey')))
      if (auth) {
        
        isLogin = true;
        nombreUsuario = auth.displayName;
        emailUsuario = auth.email;
        fotoUsuario = auth.photoURL;
      } else {
        isLogin = false;
      }

    console.log(nombreUsuario, emailUsuario, fotoUsuario);
  }

  render() {

    const{
      contador,
    } = this.state;
    

    let boleano = false;
    console.log(this.state.contador)

    Number(this.state.contador) === 0 ? boleano = true : boleano = false;
    console.log(boleano);
    

    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <NavbarBrand onClick={this.goHome}><i className="fa fa-shopping-basket fa-lg text-info"></i> La<span className="text-danger">Bodeguita</span></NavbarBrand>
        <NavbarToggler type="button" data-toggle="collapse" data-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </NavbarToggler>
        <div className="collapse navbar-collapse" id="navbarColor03">
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
        </div>
      </nav>
    );
  }
}

/*Barra.defaultProps = {
  Badge: Number(sessionStorage.getItem('Total')),
}*/

export let MostrarBadge = () => {
  //Barra.actualizar(sessionStorage.getItem('Total'));
  //console.log(Barra.defaultProps);
  //miBarra.actualizar(sessionStorage.getItem('Total'));
  counter = Number(sessionStorage.getItem('Total'));
  console.log(counter);
}



export default Barra;

