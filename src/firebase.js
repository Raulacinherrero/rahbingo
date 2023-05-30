// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, doc, setDoc, getDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDWLPbs-_jEouDbKTMzQZPXRemx84yk13E",
  authDomain: "rah-bingo-2fd5c.firebaseapp.com",
  projectId: "rah-bingo-2fd5c",
  storageBucket: "rah-bingo-2fd5c.appspot.com",
  messagingSenderId: "61845727163",
  appId: "1:61845727163:web:8c4fa6296755cb34e8c69e",
  measurementId: "G-PKWZ9RREWT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

const db = getFirestore(app);

export function uploadCollection(coleccion, id, data) {
  const documentosCollection = collection(db, coleccion);
  const documentoRef = doc(documentosCollection, id);

  setDoc(documentoRef, data)
    .then(() => {
      console.log("Documento creado exitosamente con ID:", id);
    })
    .catch((error) => {
      console.error("Error al crear el documento:", error);
    });
}

export async function actualizarCampoDocumento(coleccion, id, campo, valor) {
  try {
    const documentoRef = doc(db, coleccion, id);

    const documentoSnapshot = await getDoc(documentoRef);
    if (!documentoSnapshot.exists()) {
      console.log("El documento no existe");
      return;
    }

    await setDoc(documentoRef, { [campo]: valor }, { merge: true });

    console.log("Campo actualizado exitosamente:", campo);

  } catch (error) {
    console.error("Error al actualizar campo del documento:", error);
  }
}

export async function obtenerDatosDocumento(coleccion, id) {
  try {
    const documentoRef = doc(db, coleccion, id);
    const documentoSnapshot = await getDoc(documentoRef);

    if (documentoSnapshot.exists()) {
      const datosDocumento = documentoSnapshot.data();
      console.log("Datos del documento:", datosDocumento);
      return datosDocumento;
    } else {
      console.log("El documento no existe");
      return null;
    }
  } catch (error) {
    console.error("Error al obtener datos del documento:", error);
    return null;
  }
}