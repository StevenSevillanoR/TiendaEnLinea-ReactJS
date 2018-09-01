import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import Barra from './components/Barra-nav/Barra-nav';
import Registro from './components/Register/Registro';
import Carrito from './components/Carrito-Compras/Carrito-compras';
import Login from './components/Login/Login';
import Home from './components/Home-page/Home-page';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import firebase from '@firebase/app';
import { FirestoreProvider } from 'react-firestore';
import '@firebase/firestore';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

/*const config = {
    apiKey: "AIzaSyAry5GZjem1fKYv6rHFBG-1YntzEQ4iIyU",
    authDomain: "tiendaenlinea-6ea52.firebaseapp.com",
    databaseURL: "https://tiendaenlinea-6ea52.firebaseio.com",
    projectId: "tiendaenlinea-6ea52",
    storageBucket: "tiendaenlinea-6ea52.appspot.com",
    messagingSenderId: "932548095533"
};*/

//var app = firebase.initializeApp(config);

//var db = firebase.firestore(app);

const firestore = firebase.firestore();
  const settings = {/* your settings... */ timestampsInSnapshots: true};
  firestore.settings(settings);

/*const productos = [];

db.collection("productos").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const id = doc.id;
      const nombre = doc.data().nombre;
      const precio = doc.data().precio;
      const cantidad = doc.data().cantidad;
      const imagen = doc.data().imagen;
      productos.push({id: id, nombre: nombre, precio: precio, cantidad: cantidad, imagen: imagen});
      console.log(productos);
    console.log(`${doc.id} => ${doc.data()}`);
    });
});*/

ReactDOM.render((
  <FirestoreProvider firebase={firebase}>
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Login}/>
          <Route path="/Barra" component={Barra}/>
          <Route path="/Home" component={Home}/>
          <Route path="/Login" component={Login}/>
          <Route path="/Carrito" component={Carrito}/>
          <Route path="/Registro" component={Registro}/>
        </Switch>
      </div>
    </Router>
  </FirestoreProvider>
), document.getElementById('root'));

registerServiceWorker();
