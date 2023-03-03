import {useState, useEffect} from 'react';
import MovieCard from './MovieCard';
import './App.css';

import SearchIcon from './search.svg';


const api_url = 'http://www.omdbapi.com?apikey=3601d0aa';
const movie1 = {
    'Title': 'Amazing Spiderman Syndrome',
    'Year': '2012',
    'imdbID': 'tt2586634',
    'Type': 'movie',
    'Poster': 'N/A'
};

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = async (title) => {
        const response = await fetch(`${api_url}&s=${title}`);
        const data = await response.json();
        console.log('data:', data);
        setMovies(data.Search);
    };

    useEffect(() => {
        searchMovies('Spiderman'); 
    }, []);

    console.log('movies:', movies);

    return (
       <div className='app'>
        <h1>Picture Perfect</h1>
        <div className='search'>
            <input
             placeholder='Search for Movies'
             value={searchTerm}
             onChange={(e)=>setSearchTerm(e.target.value)}
            />
            <img
                src={SearchIcon}
                alt ="Search"
                onClick={() => searchMovies(searchTerm)} 
            />
        </div>
        {
            movies?.length > 0
            ? (
                <div className='container'>
                    {movies.map((movie) => (
                        <MovieCard movie={movie} key={movie.imdbID} />
                    ))}
                </div>
            )
            : (
                <div className='empty'>
                    <h2>No Movies found</h2>
                </div>
            )
        }
       </div>
    );
};

export default App;
