import React, {useEffect, useState} from 'react';
import Card from "./Card/Card";

const FilmRanking = () => {
    const [films, setFilms] = useState([]);
    const [loading, setLoading] = React.useState(true);

    const handleRatingChange = (id, rating) => {
        const updatedFilms = films.map((film) =>
            film.id === id ? {...film, rating} : film
        );
        setFilms(updatedFilms);
    };

    // Reorder the films based on their ratings
    const reorderedFilms = [...films].sort((a, b) => b.rating - a.rating);

    useEffect(() => {
        async function fetchMovies() {
            try {
                const movies = await fetch('data.json');
                const moviesJSON = await movies.json();
                // moviesJSON.sort((a, b) => b.rating - a.rating);
                if (moviesJSON) {
                    setFilms(moviesJSON);
                    setLoading(false);
                }
            } catch (e) {
                console.error(e);
            }
        }

        fetchMovies()
    }, [])
    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div className='row'>
            {reorderedFilms.map((film) =>
                <div className='col-sm-2'>
                    <Card ratingChange={handleRatingChange} key={film.id} movie={film}/>
                </div>
            )}
        </div>
    );
};

export default FilmRanking;
