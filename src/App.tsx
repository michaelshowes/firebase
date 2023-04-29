import './app.scss';
import AddMovie from './components/AddMovie';
import Auth from './components/Auth';
import Movies from './components/Movies';
import SendImages from './components/SendImages';

export default function App() {
	return (
		<div className='app'>
			<h1>Firebase</h1>
			{/* <Auth />
			<br />
			<br />
			<AddMovie />
			<Movies />
			<br />
			<br /> */}
			<SendImages />
		</div>
	);
}
