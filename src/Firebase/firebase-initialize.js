import { initializeApp } from "firebase/app";
import firebaseConfig from "./Firebase-config";



const firebaseConfigarationInitiliZing = () => {
    initializeApp(firebaseConfig);
}

export default firebaseConfigarationInitiliZing;