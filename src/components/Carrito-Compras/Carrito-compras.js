import React, {Component} from 'react';
import Barra from '../Barra-nav/Barra-nav';
import * as service from '../../service/Service';
import {Button, ButtonGroup, Container, Jumbotron, Col, Row} from 'reactstrap';
import { Link } from 'react-router-dom';
import CircularJSON from 'circular-json';
import './Carrito-compras.css';

let nombres = [];
let prod = [];
let product = [];
let productos = [];
let total = 0;


class Carrito extends Component{

  constructor(props){
    super(props)

    console.log(this.props.Nombres)
    console.log(JSON.parse(sessionStorage.getItem('Nombres')));

    nombres = JSON.parse(sessionStorage.getItem('Nombres'));
    product = service.getProductos();
    console.log(nombres, product);

    nombres.forEach(elemento => {
      product.forEach(element => {
        if(elemento.nombre == element.nombre){
          prod.push({
            id: element.id,
            nombre: elemento.nombre,
            precio: element.precio,
            cantidad: elemento.cantidad,
            subtotal: element.precio*elemento.cantidad
          })
          productos = prod;
          console.log(productos)
        }else{
          console.log("No se encuentra ese producto en la base de datos");
        }
        console.log(prod, productos)
      });
    });
    
    productos.forEach(element => {
      total += element.subtotal;
    });

    console.log(total, productos)

    sessionStorage.setItem('Compra', CircularJSON.stringify(productos));

    console.log(JSON.parse(sessionStorage.getItem('Compra')));

    this.state = {
      productosC: JSON.parse(sessionStorage.getItem('Compra')), 
      total: total,
    }

  }

  componentWillMount(){
    this.setState({productosC: JSON.parse(sessionStorage.getItem('Compra')), total: total})
  }

  render(){
    return(
      <Container fluid className="container-fluid fondo-principal">
        <Barra Badge={sessionStorage.getItem('Total')}></Barra>
        <Jumbotron>
          <div className="row card-body">
            <div className="row card col-sm-12">
              <div className="row title">
                <h1><i className="fa fa-shopping-cart fa-lg text-info"></i> Carrito de Compras</h1>
              </div>
              <hr className="my-4"/>
              <div className="row card-body">
              {console.log(this.state.productosC)}
              {this.state.productosC.map(producto=>(
                  <div className="col-sm-7 productosSel" key={producto.id}>
                    <div className="row">
                      <div className="col-sm-3">
                        <img src={"images/img/"+producto.nombre.toLowerCase()+".jpg"} className="img-thumbnail imgProd" alt={producto.nombre.toLowerCase()} />
                      </div>
                      <div className="col-sm-9 descripcion">
                        <label className="nombreProd"><b><span>{producto.nombre}</span></b></label>
                        <br />
                        <label className="cantidadProd"><b>Unidades: </b> <span>{producto.cantidad}</span></label>
                        <br />
                        <label className="precioProd"><b>Precio Unidad: €</b> <span>{producto.precio}</span></label>
                        <br />
                      </div>
                    </div>
                    <div className="row">
                      <label className="subtotal"><b>Subtotal: €</b><span>{producto.subtotal}</span></label>
                      <br />
                    </div>
                    <hr className="my-4" />                              
                </div>
              ))}
                <div className="col-sm-5 descripcion">
                  <div className="row">
                    <div className="col-sm-12 containertotal">
                      <div className="row totalLabel">
                          <br/>
                          <label className="total"><h1>Total: € <span>{this.state.total}</span></h1></label>
                          <br/>
                      </div>
                      <ButtonGroup>
                        <Button type="button" color="danger" size="lg">Cancelar</Button>
                        <Button type="button" sm="auto" color="success" size="lg">Pagar</Button>
                        <Button type="button" color="primary" size="lg" onClick={this.limpiarCarrito} >Borrar</Button>
                      </ButtonGroup>
                      <br/>
                      <br/>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row back">
                <ButtonGroup>
                  <Button type="button" outline color="primary" size="lg" onClick={this.onAtras}>Atras</Button>
                </ButtonGroup>
              </div>
            </div>
          </div>
        </Jumbotron>          
      </Container>
    )
  }

  limpiarCarrito() {
    sessionStorage.setItem('Total', 0);
    //sessionStorage.setItem('Compras', CircularJSON.stringify([{}]));
    sessionStorage.setItem('Nombres', CircularJSON.stringify([{}]));
    /*total = 0;
    productos = [];
    prod = [];
    setIdProCart("");
    setCantidades("", 0, "");*/
    window.location.href = "/home";
  }

  onAtras = () => {
      
    window.location.href = "/home";
  }

}

export default Carrito;
