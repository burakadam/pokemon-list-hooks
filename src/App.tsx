import { getPokemonByName, Pokemon } from './api';

import PokemonTable from './component/PokemonTable';

import './App.css';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Input from './component/Input';

const calculatePower = (pokemon: Pokemon) =>
  pokemon.hp +
  pokemon.attack +
  pokemon.defense +
  pokemon.special_attack +
  pokemon.special_defense +
  pokemon.speed;

const MemoedPokemonTable = React.memo(PokemonTable);

function App() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [search, setSearch] = useState('');
  const [treshold, setTreshold] = useState(0);

  useEffect(() => {
    getPokemonByName(search).then(setPokemons);
  }, [search]);

  const onSetSearch = useCallback((evt) => setSearch(evt.target.value), []);

  const pokemonWithPower = useMemo(
    () =>
      pokemons.map((p) => ({
        ...p,
        power: calculatePower(p),
      })),
    [pokemons]
  );

  const onSetTreshold = useCallback(
    (evt) => setTreshold(parseInt(evt.target.value, 10)),
    []
  );

  const countOverThreshold = useMemo(
    () => pokemonWithPower.filter((p) => p.power > treshold).length,
    [pokemonWithPower, treshold]
  );

  const min = useMemo(
    () => Math.min(...pokemonWithPower.map((p) => p.power)),
    [pokemonWithPower]
  );

  const max = useMemo(
    () => Math.max(...pokemonWithPower.map((p) => p.power)),
    [pokemonWithPower]
  );

  return (
    <div className='App'>
      <div className='top-bar'>
        <div>Search</div>
        <Input type='text' value={search} onChange={onSetSearch} />
        <div>Power threshold</div>
        <Input type='number' value={treshold} onChange={onSetTreshold} />
        <div>Count over threshold: {countOverThreshold}</div>
      </div>
      <hr />
      <div className='two-column'>
        <MemoedPokemonTable pokemon={pokemonWithPower} />
        <div>
          <div>Min: {min}</div>
          <div>Max: {max}</div>
        </div>
      </div>
    </div>
  );
}

export default App;
