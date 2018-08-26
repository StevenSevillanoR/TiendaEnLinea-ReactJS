import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
//import * as firebase from 'firebase';
//import { FirestoreProvider } from 'react-firestore';
import { FirestoreCollection } from 'react-firestore';

class App extends Component {

  constructor(){
    super()
    this.state = {name: "Tienda En Linea" }
  }

  render() {
    return (
        <div className="App container-fluid">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">{this.state.name}</h1>
          </header>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
          <FirestoreCollection
            path="productos"
            sort="nombre:asc"
            render={({ isLoading, data }) => {
              return (
                <div>
                  <h1>Productos</h1>
                  <ul>
                    {data.map(producto => (
                      <li key={producto.id}>
                        {producto.nombre}: {producto.precio}: {producto.cantidad}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            }}
            ></FirestoreCollection>
        </div>
    );
  }
}

export default App;
