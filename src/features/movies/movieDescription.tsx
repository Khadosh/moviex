import React from 'react';
import { MovieType } from './movies.slice';
import { MovieDetailsContainer } from './styles';

type propTypes = {
  movie: MovieType;
}

const Line = ({ title, description }) => (
  <p><strong>{title}:</strong> {description}</p>
)

const MovieDescription = ({ movie }: propTypes) => (
  <MovieDetailsContainer bg={movie.backdrop_path}>
    <h2>{movie.title}</h2>
    <Line title="Original Title" description={movie.original_title} />
    <Line title="Original Language" description={movie.original_language} />
    <Line title="Release Date" description={movie.release_date} />
    <Line title="Rank" description={movie.vote_average} />
    <Line title="Overview" description={movie.overview} />
  </MovieDetailsContainer>
);

export default MovieDescription;