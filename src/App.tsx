import './app.scss';
import AddMovie from './components/AddMovie';
import Auth from './components/Auth';
import MovieList from './components/MovieList';
import SendImages from './components/SendImages';

export default function App() {
	return (
		<div className='app'>
			<h1>Firebase</h1>
			<Auth />
			<br />
			<br />
			<AddMovie />
			<MovieList />
			<br />
			<br />
			<SendImages />
		</div>
	);
}
