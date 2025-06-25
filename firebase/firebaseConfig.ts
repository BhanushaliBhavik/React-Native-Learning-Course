import { getApp, getApps, initializeApp } from '@react-native-firebase/app';
import { getAuth } from '@react-native-firebase/auth';
let app;
// Initialize Firebase App
if (getApps().length === 0) {
  console.log('Initializing Firebase app');
  app = initializeApp();
  console.log('Firebase app initialized');
} else {
  app = getApp();
  console.log('Using existing Firebase app');
}
const auth = getAuth(app);
// Auth is automatically initialized with React Native Firebase
console.log('Firebase auth ready');
export { app, auth };





// Initialize Firebase App
// const firebaseConfig = {
//   apiKey: "AIzaSyDbpdY2PrFEoKdKVbsqMC1qf-7xiegaKPc",
//   authDomain: "react-native-app-17345.firebaseapp.com",
//   projectId: "react-native-app-17345",
//   storageBucket: "react-native-app-17345.firebasestorage.app",
//   messagingSenderId: "1007438608716",
//   appId: "1:1007438608716:web:e035cab6dec33d0de0f7e9"
// };

//   console.log('Initializing Firebase app');
//  const app = initializeApp(firebaseConfig);
// console.log('Firebase app initialized');

// const auth = getAuth(app);
// // Auth is automatically initialized with React Native Firebase
// console.log('Firebase auth ready');
// export { app, auth };

