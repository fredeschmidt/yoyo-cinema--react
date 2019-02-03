import React from 'react';

const Movie = (props) => {
    return (
        <li>
            <div className="results_item">
                {props.title}
            </div>
            <div className="results_detail">
                <div className="results_detail_img">
                    <img src={'http://image.tmdb.org/t/p/w92' + props.img} alt={props.title} />
                </div>
                <div className="results_detail_info">
                    <small>Resumé:</small><p>{props.resume}</p>
                    <small>Vote average:</small><span>{props.vote}</span>
                </div>
            </div>
        </li>
    )
}

export default Movie;