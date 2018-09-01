import React, {Component} from 'react';
import { Link, withRouter } from 'react-router-dom';
import './Registro.css';
import {Button} from 'reactstrap';
import { auth } from '../../Firebase';

const SignUpPage = ({ history }) => 
  <div>
    <Registro history={history}/>
  </div>

const INITIAL_STATE = {
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

class Registro extends Component{
  constructor(props){
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const {
      email,
      passwordOne,
    } = this.state;

    const {
      history,
    } = this.props;

    auth.doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        this.setState({ ...INITIAL_STATE});
        history.push("/Home");
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  }
  
  render(){

    const {
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '';      

    return(
      <div className="col-sm-12 fondoPrincipal">
        <div className="col-sm-6 col-sm-offset-3 fondo principal">
          <h1 className="inicioSe">Regístrate</h1>
          <form onSubmit={this.onSubmit}>
              <div className="form-group">
                  <label htmlFor="email-input">Dirección correo electrónico</label>
                  <input 
                    value={email} 
                    type="email" 
                    className="form-control" 
                    name="email" 
                    id="email-input" 
                    onChange={event => this.setState(byPropKey('email', event.target.value))}
                    required/>
                  <label className="error">Debes ingresar un email válido</label>
              </div>
              <div className="form-group">
                <label htmlFor="password-input">Contraseña</label>
                <input 
                  value={passwordOne} 
                  type="password" 
                  className="form-control" 
                  name="password One" 
                  id="passwordone-input" 
                  onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
                  required/>
              </div>
              <div className="form-group">
                <label htmlFor="password-input">Repetir Contraseña</label>
                <input
                  value={passwordTwo}
                  type="password"
                  className="form-control"
                  name="password Two"
                  id="passwordtwo-input"
                  onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
                  required />
              </div>
              <div className="enviar">
              <input disabled={isInvalid} value="Registrarse" type="submit" className="btn btn-success center-block btn-lg"/>
              </div>
              {error && <p>{error.message}</p>}
          </form>
        </div>
      </div>
    )
  }
}

const SignUpLink = () =>
  <div>
    <p>
      No tienes una cuenta?
    {' '}
    </p>
    <Link to="/Registro">
      <div className="registrate">
        <Button color="warning" size="lg" className="btn center-block">Sign Up</Button>
      </div>
    </Link>
  </div>    

export default withRouter(SignUpPage);

export{
  Registro,
  SignUpLink
}
