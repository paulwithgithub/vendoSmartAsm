import './index.css'

const ShowMovies = props => {
    const {moviesList} = props;
    const {posterPath, title, releaseDate, voteAverage, overview} = moviesList
  
    return(
        <div className='movie-item'>
            <img src={`https://image.tmdb.org/t/p/original${posterPath}`} alt={title} />
            <div className='movie-item-descp'>
                <h1>{title}</h1>
                <p  className='release-date'>RELEASE DATE: {releaseDate}</p>
                <p  className='vote-average'>RATING: {voteAverage}</p>
                <p  className='overview'>{overview}</p>
            </div>
        </div>
    )
}

export default ShowMovies