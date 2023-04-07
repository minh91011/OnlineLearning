// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getDatabase } from 'firebase/database';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//     apiKey: 'AIzaSyCfUxjlAbkXAK33g0FHdI582jSDAI7JAKA',
//     authDomain: 'onlinelearning-swp.firebaseapp.com',
//     projectId: 'onlinelearning-swp',
//     storageBucket: 'onlinelearning-swp.appspot.com',
//     messagingSenderId: '240378417564',
//     appId: '1:240378417564:web:ae1842c4d85ffd86487859',
//     measurementId: 'G-8L6VEF69BC',
// };
const firebaseConfig = {
    apiKey: 'AIzaSyBtuMX4XCLhWHxNDukW_8DYUoRRhuA59_w',
    authDomain: 'nhatminh-7c9ff.firebaseapp.com',
    projectId: 'nhatminh-7c9ff',
    storageBucket: 'nhatminh-7c9ff.appspot.com',
    messagingSenderId: '835368447800',
    appId: '1:835368447800:web:cfe42be5288c785cfc1bcd',
    measurementId: 'G-N0TD921CKB',
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const database = getDatabase(app);
