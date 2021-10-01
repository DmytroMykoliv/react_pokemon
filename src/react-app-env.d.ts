/// <reference types="react-scripts" />

interface Api {
  results: Results[],
}

interface Types {
  results: Type[],
}

interface Results {
  url: string,
}

interface Pokemon {
  id: number;
  name: string,
  moves: [],
  sprites: {
    front_default: string;
  },
  stats: Stat[],
  types: PokemonsType[],
  weight: number,
}

interface Stat {
  base_stat: number,
  stat: {
    name: string,
  }
}

interface PokemonsType {
  type: {
    name: string,
    url: string,
  }
}

interface Type {
  name: string,
}
