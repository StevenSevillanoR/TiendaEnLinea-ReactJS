import React, {Component} from 'react';
import { ButtonToolbar, Button, Label, ButtonGroup, Form, FormControl, FormGroup } from 'react-bootstrap';
import './Login.css';

class Login extends Component{
  render(){
    return(
      <div className="col-sm-12 FondoPrincipal">
        <div className="col-sm-6 col-sm-offset-3 fondo principal">
          <h1 className="inicioSe">Iniciar Sesión</h1>
          <Form>
            <FormGroup className="form-group">
              <Label>Dirección correo electrónico</Label>
              <FormControl type="email" className="FormControl" id="email-input" name="email" required></FormControl>
              <label className="error">Debes ingresar un email válido</label>
            </FormGroup>
            <FormGroup className="form-group">
              <Label>Contraseña</Label>
              <FormControl type="password" className="form-control" id="password-input" name="password" required></FormControl>
            </FormGroup>
            <ButtonToolbar className="enviar">
              <Button type="submit" bsStyle="success" bsSize="lg" bsClass="btn btn-success center-block btn-lg">Ingresar</Button>
            </ButtonToolbar>
          </Form>
          <div className="row">
            <div className="col-sm-12 mx-auto mt-2">
              <div className="card">
                <ButtonGroup className="card-body d-flex justify-content-around">
                  <Button className="btn btn-lg btn-facebook"><i className="fa fa-facebook"></i> Facebook</Button>
                  <Button className="btn btn-lg btn-google"><i className="fa fa-google-plus" aria-hidden="true"></i> Google</Button>
                  <Button className="btn btn-lg btn-twitter"><i className="fa fa-twitter"></i> Twitter</Button>
                </ButtonGroup>
                <div className="registrate">
                  <input value="Sign Up" type="button" className="btn btn-secondary center-block btn-lg"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Login;
