import React, {Component} from 'react';
import { ButtonToolbar, Button, Label, ButtonGroup, Form, FormControl, FormGroup } from 'react-bootstrap';
import { auth } from '../../Firebase';
import { withRouter } from 'react-router-dom';
import './Login.css';
import { SignUpLink } from '../Register/Registro';
import SweetAlert from 'sweetalert2-react';

const SignInPage = ({ history }) =>
  <div>
    <Login history={history} />
  </div>

const INITIAL_STATE = {
  email: '',
  password: '',
  isLoginGoogle: false,
  error: null,
  show: false,
};

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

class Login extends Component{

  constructor(props){
    super(props)
    this.state = { ...INITIAL_STATE };
  }

  onSubmitLogin = (event) => {
    
    const {
      email,
      password,
      isLoginGoogle,
    } = this.state;
    
    const {
      history,
    } = this.props;

    auth.doSignInWithEmailAndPassword(email, password)
      .then(()=>{
        this.setState({isLoginGoogle:false});
        localStorage.setItem("GoogleKey", this.state.isLoginGoogle);
        sessionStorage.setItem('Login', JSON.stringify(true));
        console.log(JSON.parse(sessionStorage.getItem('Login')));
        this.setState({...INITIAL_STATE});
        history.push("/home");
      }).catch((err)=>{
        if (err.message === 'There is no user record corresponding to this identifier. The user may have been deleted.'){
          this.setState({ error: 'No hay registro de usuario correspondiente a este identificador. El usuario puede haber sido eliminado.', show: true });
        }else{
          this.setState({ error: 'La contraseña no es válida o el usuario no tiene una contraseña.', show: true });
        }
        
        console.log(err, this.state.error, this.state.show);
      });

     event.preventDefault(); 
  }  

  onSubmitGoogle = (event) => {

    const {
      isLoginGoogle,
    } = this.state;

    const {
      history,
    } = this.props;

    auth.doSignInWithGoogle()
      .then(() => {
        console.log('entre');
        this.setState({ isLoginGoogle: true });
        localStorage.setItem("GoogleKey", this.state.isLoginGoogle);
        sessionStorage.setItem('Login', JSON.stringify(true));
        console.log(JSON.parse(localStorage.getItem('GoogleKey')));
        console.log(JSON.parse(sessionStorage.getItem('Login')));
        history.push("/home");
      }).catch((err) => {
        this.isLoginGoogle = false;
        this.setState(byPropKey('error', err));
        console.log(err);
      });

    event.preventDefault();
  } 

  componentWillMount(){
    this.setState({show: true})
    console.log(this.state.show)
  }

  render(){

    const{
      email,
      password,
      error,
      show,
    } = this.state;

    const emailValid = email.includes('@') && (email.includes('.com') || email.includes('.co') || email.includes('.es'));

    const isInvalid = 
      password === '' ||
      email === '' ||
      !emailValid;

    return(
      <div className="col-sm-12 FondoPrincipal">
        <div className="col-sm-6 col-sm-offset-3 fondo principal">
          <h1 className="inicioSe">Iniciar Sesión</h1>
          <Form onSubmit={this.onSubmitLogin}>
            <FormGroup className="form-group">
              <Label>Dirección correo electrónico</Label>
              <FormControl  
                type="email" 
                className="FormControl" 
                id="email-input" 
                name="email"
                value={email}
                onChange={event => this.setState(byPropKey('email', event.target.value))} 
                required></FormControl>
              <Label className="error" hidden={emailValid}>Debes ingresar un email válido</Label>
            </FormGroup>
            <FormGroup className="form-group">
              <Label>Contraseña</Label>
              <FormControl 
                type="password" 
                className="form-control" 
                id="password-input" 
                value={password}
                onChange={event => this.setState(byPropKey('password', event.target.value))}
                name="password" 
                required></FormControl>
            </FormGroup>
            <ButtonToolbar className="enviar">
              <Button type="submit" disabled={isInvalid} bsStyle="success" bsSize="lg" bsClass="btn btn-success center-block btn-lg">Ingresar</Button>
            </ButtonToolbar>
          </Form>
          <div className="row">
            <div className="col-sm-12 mx-auto mt-2">
              <div className="card">
                <ButtonGroup className="card-body d-flex justify-content-around brands-buttons">
                  <Button disabled={true} className="btn btn-lg btn-facebook block"><i className="fab fa-facebook-f"></i> Facebook</Button>
                  <Button className="btn btn-lg btn-google block" onClick={this.onSubmitGoogle}><i className="fab fa-google-plus-g"></i> Google</Button>
                  <Button disabled={true} className="btn btn-lg btn-twitter block"><i className="fab fa-twitter"></i> Twitter</Button>
                </ButtonGroup>
                <SignUpLink />
              </div>
            </div>
          </div>
          {console.log(show)}
          {error && 
            <SweetAlert 
              show={show}
              title="Acceso Denegado"
              type = 'error'
              text={this.state.error}
              onConfirm={() => this.setState({ show: false })}
            />
          }
        </div>
      </div>
    )
  }
}

export default withRouter(SignInPage);

export {
  Login,
}
