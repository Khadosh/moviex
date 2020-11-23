import styled from 'styled-components';

type bgProps = {
  bg: any;
}

export const Header = styled.header`
  height: 10rem;
  background-color: black;
  margin-bottom: 2rem;
`
export const Form = styled.form`
  max-width: 30rem;
  margin: 0 auto;
  padding: 4rem 0;
  display: flex;
  flex-direction: column;
`;

export const SearchBar = styled.input`
  flex: 1;
  padding: 0.4rem 2.5rem;
  outline: none;
  border: none;
  border-radius: 1rem;
  background-color: #EEE;
  background-image: url(${(props: bgProps) => props.bg});
  background-position-x: 0.5rem;
  background-position-y: center;
  background-size: contain;
  background-repeat: no-repeat;
`;

export const SearchButton = styled.button`

`;

export const MovieList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

export const Movie = styled.div`
  width: 20rem;
  height: 30rem;
  background: url('https://image.tmdb.org/t/p/w500/${(props: bgProps) => props.bg}') center center no-repeat;
  background-size: contain;
  margin-bottom: 1rem;
  transition: opacity 0.3s;

  &:hover { 
    opacity: 0.9;
    cursor: pointer;
  }
  position: relative;
`;

export const MovieScore = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-weight: bold;
  font-size: 2rem;
  color: gold;
  text-shadow: 0.1rem 0.1rem 0.2rem black;
`;

export const MovieDetailsContainer = styled.div`
  padding: 2rem 3rem;
  margin-top: -2rem;
  color: #f6db41;
  text-shadow: 0.1rem 0.1rem 0.2rem black;
  
  &::after {
    content: "";
    background: url('https://image.tmdb.org/t/p/w500/${(props: bgProps) => props.bg}') center center no-repeat rgba(0, 0, 0, 0.3);
    background-size: cover;
    opacity: 0.7;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    position: absolute;
    z-index: -1;   
  }
`