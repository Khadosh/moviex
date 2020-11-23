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
}

const initialState: MovieState = {
  movieList: [],
  filter: 0
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setMovies: function (state, action: PayloadAction<MovieType[]>) {
      state.movieList = action.payload;
    },
    setFilter: function(state, action: PayloadAction<number>) {
      state.filter = action.payload
    }
  },
});

export const { setMovies } = counterSlice.actions;

export const selectMovies = ({movies: { movieList, filter}}: RootState) =>
  movieList
    .filter(movie => movie.vote_average >= filter)
    .filter(movie => !!movie.poster_path);

export const fetchMovies = (query?: string): AppThunk => async dispatch => {
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
};

export default counterSlice.reducer;
