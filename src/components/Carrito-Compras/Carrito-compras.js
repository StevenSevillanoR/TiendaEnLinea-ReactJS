import React, {Component} from 'react';
import Barra from '../Barra-nav/Barra-nav';
import * as service from '../../service/Service';
import {Button, ButtonGroup, Container, Jumbotron, Col, Row} from 'reactstrap';
import CircularJSON from 'circular-json';
import {db} from '../../Firebase/firebase';
import SweetAlert from 'sweetalert2-react';
import './Carrito-compras.css';

let productoDoc = [];
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
        if(elemento.nombre === element.nombre){
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
      show: false,
    }

  }

  componentWillMount(){
    this.setState({productosC: JSON.parse(sessionStorage.getItem('Compra')), total: total, show:false})
  }

  render(){
    return(
      <Container fluid className="container-fluid fondo-principal">
        <Barra Badge={sessionStorage.getItem('Total')}></Barra>
        <Jumbotron>
          <Row className="card-body">
            <div className="row card col-sm-12">
              <Row className="title">
                <h1><i className="fa fa-shopping-cart fa-lg text-info"></i> Carrito de Compras</h1>
              </Row>
              <hr className="my-4"/>
              <Row className="card-body">
              {console.log(this.state.productosC)}
              {this.state.productosC.map(producto=>(
                  <Col sm="7" className="productosSel" key={producto.id}>
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
                    <Row className="row">
                      <label className="subtotal"><b>Subtotal: €</b><span>{producto.subtotal}</span></label>
                      <br />
                    </Row>
                    <hr className="my-4" />                              
                </Col>
              ))}
                <Col sm="5" className="descripcion">
                  <div className="row">
                    <div className="col-sm-12 containertotal">
                      <div className="row totalLabel">
                          <br/>
                          <label className="total"><h1>Total: € <span>{this.state.total}</span></h1></label>
                          <br/>
                      </div>
                      <ButtonGroup>
                        <Button type="button" color="danger" size="lg" onClick={this.onAtras}>Cancelar</Button>
                        <Button type="button" sm="auto" color="success" size="lg" onClick={this.onPagar}><SweetAlert
                          show={this.state.show}
                          title="Pago exitoso"
                          text="Compra realizada satisfactoriamente. Gracias por su compra!!"
                          type='success'
                          onConfirm={() => this.goHome()}
                        />Pagar</Button>
                        <Button type="button" color="primary" size="lg" onClick={this.limpiarCarrito} >Borrar</Button>
                      </ButtonGroup>
                      <br/>
                      <br/>
                    </div>
                  </div>
                </Col>
              </Row>
              <div className="row back">
                <ButtonGroup>
                  <Button type="button" outline color="primary" size="lg" onClick={this.onAtras}>Atras</Button>
                </ButtonGroup>
              </div>
            </div>
          </Row>
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
    let nombres = [];
    let compra = JSON.parse(sessionStorage.getItem('Compra'));
    console.log(compra)
    compra.forEach(element => {
      nombres.push({
        nombre: element.nombre,
        cantidad: element.cantidad
      })
    });
    console.log(nombres)
    sessionStorage.setItem('Nombres', CircularJSON.stringify(nombres));      
    window.location.href = "/home";
  }

  onPagar = () =>{
    let pActualizados = [];
    console.log(productos);
    console.log(product);
    product.forEach(element => {
      productos.forEach(elemento => {
        if (element.nombre === elemento.nombre) {
          pActualizados.push({
            id: element.id,
            nombre: element.nombre,
            precio: element.precio,
            cantidad: element.cantidad - elemento.cantidad,
          });
          console.log(pActualizados);
        } else {
          console.log("No se ha actualizado el producto");
        }
      });
    });

    console.log(pActualizados);

    this.updateProductos(pActualizados);
    this.setState({show:true});
    //swal("Pago exitoso", "Compra realizada satisfactoriamente!!", "success");
    total = 0;
    productos = [];
    prod = [];
    sessionStorage.setItem('Total', 0);
    sessionStorage.setItem('Nombres', CircularJSON.stringify([{}]));
    sessionStorage.setItem('Compras', CircularJSON.stringify([{}]));   
    
  }

  goHome(){
    this.setState({ show: false });
    window.location.href = "/home";
  }

  updateProductos(productos){
    console.log(productos);
    productos.forEach(element => {
      console.log(element);
      productoDoc = db.doc(`productos/${element.id}`);
      console.log(productoDoc);
      //console.log(productoDoc.update(element));
      productoDoc.update(element);
    })
  }

}

export default Carrito;
