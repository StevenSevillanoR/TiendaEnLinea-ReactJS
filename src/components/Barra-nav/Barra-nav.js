import React, { Component } from 'react';
import {Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink} from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';
import {auth} from '../../Firebase';
import './Barra-nav.css';
import Filtro from '../Home-page/Filter-Home';
//import * as fi from '../Home-page/Filter-Home';
// import firebase from '@firebase/app';
// import '@firebase/firestore';

const BarraNav = ({ history }) =>
  <div>
    <Barra history={history} />
  </div>

//let cont = 0;
//let contador = 'null';
let counter = sessionStorage.getItem('Total');
//let miBarra = new Barra();

class Barra extends Component {

  constructor(props){
    super(props)
    
    console.log(sessionStorage.getItem('Total'));
    console.log(this.props.Count);

    this.state={
      contador: this.props.Count,
    }
    
    console.log(this.state.contador);

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

  actualizar = (counter) => {
    this.setState({contador:counter})
  }

  isLoginOut = (event) =>{

    const {
      history,
    } = this.props;

    auth.doSignOut()
      .then(()=>{
        sessionStorage.setItem('Total', 0);
        window.location.href="/Login";
        //history.push("/Login");
      }).catch((err) => {
        //this.setState(byPropKey('error', err));
        console.log(err);
      });
      
    event.preventDefault();
  }

  /*updateNotification() {
    contador = sessionStorage.getItem('Total')
    if (contador == null)
      contador = 0;
    else {
      contador = contador.length
    }
    document.getElementById("bagdeNotification").innerText = contador

  }*/

  render() {

    //let count= fi.shoppCartBadge();

    //console.log(count)

    const{
      contador,
    } = this.state;
    

    let boleano = false;
    console.log(this.state.contador)

    Number(this.state.contador) == 0 ? boleano = true : boleano = false;
    console.log(boleano);
    

    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link  to="/home" className="navbar-brand"><i className="fa fa-shopping-basket fa-lg text-info"></i> La<span className="text-danger">Bodeguita</span></Link>
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
          <Nav color="warning" navbar>
            <NavItem>
              <NavLink href="/Home" className="nav-link"><span className="fas fa-th"></span></NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/Carrito" className="nav-link" ><span className="fas fa-shopping-cart"><span id="bagdeNotification" hidden={boleano} className="badge badge-danger badge-pill">{contador}</span></span></NavLink>
            </NavItem>
            <li className="nav-item">
              <Link to="/Home" className="nav-link"><span className="fas fa-inbox"></span></Link>
            </li>
            <NavItem>
              <NavLink href="" className="nav-link" onClick = {this.isLoginOut}><span className="fas fa-sign-out-alt"></span></NavLink>
            </NavItem>
            <li className="nav-item" hidden>
              <a className="nav-link"> </a>
            </li>
            <li className="nav-item email" hidden>
              <img src="" className="rounded-circle" alt=""/>
              <span className="badge pill badge-secondary"> </span>
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

