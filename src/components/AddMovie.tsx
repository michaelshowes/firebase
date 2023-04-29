import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db, auth } from '../config/firebase';
import getMovieList from './Movies';

export default function AddMovie() {
	const [newMovie, setNewMovie] = useState({
		title: '',
		genre: '',
		releaseYear: 0,
		hasOscar: false
	});

	const getMovies = getMovieList();

	const moviesCollectionRef = collection(db, 'movies');

	async function submitMovie() {
		try {
			await addDoc(moviesCollectionRef, {
				title: newMovie.title,
				genre: newMovie.genre,
				releaseYear: newMovie.releaseYear,
				hasOscar: newMovie.hasOscar,
				userId: auth?.currentUser?.uid
			});
			getMovies;
		} catch (err) {
			console.error(err);
		}
	}

	return (
		<div>
			<input
				type='text'
				placeholder='Movie title'
				onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })}
			/>
			<br />
			<br />
			<input
				type='text'
				placeholder='Genre'
				onChange={(e) => setNewMovie({ ...newMovie, genre: e.target.value })}
			/>
			<br />
			<br />
			<input
				type='number'
				placeholder='Release Year'
				name=''
				id=''
				onChange={(e) =>
					setNewMovie({ ...newMovie, releaseYear: e.target.valueAsNumber })
				}
			/>
			<br />
			<br />
			<label>
				<input
					type='checkbox'
					name=''
					id=''
					checked={newMovie.hasOscar}
					onChange={(e) =>
						setNewMovie({ ...newMovie, hasOscar: e.target.checked })
					}
				/>
				<span>Received an Oscar?</span>
			</label>
			<br />
			<br />
			<button onClick={submitMovie}>Submit Movie</button>
		</div>
	);
}
