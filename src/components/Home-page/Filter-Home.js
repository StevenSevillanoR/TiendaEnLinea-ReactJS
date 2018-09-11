import React, {Component} from 'react';
import './Home-page.css';
import CircularJSON from 'circular-json';
import Barra from '../Barra-nav/Barra-nav';
import * as badge from '../Barra-nav/Badge'; 
import Carrito from '../Carrito-Compras/Carrito-compras';
//import Home from './Home-page';
//import { withRouter } from 'react-router-dom';
import { Button, ButtonGroup, Input, Jumbotron, Container, Row, Col } from 'reactstrap';
//import ErrorBoundary from '../Error';

//const miBarra = new Barra();

let id = '';
let idA = '';
let idAnad = '';
let _id = '';
let idCant = ''; 
let cantidad = 0;
let cant = 0;
let tot;
let total = Number(sessionStorage.getItem('Total'));
let nomTemp = [];
let nombres = [];
//let sumaBadge = 0;

const FiltroP = ({ history }) =>
  <div>
    <Filtro history={history} />
  </div>

class Filtro extends Component{

    constructor(props){
      super(props)

      this.state={
        productos: this.props.Productos,
      }

      //sessionStorage.setItem('Productos', JSON.stringify(this.props.Data));
      console.log(sessionStorage.getItem('Productos'));
      //console.log(CircularJSON.stringify(this.props.Data));
      console.log(this.state.productos);
    }

    render(){

      const{
        productos
      }=this.state

      console.log(this.props.Data);
      console.log(this.props.Badge);
      console.log(productos)
      console.log(this.props.FiltroProductos);

      let boleano = true;
      if(this.props.FiltroProductos !== [] && this.props.FiltroProductos.length > 0){
        console.log(boleano) 
        boleano = false;
      }

      let Data=[];

      if(this.props.Data !== [] && this.props.Data !== undefined){
        Data = this.props.Data;
        console.log(Data)
      }else{
        Data = this.props.FiltroProductos;
        console.log(Data)
      }

      console.log(boleano)
       

      return boleano ? (
        <Row className="card-body">
          {console.log(Data)}
          {Data.map( producto => (
            <div className="card col-md-3 col-sm-12 collection" key={producto.id}>
              <img src={"images/img/" + producto.nombre.toLowerCase() + ".jpg"} className="img-thumbnail imgProd" alt={producto.nombre.toLowerCase()} />
              <br />
              <Col sm="12" className="descripcion">
                <label className="nombreProd">{producto.nombre}</label>
                <br />
                <label className="precioProd"><b>Precio:</b> € <span>{producto.precio}</span></label>
                <br />
                <label className="cantidadProd"><b>Unidades disponibles:</b> <span> {producto.cantidad}</span></label>
                <br />
                <Row>
                  <Col sm="5" className="accionProd">
                    <ButtonGroup>
                      <Button size="md" color="info" id={`vermas_${producto.id}`} onClick={this.getIdF}>Ver Más</Button>
                    </ButtonGroup>
                  </Col>
                  <Col sm="7" className="accionProd">
                    <ButtonGroup>
                      <Button color="warning" size="sm" id={`anadir_${producto.nombre}`} onClick={this.onAnadir}>Añadir</Button>{' '}
                      <Input className="unidades" id={`cant_${producto.nombre}`} type="number" onChange={this.onCantidad} placeholder="1" max={producto.cantidad} min="1" />
                    </ButtonGroup>
                  </Col>
                </Row>
              </Col>
            </div>
          ))}{console.log(productos)}
        </Row>          
        ) : (
          <Row className="card-body">
            {this.props.FiltroProductos.map(producto => (
              <div className="card col-md-3 col-sm-12 collection" key={producto.id}>
                <img src={"images/img/" + producto.nombre.toLowerCase() + ".jpg"} className="img-thumbnail imgProd" alt={producto.nombre.toLowerCase()} />
                <br />
                <Col sm="12" className="descripcion">
                  <label className="nombreProd">{producto.nombre}</label>
                  <br />
                  <label className="precioProd"><b>Precio:</b> € <span>{producto.precio}</span></label>
                  <br />
                  <label className="cantidadProd"><b>Unidades disponibles:</b> <span> {producto.cantidad}</span></label>
                  <br />
                  <Row>
                    <Col sm="5" className="accionProd">
                      <ButtonGroup>
                        <Button size="md" color="info" id={`vermas_${producto.id}`} onClick={this.getIdF.bind(this)}>Ver Más</Button>
                      </ButtonGroup>
                    </Col>
                    <Col sm="7" className="accionProd">
                      <ButtonGroup>
                        <Button color="warning" size="sm" id={`anadir_${producto.nombre}`} onClick={this.onAnadir}>Añadir</Button>{' '}
                        <Input className="unidades" id={`cant_${producto.nombre}`} type="number" onChange={this.onCantidad} placeholder="1" max={producto.cantidad} min="1" />
                      </ButtonGroup>
                    </Col>
                  </Row>
                </Col>
              </div>
            ))}{console.log(productos)}
          </Row>
        )
    }

