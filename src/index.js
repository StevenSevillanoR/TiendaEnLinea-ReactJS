import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
/*import Barra from './components/Barra-nav/Barra-nav';
import Registro from './components/Register/Registro';
import Carrito from './components/Carrito-Compras/Carrito-compras';
import Login from './components/Login/Login';
import Home from './components/Home-page/Home-page';
import Producto from './components/Producto/Producto';
import firebase from '@firebase/app';
import { FirestoreProvider } from 'react-firestore';
import '@firebase/firestore';*/

ReactDOM.render(<App />, document.getElementById('root'));

registerServiceWorker();
