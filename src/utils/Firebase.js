// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// import {ref} from "firebase/storage";

import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyAoL8sTBMTeMo1vBO5mhKoH4fOneCFaUAQ",
  authDomain: "parking-booking-system-c13d6.firebaseapp.com",
  projectId: "parking-booking-system-c13d6",
  storageBucket: "parking-booking-system-c13d6.appspot.com",
  messagingSenderId: "549378013589",
  appId: "1:549378013589:web:f4f6633b63dd04fcbe9e9c",
  measurementId: "G-S1XWBYS4QE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const storage = getStorage(app);
export const messaging = getMessaging(app);
