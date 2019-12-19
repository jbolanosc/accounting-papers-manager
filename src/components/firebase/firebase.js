import * as firebase from "firebase";

const config = {
  apiKey: "AIzaSyDGaTeGwBX2T6KEgP4VnvGvZBafL9OSjhI",
  authDomain: "contadores-tagamandapio.firebaseapp.com",
  databaseURL: "https://contadores-tagamandapio.firebaseio.com",
  projectId: "contadores-tagamandapio",
  storageBucket: "contadores-tagamandapio.appspot.com",
  messagingSenderId: "762315031857",
  appId: "1:762315031857:web:f5e09cfc739e9faed59c10",
  measurementId: "G-S8ED798G2E"
};
firebase.initializeApp(config);

firebase.firestore();

export default firebase;
