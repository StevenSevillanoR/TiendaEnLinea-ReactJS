import React, { Component } from 'react';
import './App.css';
import Barra from '../Barra-nav/Barra-nav';
import Registro from '../Register/Registro';
import Carrito from '../Carrito-Compras/Carrito-compras';
import Login from '../Login/Login';
import Home from '../Home-page/Home-page';
import Producto from '../Producto/Producto';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import firebase from '@firebase/app';
//import {firebase} from 'firebase';
import {auth} from '../../Firebase/firebase';
import { FirestoreProvider } from 'react-firestore';
import '@firebase/firestore';

//import * as firebase from 'firebase';
//import { FirestoreProvider } from 'react-firestore';
//import { FirestoreCollection } from 'react-firestore';


const firestore = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true };
firestore.settings(settings);

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      fakeAuth() ? (
        <Component {...props} />
      ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
    }
  />
);

const fakeAuth = () => {

  let isAuthenticated=false;
  console.log(JSON.parse(sessionStorage.getItem('Login')));

  if (JSON.parse(sessionStorage.getItem('Login'))===true){
    isAuthenticated = true;
  }else{
    isAuthenticated = false;
  }
  
  console.log(isAuthenticated);

  return isAuthenticated;
}

class App extends Component {

  constructor(props){
    super(props)
    
    this.state = {
      authUser: null,
    }
  }

  componentDidMount() {
    auth.onAuthStateChanged(authUser => {
      console.log(authUser);
      authUser
        ? this.setState({ authUser })
        : this.setState({ authUser: null });
    });
    console.log(this.state.authUser);
  }

  render() {

    console.log(this.state.authUser)

    return (
        <FirestoreProvider firebase={firebase}>
          <Router>
            <div>
              <Switch>
                <Route exact path="/" component={Login} />
                <PrivateRoute path="/Barra" component={Barra} authUser={this.state.authUser}/>
                <PrivateRoute path="/Home" component={Home} authUser={this.state.authUser}/>
                <Route path="/Login" component={Login} />
                <PrivateRoute path="/Carrito" component={Carrito} authUser={this.state.authUser} />
                <Route path="/Registro" component={Registro}/>
                <PrivateRoute path="/Detalle" component={Producto} authUser={this.state.authUser}/>
              </Switch>
            </div>
          </Router>
        </FirestoreProvider>
      )    
  }
}

export default App;
