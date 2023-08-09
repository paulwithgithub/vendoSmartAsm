import {Component} from 'react';
import ShowMovies from './ShowMovies';
import Pagination from './Pagination';
import './App.css';

class App extends Component {
  state = {moviesDataList : [], searchMovie: '', page: 1, totalPages: 0, totalResults: 1}

  componentDidMount(){
    this.getMoviesData()
  }

  onSearchInput= (e) => {
    this.setState({searchMovie : e.target.value})
  }

  onClickSearchBtn = () => {
    this.getMoviesData()
  }

  getMoviesData = async () => {
    const {searchMovie, page} = this.state;
 

    const url = searchMovie === "" ?  `https://api.themoviedb.org/3/trending/all/week?&api_key=96ae9af1d5e7e9f920f4f8c8c50da909&page=${page}`: `https://api.themoviedb.org/3/search/movie?query=${searchMovie}&api_key=96ae9af1d5e7e9f920f4f8c8c50da909&page=${page}`
    
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NmFlOWFmMWQ1ZTdlOWY5MjBmNGY4YzhjNTBkYTkwOSIsInN1YiI6IjY0ZDExMTcxZDhkMzI5MDExZTc0YWRkNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pJOnJhHsgWEGMHrLXrelW6W1Vc8MUUyrAug7bh0qWE0'
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
        accept: 'application/json'
      },
      method : "GET"
    };

    const response = await fetch(url, options);
    const data = await response.json()
    console.log(data)
    
    if (data.length === 0){
      //pass
    }else {
    const updatedData = data.results.map((each) => ({
      adult: each.adult,
      backdropPath: each.backdrop_path,
      genreIds: each.genre_ids,
      id: each.id,
      originalLanguage: each.original_language,
      originalTitle: each.original_title,
      overview : each.overview,
      popularity: each.popularity,
      posterPath : each.poster_path,
      releaseDate : each.release_date,
      title : each.title,
      video : each.video,
      voteAverage : each.vote_average,
      voteCount : each.vote_count,
    }))
    console.log(data.results)
    this.setState({moviesDataList: updatedData, totalPages: data.total_pages, totalResults: data.total_results})
  }
}

  selectPageHolder = (index) => {
    const {totalPages} = this.state;
    if (index >= 1 && index <= totalPages){
    this.setState({page: index}, this.getMoviesData)

    }
  }

  onPageChange = (value) => {
    const {page} = this.state;

    if (value === '&laquo;' || value === "... "){
      this.setState({page: 1}, this.getMoviesData);
    }else if (value === '&lsaquo;'){
      if (page !== 1){
        this.setState(prev => ({page: prev.page-1}), this.getMoviesData);
      }
    } else if (value === '&rsaquo;'){
        if (page !== this.toTotalPage()){
        this.setState(prev => ({page: prev.page+1}), this.getMoviesData);
        }
    }else if (value === '&raquo;' || value === " ..."){
      this.setState({page: this.toTotalPage()}, this.getMoviesData);
    }else {
      this.setState({page: value}, this.getMoviesData);
    }
  }

  toTotalPage = () => {
    const {totalPages} = this.state;
    return Math.ceil(totalPages/2)
  }

  render(){
    const {moviesDataList, page} = this.state;

   let totalPage = this.toTotalPage()

    return(
      <div className='movie-search-api-container'>
        <div className='main-nav'>
          <h1 className='nav-heading'>MOVIE NAME</h1>
          <input placeholder='Search' type='search' className='search-movie-name' onChange={this.onSearchInput}/>
          <button type='button' className='search-btn' onClick={this.onClickSearchBtn}>Search</button>
        </div>

        <ul className='movies-list'>
        {moviesDataList.map(eachMovie => (
          <ShowMovies moviesList={eachMovie} key={eachMovie.id}/>
        ))}
        </ul>

        <Pagination totalPage={totalPage} page={page} siblings={1} onPageChange={this.onPageChange}/>
      </div>
          
    )
  }
}

export default App;
