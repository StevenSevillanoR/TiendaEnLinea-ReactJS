import firebase from 'firebase/app';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAry5GZjem1fKYv6rHFBG-1YntzEQ4iIyU",
    authDomain: "tiendaenlinea-6ea52.firebaseapp.com",
    databaseURL: "https://tiendaenlinea-6ea52.firebaseio.com",
    projectId: "tiendaenlinea-6ea52",
    storageBucket: "tiendaenlinea-6ea52.appspot.com",
    messagingSenderId: "932548095533"
};

if(!firebase.apps.length){
    firebase.initializeApp(config);
}

const auth = firebase.auth();

export{
    auth,
};