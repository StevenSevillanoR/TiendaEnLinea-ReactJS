import React, { Component } from 'react';
import { Container, Jumbotron, Button, ButtonGroup, Label, Col, Row } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { FirestoreDocument } from 'react-firestore';
//import Home from '../Home-page/Home-page';
import * as home from '../Home-page/Home-page';
import Barra from '../Barra-nav/Barra-nav';
import './Producto.css';

let idP = '';

const Detalle = ({ history }) =>
    <div>
        <Producto history={history} />
    </div>

//const data = new Home();

class Producto extends Component{

    constructor(props){
        super(props) 
        
        
        let idVM = home.getIdVerMas();

        idP = idVM.substring(7, 10);

        console.log(idVM);
        console.log(idP);
        console.log(this.props.Badge);

        this.setProducto(idVM);

        this.state = {
            id: idP,
            productos:[]
        };
        console.log(this.state);
    }

    setProducto(idVM){
        console.log(home.getProductos());
        idP = idVM.substring(7, 10);
        console.log(idP); 
    }

    render(){

        console.log(idP);
      
        const {
            id,
            //productos
        } = this.state;

        console.log(id);

      let boleano = false;

      if(id ==='' || id === undefined){
        console.log(id)
        boleano = false;
      }else{
        boleano = true;
      }

      console.log(boleano);
      
      return boleano ? (
        <FirestoreDocument
              path={`productos/${id}`}
              render={({ isLoading, data }) => {
              return isLoading ? (
                  <Container fluid className="fondo-principal">
                    <Barra Badge = {sessionStorage.getItem('Total')}></Barra>
                  </Container>
              ) : (
              <Container fluid className="fondo-principal">
                    <Barra Badge={sessionStorage.getItem('Total')}></Barra>
                  <Jumbotron>
                      <Row className="card-body">
                          <div className="row card col-sm-12 contProductos">
                              <div className="row title">
                                  <h1>{data.nombre}</h1>
                              </div>
                              <hr className="my-4"/>
                              <div className="row">
                                  <Col className="card-image" sm="6">
                                      <img src={"images/img/"+data.nombre.toLowerCase()+".jpg"} className="img-thumbnail imgProd" alt={data.nombre}/>
                                      <br />
                                  </Col>
                                  <Col sm="6" className="descripcion">
                                      <br />
                                      <Label className="precioProducto"><b>Precio:</b> €<span> {data.precio} </span></Label>
                                      <br />
                                      <Label className="cantidadProducto"><b>Unidades disponibles: </b> <span>{data.cantidad} </span></Label>
                                      <br />
                                      <br />
                                  </Col>
                              </div>
                              <br/>
                              <div className="row back">
                                  <ButtonGroup>
                                        <Button type="button" outline color="primary" size="lg" onClick={this.onAtras}>Atras</Button>
                                  </ButtonGroup>   
                              </div>
                          </div>
                      </Row>
                  </Jumbotron>
              </Container>
              );
            }}
        />
        ) : (
          <Container fluid className="fondo-principal">
            <Barra Badge={sessionStorage.getItem('Total')}></Barra>
          </Container>
        )
    }

    onAtras = () => {
        /*const{
            history,
        } = this.props;

        history.push("/Home");*/
        window.location.href = "/home";
    }
}

export default withRouter(Detalle) 

export {
    Producto,   
}