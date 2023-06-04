import React, {useEffect, useState} from 'react';
import Card from "../Card/Card";
import RandomButton from "../RandomButton/RandomButtom";

const FilmRanking = () => {
    const [films, setFilms] = useState([]);
    const [loading, setLoading] = React.useState(true);

    const handleRatingChange = (id, rating) => {
        const updatedFilms = films.map((film) =>
            film.id === id ? {...film, rating} : film
        );
        setFilms(updatedFilms);
    };

    useEffect(() => {
        async function fetchMovies() {
            try {
                const movies = await fetch('data.json');
                const moviesJSON = await movies.json();
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
    // Reorder the films based on their ratings
    const reorderedFilms = [...films].sort((a, b) => b.rating - a.rating);
    return (
        <div>
            <div className='d-flex flex-lg-wrap'>
                {reorderedFilms.map((film) =>
                    <div key={film.id} className='col-sm-2 p-2'>
                        <Card ratingChange={handleRatingChange} movie={film}/>
                    </div>
                )}
            </div>

            <div>
                <RandomButton ratingChange={handleRatingChange} films={reorderedFilms}/>
            </div>
        </div>

);
};

export default FilmRanking;
