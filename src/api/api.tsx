const API_URL = 'https://pokeapi.co/api/v2/pokemon?limit=';
const TYPE_URL = 'https://pokeapi.co/api/v2/type?limit=999';

export const request = async (loadLimit: number) => {
  const response = await fetch(`${API_URL}${loadLimit}`);

  if (!response.ok) {
    throw new Error(`${response.status} - Something went wrong with data load`);
  }

  return response.json();
};

export const getPokemonsInfo = async (url: string) => {
  const pokemon = await fetch(url);

  if (!pokemon.ok) {
    throw new Error(`${pokemon.status} - Something went wrong with info load`);
  }

  return pokemon.json();
};

export const getPokemonsType = async () => {
  const types = await fetch(TYPE_URL);

  if (!types.ok) {
    throw new Error(`${types.status} - Something went wrong with type load`);
  }

  return types.json();
};