  getIdF = (event) => {
    //const { history } = this.props;
    id = event.target.id;
    console.log(id);
    sessionStorage.setItem('Id_Filtro', id);
    //home.getObtenerId(id);
    //Home.getId(event);
    window.location.href = "/Detalle";
    //this.getProductos
    console.log(id);
  }

  onAnadir = (e) => {
    console.log(e.target.id);
    this.setId(e.target.id);
    idAnad = e.target.id;
    console.log(idAnad);
    this.anadirProductos();
  }

  onCantidad = (cantidad) => {
    let sumaBadge = 0;
    sessionStorage.setItem('Badge', cantidad.target.value);
    console.log(cantidad.target.value);
    console.log(cantidad.target.id);
    let cant = cantidad.target.value;
    let idCant = cantidad.target.id;
    
    sumaBadge = sumaBadge + Number(sessionStorage.getItem('Badge'));
    sessionStorage.setItem('Badge', sumaBadge);
    console.log(sumaBadge);
    this.cantidades(idCant, cant);
  }

  setId(id){
    idA = id;
    console.log(idA)
  }

  cantidades(id, cantid){
    _id = id;
    let cant = cantid;
    cantidad = Number(cant);
    console.log(_id, cantidad);
  }

  anadirProductos(){
    this.setCantidades(_id, cantidad, idAnad);
  }

  setCantidades(id, cantidad, idAnadir) {
    idCant = id;
    cant = cantidad;
    idAnad = idAnadir;

    let idC = idCant.substr(5);
    let idA = idAnad.substr(7);
    console.log(idCant, cant, idAnad);
    console.log(idC, idA);

    if (idC === idA) {
      shoppCartBadge();
      this.setIdProCart(idC);
    } else {
      console.log("Por favor añada la cantidad digitada");
    }
  }

  setIdProCart(nom) {
    nombres = JSON.parse(sessionStorage.getItem('Nombres'));
    if(nombres === null){
      nombres = []
    }else{
      nombres.forEach(temp => {
        nomTemp.push(temp.nombre)
      })
    }

    console.log(nom, nombres, nomTemp);
    let cantidad = 0;
    let names = [];
    let boleano = false;
    console.log(nomTemp);
    nomTemp.forEach(temp => {
      console.log(temp)
      if (temp == nom) {
        boleano = true;
      }
    });
    console.log(boleano);
    nomTemp.push(nom);

    if (nom != "" && nom != undefined) {
      console.log(nom);
      if (Object.keys(nombres).length === 0) {
        nombres.push({
          nombre: nom,
          cantidad: cant
        });
      } else if (boleano) {
        names = nombres;
        console.log(names);
        names.forEach((duplicado, index) => {
          console.log(duplicado.nombre);
          if (duplicado.nombre == nom) {
            console.log(index);
            console.log(nom);
            console.log(cant);
            console.log(duplicado.cantidad);
            const canti = duplicado.cantidad;
            console.log(canti);
            //console.log(this.cant+duplicado.cantidad);
            cantidad = cant;
            console.log(cantidad);
            const cantid = cantidad + canti;
            console.log(cantid);

            console.log(nombres);

            nombres.splice(index, 1, { nombre: nom, cantidad: cantid });
            console.log(nombres);
          }
        });
      } else {

        nombres.push({
          nombre: nom,
          cantidad: cant
        });
        console.log(nombres);
      }
    } else {
      nombres = [];
      cant = 0;
      total = 0;
      nomTemp = [];
    }
    console.log(nombres)

    //getProCart()
    sessionStorage.setItem('Nombres', CircularJSON.stringify(nombres));
    console.log(JSON.parse(sessionStorage.getItem('Nombres')));
    //this.nom_producto.next(nom);*/
  }

}

//Este metodo no funciona para nada
export let getProCart = () => {
  console.log(nombres)  
  return <Carrito Nombres = {nombres}></Carrito>;
}

export let shoppCartBadge = () => {
  console.log(total, typeof(total));
  //typeof(total)!==Number ? (typeof(total)===String ? total = sessionStorage.getItem('Total'): total=0) : total = sessionStorage.getItem('Total')
  tot = total;
  console.log(cant, typeof (cant));
  total = tot + cant;
  console.log(total, typeof (total));
  sessionStorage.setItem('Total', total);
  console.log(sessionStorage.getItem('Total'));
  total = Number(sessionStorage.getItem('Total'));
  //this.editCantidadProductos(this.total);
  //this.getbadgeCart(this.total);

  //window.location.href = "/Home/Barra";
  console.log(total)
  badge.updateBadge();
  
  return total;
}

export default Filtro;