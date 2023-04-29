import { useState } from 'react';
import { auth, googleProvider } from '../config/firebase';
import {
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	signInWithPopup,
	signOut
} from 'firebase/auth';

export default function Auth() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	async function signUp() {
		try {
			await createUserWithEmailAndPassword(auth, email, password);
		} catch (err) {
			console.log(err);
		}
	}

	async function signIn() {
		try {
			await signInWithEmailAndPassword(auth, email, password);
		} catch (err) {
			console.log(err);
		}
	}

	async function googleSignIn() {
		try {
			await signInWithPopup(auth, googleProvider);
		} catch (err) {
			console.log(err);
		}
	}

	async function logout() {
		try {
			await signOut(auth);
		} catch (err) {
			console.log(err);
		}
	}

	return (
		<div>
			<input
				type='text'
				placeholder='Email'
				onChange={(e) => setEmail(e.target.value)}
			/>
			<input
				type='password'
				placeholder='Password'
				onChange={(e) => setPassword(e.target.value)}
			/>
			<button onClick={signUp}>Sign Up</button>

			<button onClick={signIn}>Sign-In</button>

			<button onClick={googleSignIn}>Sign-In with Google</button>

			<button onClick={logout}>Log Out</button>
		</div>
	);
}
