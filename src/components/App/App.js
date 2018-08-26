import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
//import * as firebase from 'firebase';
import firebase from '@firebase/app';
import '@firebase/firestore';
import { FirestoreProvider } from 'react-firestore';
import {Home} from '../../components/Home-page/Home-page';

const config = {
    apiKey: "AIzaSyAry5GZjem1fKYv6rHFBG-1YntzEQ4iIyU",
    authDomain: "tiendaenlinea-6ea52.firebaseapp.com",
    databaseURL: "https://tiendaenlinea-6ea52.firebaseio.com",
    projectId: "tiendaenlinea-6ea52",
    storageBucket: "tiendaenlinea-6ea52.appspot.com",
    messagingSenderId: "932548095533"
};

var app = firebase.initializeApp(config);

var db = firebase.firestore(app);

const firestore = firebase.firestore();
  const settings = {/* your settings... */ timestampsInSnapshots: true};
  firestore.settings(settings);

db.collection("productos").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      doc.map(productos=>{
        console.log(productos);
      });
    console.log(`${doc.id} => ${doc.data()}`);
    });
});


class App extends Component {

  constructor(){
    super()
    this.state = {name: "Tienda En Linea" }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">{this.state.name}</h1>
        </header>
        <Home></Home>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
