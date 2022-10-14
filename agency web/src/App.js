import './App.scss';
import Header from './components/Header/Header';
import Work from './components/Work/Work';
import Services from './components/Service/Services';
import Team from './components/Team/Team';
import Footer from './components/Footer/Footer';

function App() {
	return (
		<>
			<Header />
			<main>
				<Work />
				<Services />
				<Team />
			</main>
			<Footer />
		</>
	);
}

export default App;
