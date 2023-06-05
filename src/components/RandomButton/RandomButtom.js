import React, { useState } from 'react';
import { fromEvent, interval } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

const RandomButton = ({ratingChange,films}) => {
    const [movies] = useState(films);
    console.log(movies)

    const [displayedMovie, setDisplayedMovie] = useState(null);

    const handleClick = () => {
        // Select a random movie
        const randomMovie = movies[Math.floor(Math.random() * movies.length)];

        // Set the movie to be displayed
        setDisplayedMovie(randomMovie);

        // Set a random time (between 3 and 8 seconds) for how long the movie will be displayed
        const displayTime = Math.floor(Math.random() * 6000) + 3000;

        // Clear the displayed movie after the specified display time
        const timer$ = interval(displayTime).pipe(takeUntil(fromEvent(document, 'click')));
        timer$.subscribe(() => setDisplayedMovie());
    };

    return (
        <div>
            <div className='d-flex justify-content-center p-2'>
                <button type="button" className='btn btn-dark mt-4' onClick={handleClick}>Show Random Movie</button>
        </div>

            {displayedMovie && (
                <div className='card d-flex col-sm-2'>
                    <img src={displayedMovie.img.src} className='card-img-top' alt={displayedMovie.img.alt} width='200'/>
                    <div>
                        <h2 className='card-title'>{`${displayedMovie.title} (${displayedMovie.year})`}</h2>
                    </div>
                    <ul className='list-group list-group-flush'>
                        <li className='list-group-item'>{`Distributor: ${displayedMovie.distributor}`}</li>
                        <li className='list-group-item'>{`Amount: ${displayedMovie.amount}`}</li>
                    </ul>
                    <div>
                        <input
                            type="range"
                            min="0"
                            max="10"
                            value={displayedMovie.rating}
                            onChange={(e) => ratingChange(displayedMovie.id, e.target.value)}
                        />
                        <span>{displayedMovie.rating}</span>
                    </div>
                </div>
            )}
        </div>
    );
};
export default RandomButton;
