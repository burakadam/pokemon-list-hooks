import { getPokemonByName, Pokemon, PokemonWithPower } from './api';

import PokemonTable from './component/PokemonTable';

import './App.css';
import React, { useEffect, useState } from 'react';

const calculatePower = (pokemon: Pokemon) =>
  pokemon.hp +
  pokemon.attack +
  pokemon.defense +
  pokemon.special_attack +
  pokemon.special_defense +
  pokemon.speed;

function AppBurak() {
  const [pokemons, setPokemons] = useState<PokemonWithPower[]>([]);
  const [search, setSearch] = useState('');
  const [treshold, setTreshold] = useState(0);

  const _getByNames = async (name: string) => {
    console.log('_getByNames');
    const result = await getPokemonByName(name);
    _pokemonsWithPower(result);
  };

  const _pokemonsWithPower = (pokemons: Pokemon[]) => {
    const result = pokemons.map((p) => ({
      ...p,
      power: calculatePower(p),
    }));

    setPokemons(result);
  };

  const _handleSearchInput = (e: React.FormEvent<HTMLInputElement>) => {
    console.log('_handleSearchInput');
    setSearch(e.currentTarget.value);
  };

  const _handleTreshold = (e: React.FormEvent<HTMLInputElement>) => {
    console.log('_handleTreshold');
    setTreshold(+e.currentTarget.value);
  };

  useEffect(() => {
    _getByNames(search);
  }, [search]);

  return (
    <div className='App'>
      <div className='top-bar'>
        <div>Search</div>
        <input type='text' onChange={_handleSearchInput}></input>
        <div>Power threshold</div>
        <input
          type='number'
          onChange={(e) => _handleTreshold(e)}
          value={treshold}
        ></input>
        <div>Count over threshold: {treshold}</div>
      </div>
      <hr />
      <div className='two-column'>
        <PokemonTable pokemon={pokemons} />
        <div>
          <div>Min: </div>
          <div>Max: </div>
        </div>
      </div>
    </div>
  );
}

export default AppBurak;
