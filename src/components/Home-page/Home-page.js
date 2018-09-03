import React, {Component} from 'react';
import './Home-page.css';
import { FirestoreCollection } from 'react-firestore';
import Barra from '../Barra-nav/Barra-nav';
import {Button, ButtonGroup, Input, Jumbotron, Container, Row, Col} from 'reactstrap';


class Home extends Component{

  constructor(props){
    super(props)

    this.state={
      productos:[]
    };
  }

  render(){
    const {
      productos,
    } = this.state;

    return(
      <FirestoreCollection
        path='productos'
        sort="nombre:asc"
        render={({ isLoading, data }) => {
          return(
              <Container fluid className="fondo-principal">
              <Barra></Barra>
              <Jumbotron>
                <div className="row">
                  <div className="col-sm-8">
                    <h1 className="display-5"><span className="glyphicon glyphicon-th text-info"></span> Cátalogo de Productos</h1>
                  </div>
                  <div className="col-sm-4">
                    <label><h3>Qué estás bucando?</h3></label>
                    <input className="buscarProd" placeholder="Buscar producto..."/>
                  </div>
                </div>
                <hr className="my-4"/>
                <div className="row card-body">
                  {data.map(producto=>(
                    
                    <div className="card col-md-3 col-sm-12 collection" key={producto.id}>
                      <img src={"images/img/"+producto.nombre.toLowerCase()+".jpg"} className="img-thumbnail imgProd" alt={producto.nombre.toLowerCase()}/>
                      <br/>
                      <Col sm="12" className="descripcion">
                        <label className="nombreProd">{producto.nombre}</label>
                        <br/>
                        <label className="precioProd"><b>Precio:</b> € <span>{producto.precio}</span></label>
                        <br/>
                        <label className="cantidadProd"><b>Unidades disponibles:</b> <span> {producto.cantidad}</span></label>
                        <br/>
                        <Row>
                          <Col sm="5" className="accionProd">
                            <Button size="md" color="info" id="vermas_{producto.nombre}">Ver Más</Button>
                          </Col>
                          <Col sm="7" className="accionProd">
                              <ButtonGroup>
                                  <Button color="warning" size="sm" id="anadir_{producto.nombre}">Añadir</Button>{' '}
                                  <Input className="unidades" id="cant_{producto.nombre}" type="number" placeholder="1" max={producto.cantidad} min="1" />
                              </ButtonGroup>  
                          </Col>
                        </Row>
                      </Col>
                    </div>
                  ))}
                </div>
              </Jumbotron>
            </Container>
          );
        }}
    ></FirestoreCollection>
    )
  }
}

export default Home;
