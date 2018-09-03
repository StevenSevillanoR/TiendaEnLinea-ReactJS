import React, {Component} from 'react';
import Barra from '../Barra-nav/Barra-nav';
import {Button, Container, Jumbotron, Col, Row} from 'reactstrap';
import './Carrito-compras.css';

class Carrito extends Component{
  render(){
    return(
      <Container fluid className="container-fluid fondo-principal">
        <Barra></Barra>
        <Jumbotron>
          <div className="row card-body">
            <div className="row card col-sm-12">
              <div className="row title">
                <h1><i className="fa fa-shopping-cart fa-lg text-info"></i> Carrito de Compras</h1>
              </div>
              <hr className="my-4"/>
              <div className="row card-body">
                <div className="col-sm-7 productosSel">
                  <div className="row">
                    <div className="col-sm-3">
                      <img src="" className="img-thumbnail imgProd" />
                    </div>
                    <div className="col-sm-9 descripcion">
                      <label className="nombreProd"><b><span></span></b></label>
                      <br/>
                      <label className="cantidadProd"><b>Unidades: </b> <span></span></label>
                      <br/>
                      <label className="precioProd"><b>Precio Unidad: </b> <span></span></label>
                      <br/>
                    </div>
                  </div>
                  <div className="row">
                    <label className="subtotal"><b>Subtotal: $</b><span></span></label>
                    <br/>
                  </div>
                  <hr className="my-4"/>
                </div>
                <div className="col-sm-5 descripcion">
                  <div className="row">
                    <div className="col-sm-12 containertotal">
                      <div className="row totalLabel">
                          <br/>
                          <label className="total"><h1>Total: $<span></span></h1></label>
                          <br/>
                      </div>
                      <div className="row btn-group">
                        <button type="button" className="btn btn-danger btn-lg">Cancelar</button>
                        <button type="button" className="btn btn-success btn-lg">Pagar</button>
                        <button type="button" className="btn btn-primary btn-lg">Borrar</button>
                      </div>
                      <br/>
                      <br/>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row btn-group">
                <button type="button" className="btn btn-info btn-lg">Atras</button>
              </div>
            </div>
          </div>
        </Jumbotron>          
      </Container>
    )
  }
}

export default Carrito;
