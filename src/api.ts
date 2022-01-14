export interface Pokemon {
  id: number;
  name: string;
  type: string[];
  hp: number;
  attack: number;
  defense: number;
  special_attack: number;
  special_defense: number;
  speed: number;
}

export interface PokemonWithPower extends Pokemon {
  power: number;
}

export const getAllPokemon = async (): Promise<Pokemon[]> => {
  return fetch('/pokemon.json').then((response) => response.json());
};

export const getPokemonByName = async (
  searchValue: string
): Promise<Pokemon[]> => {
  const searchText = searchValue.toLowerCase();
  return getAllPokemon().then((pokemon: Pokemon[]) =>
    pokemon.filter(({ name }) => name.toLowerCase().includes(searchText))
  );
};
