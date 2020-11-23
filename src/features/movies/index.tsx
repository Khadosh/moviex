import React, { useEffect, useState } from 'react';
import { CustomDialog } from 'react-st-modal';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMovies, selectMovies } from './movies.slice';
import MovieDescription from './movieDescription';
import { 
  MovieList, 
  Movie, 
  MovieScore, 
  Header, 
  Form,
  SearchBar
} from './styles';
import SearchIcon from './images/search-icon.png';

export function Movies() {
  const movies = useSelector(selectMovies)
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useState('');

  useEffect(() => {
    dispatch(fetchMovies())
  }, [dispatch])

  const search = evt => {
    evt.preventDefault();
    dispatch(fetchMovies(searchParams))
  }

  return (
    <>
      <Header>
        <Form onSubmit={ search }>
          <SearchBar
            value={searchParams}
            onChange={ evt => setSearchParams(evt.target.value)}
            placeholder="Seach movies by title..."
            bg={SearchIcon}
          />
        </Form>
      </Header>
      <MovieList>
        { movies.map(movie => (
          <Movie bg={movie.poster_path} onClick={() => 
            CustomDialog(<MovieDescription movie={movie} />, {
              title: movie.title,
              showCloseIcon: true,
            })
          }
          >
            <MovieScore>{movie.vote_average}</MovieScore>
          </Movie>
        ))} 
      </MovieList>
    </>
  );
}
