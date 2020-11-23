import React, { useEffect, useState } from 'react';
import { CustomDialog } from 'react-st-modal';
import { useSelector, useDispatch } from 'react-redux';
import { 
  fetchMovies, 
  selectMovies, 
  selectFilter, 
  selectFetching,
  setFilter
} from './movies.slice';
import MovieDescription from './movieDescription';
import { 
  MovieList, 
  Movie, 
  MovieScore, 
  Header, 
  Form,
  SearchBar,
  FilterRanking,
  StarButton
} from './styles';
import SearchIcon from './images/search-icon.png';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';

export function Movies() {
  const movies = useSelector(selectMovies);
  const filter = useSelector(selectFilter);
  const fetching = useSelector(selectFetching);
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
        <FilterRanking>
          <p>Rating</p>
          {
            new Array(5).fill('').map((_, idx) => (
              <StarButton
                ml={idx === 0 ? '1rem' : '0'}
                onClick={() => dispatch(setFilter(filter === idx + 1 ? 0 : idx + 1))}
              >
                { idx >= filter ? <StarBorderIcon color="secondary" /> :  <StarIcon color="secondary" /> }
              </StarButton>
            ))
          }
        </FilterRanking>
      </Header>
      <MovieList>
        {
          !movies.length && (
            <h2>
              {fetching ? 'Loading...' : `We couldn't find any movie with that criteria.`}
            </h2>
          )
        }
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
