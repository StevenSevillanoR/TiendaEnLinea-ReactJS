import firebase from '@firebase/app';
import {db} from '../Firebase/firebase';
import CircularJSON from 'circular-json';

let productos = [];
let getProducts = [];

const firestore = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true };
firestore.settings(settings);

db.collection("productos").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        const id = doc.id;
        const nombre = doc.data().nombre;
        const precio = doc.data().precio;
        const cantidad = doc.data().cantidad;
        //const imagen = doc.data().imagen;
        productos.push({ id: id, nombre: nombre, precio: precio, cantidad: cantidad});
        //console.log(productos);
        //console.log(`${doc.id} => ${doc.data()}`);
    });
    //console.log(productos);
    getProducts.push(productos);
    sessionStorage.setItem('Products', CircularJSON.stringify(getProducts[0]));
    
    console.log(sessionStorage.getItem('Products'));
});


//console.log(productos);

//Exportamos los productos en un arreglo como un pops
export const getProductos = () => {
    console.log(productos)
    console.log(sessionStorage.getItem('Products'));
    let products = JSON.parse(sessionStorage.getItem('Products'));
    //let productos = [];
    /*getProducts.forEach(producto =>{
        productos.push({
            id: producto.id,
            nombre: producto.nombre,
            cantidad: producto.cantidad,
            precio: producto.precio
        })
    })*/
    console.log(products);
    return products;
}

export {
    productos,
}