import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyDPIe6z6dLQgHE3D6d66FJRAvLqFYK8Gp8",
    authDomain: "digihouse-cb71a.firebaseapp.com",
    projectId: "digihouse-cb71a",
    storageBucket: "digihouse-cb71a.appspot.com",
    messagingSenderId: "696768619172",
    appId: "1:696768619172:web:d69c4e5ad8c24d7fddbc31",
    measurementId: "G-N2B7XJNQ10"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore()
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();


export { auth, provider };
export default db;