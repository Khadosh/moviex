import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';
import qs from 'query-string';

import env from '../../config/env';

export interface MovieType {
  id: number;
  genre_ids: number[];
  popularity: number;
  vote_count: number;
  poster_path: string;
  backdrop_path: string;
  original_language: string;
  original_title: string;
  title: string;
  adult: boolean;
  video: boolean;
  vote_average: number;
  overview: string;
  release_date: string;
}

interface MovieState {
  movieList: MovieType[];
  filter: number;
  fetching: boolean;
}

const initialState: MovieState = {
  movieList: [],
  filter: 0,
  fetching: true
};

export const movieSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setMovies: function (state, action: PayloadAction<MovieType[]>) {
      state.movieList = action.payload;
    },
    setFilter: function(state, action: PayloadAction<number>) {
      state.filter = action.payload
    },
    setFetching: function(state, action: PayloadAction<boolean>) {
      state.fetching = action.payload
    }
  },
});

export const { setMovies, setFilter, setFetching } = movieSlice.actions;

export const selectMovies = ({movies: { movieList, filter}}: RootState) =>
  movieList
    .filter(movie => {
      const max = filter * 2;
      const min = max - 2;
      return !filter || (movie.vote_average >= min && movie.vote_average < max);
    })
    .filter(movie => !!movie.poster_path);

export const selectFilter = ({movies: { filter }}: RootState) => filter;
export const selectFetching = ({movies: { fetching }}: RootState) => fetching;

export const fetchMovies = (query?: string): AppThunk => async dispatch => {
  dispatch(setFetching(true)); 

  const attrs = {
    language: 'en-US',
    include_adult: false,
    page: 1,
    sort_by: 'popularity.desc',
    ...(query ? {query} : {})
  }

  const baseUrl = `https://api.themoviedb.org/3/${query ? 'search' : 'discover'}`;

  const result = await fetch(`${baseUrl}/movie?${qs.stringify(attrs)}`, {
    method: 'GET',
    headers: {
      'Authorization': `bearer ${env.bearer}`
    }
  }).then(response => response.json())

  dispatch(setMovies(result.results));  
  dispatch(setFetching(false)); 
};

export default movieSlice.reducer;
