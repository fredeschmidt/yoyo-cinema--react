import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Movie from './components/Movie';

class App extends Component{

    state= {
        value: '',
        movies: []
    }

    // on keyup in search input
    handleChange = (e) => {

        // value of search
        this.setState({ value: e.target.value});


        // movies from api
        axios.get('https://api.themoviedb.org/3/search/movie?api_key=4cb1eeab94f45affe2536f2c684a5c9e&', {
            params: {
                // search for title
                query: e.target.value
            }
        })
        // updates the state with the movies found based on search value
        .then(response => {
            var results = response.data.results;
            {results.map((result, i)=>(
                this.setState({movies: results})
            ))}
        })
        .catch(error => {
            console.log(error)
        })
    }



    render(){
        return (
            <div className="section">
                <form>
                    <input
                        type="text"
                        value={this.state.value}
                        onChange={this.handleChange}
                        placeholder="Search for your favorite movie"
                    />

                    <ul>
                        {this.state.movies.map( (movie, index) =>
                            <Movie 
                                title={movie.title} 
                                img={movie.poster_path} 
                                resume={movie.overview} 
                                vote={movie.vote_average} 
                                id={movie.id}
                                key={movie.id.toString()}
                            />
                        )}
                    </ul>
                </form>
            </div>
        )
    }
}

export default App;

