import React from 'react'
import Movie from './Movie'

// Favorite bar reuse movie component and methods

const handleToggleFavoriteFromFavorites = (props, movie)  => {
    props.handleToggleFavorite(movie)
}

const isFavorite = (props, id) => {
    return props.favoriteMovies.find(favoriteMovie => id === favoriteMovie.id)
}

const Favorites = (props) => {
    return (
        <div className="favorites-bar">
            <div id="favorites-bar_toggle">
                <input type="checkbox" />
                <span>
                    All your <i className="fas fa-heart"></i>
                </span>

                <div className="favorites-bar_container">
                    <h2>Your list of favorites</h2>
                    <div className="results results--favorites">
                        <ul>
                            {props.favoriteMovies.map( (favoriteMovie) =>
                                <Movie 
                                    movie={favoriteMovie}
                                    toggleFavorite={(movie) => handleToggleFavoriteFromFavorites(props, movie)}
                                    isFavorite={() => isFavorite(props, favoriteMovie.id)}
                                    key={favoriteMovie.id.toString()}
                                />
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Favorites