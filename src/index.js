import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './index.css';

const App = () => {
	const [pokedex, setPokedex] = useState([]);
	const [wildPokemon, setWildPokemon] = useState({});

	useEffect(() => {
    	encounterWildPokemon();
  		}, []);

    const pokeId = () => {
		const min = Math.ceil(1);
		const max = Math.floor(800);
		return Math.floor(Math.random() * (max - min + 1)) + min
	}

	const encounterWildPokemon = () => {
		axios
	   		.get('https://pokeapi.co/api/v2/pokemon/' + pokeId())
			.then(response => {
				setWildPokemon(response.data);
			});
		}

    const catchPokemon = (pokemon) => {
		setPokedex(state => {
			const monExists = (state.filter(p => pokemon.id === p.id).length > 0);

			if (!monExists) {
				state = [...state, pokemon]
				state.sort(function (a, b) {
					return a.id - b.id
				});
			}
			return state;
		});
		encounterWildPokemon();
	}


	const releasePokemon = id => {
		setPokedex(state => state.filter(p => p.id !== id))
	}

  return (
    <div className="app-wrapper">
		<header>
			<h1 className="title">Poke-Cise</h1>	
			<h3 className="subtitle">With Pokemon using the PokeAPI!</h3>	
		</header>

		<section className="wild-pokemon">
			<h2>Wild Encounter</h2>
			<img src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + wildPokemon.id + ".png"} className="sprite" alt="pokemon sprite"/>
			<h3>{wildPokemon.name}</h3>
			<button className="catch-btn" onClick={() => catchPokemon(wildPokemon)}>CATCH</button>
		</section>

		<section className="pokedex">
			<h2>Pokedex</h2>
			<div className="pokedex-list">
				{pokedex.map(pokemon => (
					<div className="pokemon" key={pokemon.id}>
						<img src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + pokemon.id + ".png"} className="sprite" alt="pokemon sprite"/>
						<h3 className="pokemon-name">{pokemon.name}</h3>
						<button className="remove" onClick={() => releasePokemon(pokemon.id)}>&times;</button>
				    </div>
				))}
			</div>
		</section>
	</div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));

/*
TODO's:
1. create login system
2. Create a home page, maybe with a video explanation

TODO's on current page:
1. top RIGHT CORNER: "LOGOUT" button that will return you to the home page. Above the "LOGOUT" button, have a "Welcome, [USER]"
2. Top corner Left, HOW MANY POKEMON CAUGHT out of HOW MANY?
3. Right on the Banner with the wild pokemon, Current exercise with a youtube link
4. left on the banner with the wild pokemon, time remaining before a new pokemon is drawn (if there is any time)

TODO's on the database:
WORKOUT DATABSE:
1. need to make a database specific to workouts, yoututbe video how to links, time needed to do exercie

USERS DATABASE:
1. id,username, password

USER (single) DATABASE:
1. users id, user id, username, password, how many pokemon caught out of how many?

Individual User DATABASE (saved pokedex):
1. user id, pokemon name, sprite url, exercise done for said pokemon, how much time it took to get this pokemon/do the exercise,

BUG FIXES:
1. Capitalize the first letter of each pokemon's name
2. add their id numbers to each card
*/


