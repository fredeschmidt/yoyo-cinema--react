import React, { Component } from 'react'

class Movie extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showDetails: false
        }
    }

    toggleDetails(e) {
        e.preventDefault()
        this.setState(prevState => ({
            showDetails: !prevState.showDetails
        }))
    }

    render() {
        return (
            <li>
                <div className="results_item">
                    {this.props.movie.title}
                    <div className="results_item_choices">
                        <button className="btn btn--rounded btn--details" onClick={(e) => this.toggleDetails(e)}>{this.state.showDetails ? 'Hide details' : 'Show details'}</button>
                        <i className={`fa-heart i--favorite ${this.props.isFavorite ? 'fas' : 'far'}`} onClick={() => this.props.toggleFavorite(this.props.movie)}></i>
                    </div>
                </div>
                {this.state.showDetails && 
                    <div className="results_detail">
                        <div className="results_detail_img">
                            <img src={'http://image.tmdb.org/t/p/w92' + this.props.movie.poster_path} alt={this.props.movie.title} />
                        </div>
                        <div className="results_detail_info">
                            <small>Resumé:</small><p>{this.props.movie.overview}</p>
                            <small>Vote average:</small><span>{this.props.movie.vote_average}</span>
                        </div>
                    </div>
                }
            </li>
        )
    }
}

export default Movie