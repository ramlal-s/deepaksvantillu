var firebase = require("firebase-admin");
var firebaseConfig = {
    apiKey: "AIzaSyAtiXMJM7G2aRBKgURrpBlq5ygKUKeUcqE",
    authDomain: "deepakvantillu-83167.firebaseapp.com",
    databaseURL: "https://deepakvantillu-83167.firebaseio.com",
    projectId: "deepakvantillu-83167",
    storageBucket: "deepakvantillu-83167.appspot.com",
    messagingSenderId: "614876636986",
    appId: "1:614876636986:web:7fe1296d2723bcd76a9203",
    measurementId: "G-3281M6SZQE"
};

var serviceAccount = require("./serviceAccountkey.json");

firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://deepakvantillu-83167.firebaseio.com"
});

var database = firebase.database();
const items = require("./itemsid.json");
var frefp = firebase.database().ref('products/');
frefp.set(items)