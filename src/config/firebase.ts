// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
	apiKey: 'AIzaSyBw0U5eJIWICzgg1udUvvnFusM0TfGFsBA',
	authDomain: 'fir-8f62b.firebaseapp.com',
	projectId: 'fir-8f62b',
	storageBucket: 'fir-8f62b.appspot.com',
	messagingSenderId: '744239781683',
	appId: '1:744239781683:web:d375d7b3777233aa575046'
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
