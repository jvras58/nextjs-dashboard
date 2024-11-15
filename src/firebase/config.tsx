
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
import { getFirestore } from "firebase/firestore";

// FIXME: não funciona num sei pq... tenho que sempre colocar as configurações direto
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

// Mas consegue printar aqui todas as variaveis certinha.....
console.log("1",process.env.REACT_APP_API_KEY);
console.log("2",process.env.REACT_APP_AUTH_DOMAIN)
console.log("3",process.env.REACT_APP_PROJECT_ID)
console.log("4",process.env.REACT_APP_STORAGE_BUCKET)
console.log("5",process.env.REACT_APP_MESSAGING_SENDER_ID)
console.log("6",process.env.REACT_APP_APP_ID)
console.log("7",process.env.REACT_APP_MEASUREMENT_ID)


// Initialize Firebase
const app = initializeApp(firebaseConfig);
// eslint-disable-next-line no-unused-vars
const storage = getStorage(app);
const db = getFirestore(app);

export { db };
export { storage };


// AVISO: Não esqueça de configurar as regras de segurança no Firebase para permitir a leitura e escrita no banco de dados. 

