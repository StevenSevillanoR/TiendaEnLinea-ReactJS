//import React, {Component} from 'react';
import { auth } from './firebase';
import firebase from 'firebase/app';
//import { FirestoreProvider } from 'react-firestore';
import '@firebase/firestore';

//Registro con Email y password
export const doCreateUserWithEmailAndPassword = (email, password) =>
  auth.createUserAndRetrieveDataWithEmailAndPassword(email, password);

//Inicio de Sessión Email y pass
export const doSignInWithEmailAndPassword = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);

//Inicio de sesión con Google
export const doSignInWithGoogle = () =>
  auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());

//Cierre de sesión
export const doSignOut = () =>
  auth.signOut();

/*class AuthService extends Component{

  constructor(
    
  ){}

  loginGoogle(){
    return this.firebaseAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  registerUser(email, pass){
    return new Promise((resolve, reject) =>{
      this.firebaseAuth.auth.createUserWithEmailAndPassword(email, pass)
        .then(userData => resolve(userData),
        err => reject(err));
    });
  }

  loginEmail(email, pass){
    return new Promise((resolve, reject) =>{
      this.firebaseAuth.auth.signInWithEmailAndPassword(email, pass)
        .then(userData => resolve(userData),
        err => reject(err));
    });
  }

  getAuth(){
    return this.firebaseAuth.authState.map (auth => auth );
  }

  logout() {
    return this.firebaseAuth.auth.signOut();
  }

}*/
