import React, {Component} from 'react';
import './Home-page.css';
import { FirestoreCollection } from 'react-firestore';
import Barra from '../Barra-nav/Barra-nav';
//import {auth} from '../../Firebase';
import * as Pr from '../../service/Service';
import ErrorBoundary from '../Error';
import {withRouter} from 'react-router-dom';
import {Button, ButtonGroup, Input, Jumbotron, Container, Row, Col} from 'reactstrap';
import Filtro from './Filter-Home';


let prod = [];
let productosM = [];
let id='';
let nom='';
let Badge;

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const Catalogo = ({ history }) =>
  <div>
    
      <Home history={history} />
    
  </div>

class Home extends Component{

  constructor(props){
    super(props)

    //console.log(Pr.getProductos());

    this.state={
      productos: [],
    };
  }

  /*[{ id: "1", cantidad: 36, nombre: "Aguacate", precio: 5 },
    { id: "2", cantidad: 68, nombre: "Ajo", precio: 2 },
    { id: "3", cantidad: 20, nombre: "Almendras", precio: 8 },
    { id: "4", cantidad: 35, nombre: "Arándanos", precio: 6 },
    { id: "5", cantidad: 36, nombre: "Brocoli", precio: 5 }]*/

  render(){

    const {
      productos,
    } = this.state;

    console.log(this.state.productos)

    let isVoid

    if(this.state.productos !== [] && this.state.productos.length > 0){
      isVoid = false
      console.log(isVoid)
    }else{
      isVoid = true
      console.log(isVoid)
    }

    console.log(sessionStorage.getItem('Total'));
    Badge = sessionStorage.getItem('Total');
    console.log(Badge);

    return isVoid ? (
      
      <FirestoreCollection
        path='productos'
        sort="nombre:asc"
        render={({ isLoading, data }) => {
          return isLoading ? ( 
              <Container fluid className="fondo-principal">
              <Barra Count={sessionStorage.getItem('Total')}></Barra>
              </Container>
            ) : (
              <Container fluid className="fondo-principal">
                <Barra Count={sessionStorage.getItem('Total')}></Barra>
              <Jumbotron>
                <div className="row">
                  <div className="col-sm-8">
                    <h1 className="display-5"><span className="glyphicon glyphicon-th text-info"></span> Cátalogo de Productos</h1>
                  </div>
                  <div className="col-sm-4">
                    <label><h3>Qué estás bucando?</h3></label>
                    <input className="buscarProd" placeholder="Buscar producto..." id="input1" onKeyUp={this.getInput}/>
                  </div>
                </div>
                <hr className="my-4"/>
                {prod.splice(0,1,data)}{console.log(prod)}
                <ErrorBoundary>
                  <Filtro Badge={Badge} Productos={this.state.productos} Data={data} FiltroProductos={this.productosFiltrados()}></Filtro>
                </ErrorBoundary>
              </Jumbotron>
            </Container>
          );
        }}
      ></FirestoreCollection>
    ):(
        <Container fluid className="fondo-principal">
          <Barra Count={sessionStorage.getItem('Total')}></Barra>
          <Jumbotron>
            <div className="row">
              <div className="col-sm-8">
                <h1 className="display-5"><span className="glyphicon glyphicon-th text-info"></span> Cátalogo de Productos</h1>
              </div>
              <div className="col-sm-4">
                <label><h3>Qué estás bucando?</h3></label>
                <input className="buscarProd" placeholder="Buscar producto..." id="input2" onKeyUp={this.getInput} />
              </div>
            </div>
            <hr className="my-4"/>
            <ErrorBoundary>
              <Filtro Productos={this.state.productos} FiltroProductos={this.productosFiltrados()}></Filtro>
            </ErrorBoundary>
          </Jumbotron>
        </Container>
    )
  }

  handleContador() {
    let contador = sessionStorage.getItem('Total');
    console.log(contador)
  }

  getId = (event) => {
    const { history, } = this.props;
    id = event.target.id;
    //id = _id;
    history.push("/Detalle");
    //this.getProductos
    console.log(id);
  };

  getInput = (event) => {
    nom = event.target.value;
     console.log(nom);
    this.FilterP(nom);
  }

  FilterP = (nombre) => {

    const{
      productos
    } = this.state;

    console.log(nombre);
    let items = [];
    let product = getProductos();
    let produc = product;
    let boleano = nombre !== "" && nombre !== undefined;

    console.log(produc);
    console.log(product);
    console.log(boleano);

    if (boleano) {
      produc.forEach(element => {
        let nomArr = element.nombre.toLowerCase().replace(/\u00E1/g, "a");
        let nomBus = nombre.toLowerCase().replace(/\u00E1/g, "a");
        console.log(nomArr, nomBus);

        if (nomArr.includes(nomBus)) {
          console.log(nombre);
          items.push({
            id: element.id,
            nombre: element.nombre,
            precio: element.precio,
            cantidad: element.cantidad
          })

          console.log(items)

          productosM = items;

        } else {
          console.log("No se encuentra ese producto en la base de datos");
        }
      })
      console.log(productosM);
      this.setState({productos: productosM});
      console.log(this.state.productos);
      return productosM = items;
    } else {
      console.log(product)
      this.setState(byPropKey('productos', productosM));
      console.log(this.setState(byPropKey('productos', productosM)));
      return productosM = product;
    }
  }

  productosFiltrados = () => {

    console.log(productosM);
    return productosM;
  }

}

export let getProductos = () => {
  let products = [];
  console.log(prod)
  prod.forEach(productos => {
    productos.forEach(producto => {
      products.push({ id: producto.id, nombre: producto.nombre, cantidad: producto.cantidad, precio: producto.precio });
    })
  })
  //console.log(prod);
  console.log(products);

  return products;
}

/*export let getObtenerId = (_id) => {
  //getId(_id);
  id = _id;
  console.log(id);
  getIdVerMas();
}*/

export let getIdVerMas = () => {
  //this.getId(idP)
  console.log(id);
  let idV = '';
  if(id === ''){
    idV = sessionStorage.getItem('Id_Filtro');
    console.log(idV);
  }else{
    idV = id;
    console.log(idV)
  }
  console.log(idV);
  return idV;
}

export default withRouter(Catalogo);

export {
  Home,

}