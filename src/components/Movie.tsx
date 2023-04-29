import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useState } from 'react';

type Props = {
	movie: {
		id: string;
		title: string;
		genre: string;
		releaseYear: number;
		hasOscar: boolean;
	};
};

export default function Movie({ movie }: Props) {
	const [updatedTitle, setUpdatedTitle] = useState('');

	async function deleteMovie(id: string) {
		try {
			const movieDoc = doc(db, 'movies', id);
			await deleteDoc(movieDoc);
		} catch (err) {
			console.log(err);
		}
	}

	async function updateMovie(id: string) {
		const movieDoc = doc(db, 'movies', id);
		await updateDoc(movieDoc, {
			title: updatedTitle
		});
	}

	const { id, title, genre, releaseYear, hasOscar } = movie;

	return (
		<div key={id}>
			<h2
				style={{
					color: hasOscar ? 'red' : 'black'
				}}
			>
				Title: {title}
			</h2>
			<p>Genre: {genre}</p>
			<p>Release Year: {releaseYear}</p>
			<button onClick={() => deleteMovie(id)}>Delete Movie</button>
			<br />
			<br />
			<input
				type='text'
				placeholder='New Title'
				onChange={(e) => setUpdatedTitle(e.target.value)}
			/>
			<button onClick={() => updateMovie(id)}>Update Title</button>
		</div>
	);
}
