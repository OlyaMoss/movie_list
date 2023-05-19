import React from 'react';

const Card = ({movie,ratingChange}) => {
    return (
        <div className='card'>
            <img src={movie.img.src} className='card-img-top' alt={movie.img.alt} width='200'/>
            <div>
                <h2 className='card-title'>{`${movie.title} (${movie.year})`}</h2>
            </div>
            <ul className='list-group list-group-flush'>
                <li className='list-group-item'>{`Distributor: ${movie.distributor}`}</li>
                <li className='list-group-item'>{`Amount: ${movie.amount}`}</li>
            </ul>
            <div key={movie.id}>
                <input
                    type="range"
                    min="0"
                    max="10"
                    value={movie.rating}
                    onChange={(e) => ratingChange(movie.id, e.target.value)}
                />
                <span>{movie.rating}</span>
            </div>
        </div>
    );

}
export default Card;