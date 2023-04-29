import { useEffect, useState } from 'react';
import { db } from '../config/firebase';
import {
	getDocs,
	collection,
	deleteDoc,
	doc,
	updateDoc
} from 'firebase/firestore';

export default function Movies() {
	const [movieList, setmovieList] = useState([]);

	const [updatedTitle, setUpdatedTitle] = useState('');

	const moviesCollectionRef = collection(db, 'movies');

	async function getMovieList() {
		try {
			const data = await getDocs(moviesCollectionRef);
			const filteredData = data.docs.map((doc) => ({
				id: doc.id,
				...doc.data()
			}));
			setmovieList(filteredData);
			getMovieList();
		} catch (err) {
			console.log(err);
		}
	}

	async function deleteMovie(id) {
		try {
			const movieDoc = doc(db, 'movies', id);
			await deleteDoc(movieDoc);
		} catch (err) {
			console.log(err);
		}
	}

	async function updateMovie(id) {
		const movieDoc = doc(db, 'movies', id);
		await updateDoc(movieDoc, {
			title: updatedTitle
		});
	}

	useEffect(() => {
		getMovieList();
	}, []);

	return (
		<div>
			{movieList.map((movie) => (
				<div key={movie.id}>
					<h2
						style={{
							color: movie.hasOscar ? 'red' : 'black'
						}}
					>
						Title: {movie.title}
					</h2>
					<p>Genre: {movie.genre}</p>
					<p>Release Year: {movie.releaseYear}</p>
					<button onClick={() => deleteMovie(movie.id)}>Delete Movie</button>
					<br />
					<br />
					<input
						type='text'
						placeholder='New Title'
						onChange={(e) => setUpdatedTitle(e.target.value)}
					/>
					<button onClick={() => updateMovie(movie.id)}>Update Title</button>
				</div>
			))}
		</div>
	);
}
