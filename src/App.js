import './App.css';
import FilmRanking from "./components/FilmRanking/FilmRanking";

function App() {

    return (
        <div className='container-fluid'>
            <nav className='navbar sticky-top navbar-light bg-dark'>
                <h1 className='navbar-brand text-light'>Movie list</h1>
            </nav>
            <FilmRanking/>
        </div>
    );
}

export default App;
