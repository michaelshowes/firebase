import { useEffect, useState } from 'react';
import { db } from '../config/firebase';
import { getDocs, collection } from 'firebase/firestore';
import Movie from './Movie';

export default function Movies() {
	const [movieList, setmovieList] = useState([]);

	const moviesCollectionRef = collection(db, 'movies');

	async function getMovieList() {
		try {
			const data = await getDocs(moviesCollectionRef);
			const filteredData = data.docs.map((doc) => ({
				id: doc.id,
				...doc.data()
			}));
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			setmovieList(filteredData);
			getMovieList();
		} catch (err) {
			console.log(err);
		}
	}

	useEffect(() => {
		getMovieList();
	}, []);

	return (
		<div>
			{movieList.map((movie) => (
				<Movie movie={movie} />
			))}
		</div>
	);
}
