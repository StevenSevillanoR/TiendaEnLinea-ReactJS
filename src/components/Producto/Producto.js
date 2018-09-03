import React, { Component } from 'react';
import {Container, Jumbotron, Button, Label, Col, Row} from 'reactstrap';
import Barra from '../Barra-nav/Barra-nav';
import './Producto.css';

class Producto extends Component{
    render(){
      return(
        <Container fluid className="fondo-principal">
          <Barra></Barra>
          <Jumbotron>
            <div className="row card-body">
              <div className="row card col-sm-12">
                <div className="row title">
                  <h1></h1>
                </div>
                <hr className="my-4"/>
                <div className="row">
                  <div className="card-image col-sm-6">
                    <img src="" className="img-thumbnail imgProd" />
                    <br/>
                  </div>
                  <div className="col-sm-6 descripcion">
                    <br/>
                    <label className="precioProd"><b>Precio:</b> €<span> </span></label>
                    <br/>
                    <label className="cantidadProd"><b>Unidades disponibles: </b> <span> </span></label>
                    <br/>
                    <br/>
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

export default Producto;