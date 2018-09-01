import React, {Component} from 'react';
import './Home-page.css';
import { FirestoreCollection } from 'react-firestore';
import {Button, InputGroup, InputGroupAddon, Input} from 'reactstrap';

class Home extends Component{
  render(){
    return(
      <FirestoreCollection
        path='productos'
        sort="nombre:asc"
        render={({ isLoading, data }) => {
          return(
              <div className="container-fluid fondo-principal">

              <div className="jumbotron">
                <div className="row">
                  <div className="col-sm-8">
                    <h3 className="display-4"><span className="glyphicon glyphicon-th text-info"></span> Cátalogo de Productos</h3>
                  </div>
                  <div className="col-sm-4">
                    <label><h3>Que estas bucando?</h3></label>
                    <input className="buscarProd" placeholder="Buscar producto..."/>
                  </div>
                </div>
                <hr className="my-4"/>
                <div className="row card-body">
                  {data.map(producto=>(
                    <div className="card col-md-3 col-sm-12 collection" key={producto.id}>
                      <img src={"images/img/"+producto.nombre.toLowerCase()+".jpg"} className="img-thumbnail imgProd" alt={producto.nombre.toLowerCase()}/>
                      <br/>
                      <div className="col-sm-12">
                        <label className="nombreProd">{producto.nombre}</label>
                        <br/>
                        <label className="precioProd"><b>Precio:</b> $<span>{producto.precio}</span></label>
                        <br/>
                        <label className="cantidadProd"><b>Unidades disponibles:</b> <span> {producto.cantidad}</span></label>
                        <br/>
                        <div className="col-sm-5 accionProd">
                          <Button className="btn btn-info" size="lg" block type="button" id="vermas_{producto.nombre}">Ver Más</Button>
                        </div>
                        <div className="col-sm-7 accionProd">
                          <input className="btn btn-warning" type="button" value="Añadir" id="anadir_{producto.nombre}"/>
                          <Input sm="6" className="unidades" id="cant_{producto.nombre}" type="number" placeholder="1" max={producto.cantidad} min="1"/>
                        </div>
                        <br/>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        }}
    ></FirestoreCollection>
    )
  }
}

export default Home;
