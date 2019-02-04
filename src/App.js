import React, { Component } from 'react'
import './App.css'
import axios from 'axios'
import Favorites from './components/Favorites'
import Movie from './components/Movie'


class App extends Component {
    constructor(props) {
        super(props)

        // sync state with local storage on load (for saved favorite movies)
        const hasFavoritesInLocalStorage = localStorage.getItem('favoriteMovies') !== null
        const localStorageFavorites = JSON.parse(localStorage.getItem('favoriteMovies'))

        this.state = {
            value: '',
            movies: [],
            favoriteMovies: hasFavoritesInLocalStorage ? localStorageFavorites : []
        }
    }


    // search
    handleChange = (e) => {

        if (e.target.value === '') {
            this.setState({
                value: e.target.value,
                movies: []
            })
        } else {
            this.setState({ value: e.target.value})

            // movies from api
            axios.get('https://api.themoviedb.org/3/search/movie?api_key=4cb1eeab94f45affe2536f2c684a5c9e&', {
                params: {
                    // search for title
                    query: e.target.value
                }
            })
            // update the state with the movies found
            .then(response => {
                this.setState({movies: response.data.results})
            })
            .catch(error => {
                console.log(error)
            })
        }
    }


    // save favorite movie on heart-click and update the state
    handleToggleFavorite = (movie) => {
        
        var favoriteMovies = this.state.favoriteMovies

        if (favoriteMovies.find(favoriteMovie => movie.id === favoriteMovie.id)) {
            favoriteMovies = favoriteMovies.filter(favoriteMovie => movie.id !== favoriteMovie.id)
        } else {
            favoriteMovies.push(movie)
        }

        this.setState({
            favoriteMovies: favoriteMovies
        })
    }


    // when updating the state - update local storage
    componentDidUpdate() {
        localStorage.setItem('favoriteMovies', JSON.stringify(this.state.favoriteMovies))
    }


    // if movie is favorite - heart should highlight
    isFavorite = (id) => {
        return this.state.favoriteMovies.find(favoriteMovie => id === favoriteMovie.id)
    }
    

    render() {
        return (
            <div>
                <Favorites 
                    favoriteMovies={this.state.favoriteMovies}
                    handleToggleFavorite={this.handleToggleFavorite}
                />

                <div className="section">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-sm-8">

                                <div className="section_header">
                                    <h1>Yoyo Cinema</h1>
                                </div>

                                <div className="search">
                                    <input
                                        type="text"
                                        value={this.state.value}
                                        onChange={this.handleChange}
                                        placeholder="Search for your favorite movie"
                                    />
                                </div>

                                <div className="results results--search">
                                    <ul>
                                        {this.state.movies.map( (movie) =>
                                            <Movie 
                                                movie={movie}
                                                toggleFavorite={this.handleToggleFavorite}
                                                isFavorite={this.isFavorite(movie.id)}
                                                key={movie.id.toString()}
                                            />
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App

