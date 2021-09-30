import React, { useState, useEffect } from 'react';
import { request, getPokemonsInfo, getPokemonsType } from '../../api/api';
import { FilterByTypes } from '../FilterByType';
import { SelectedCard } from '../SelectedCard';

import './PokemonList.scss';

export const PokemonList: React.FC = () => {
  const [pokemonsData, setPokemonsData] = useState<Pokemon[]>([]);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [types, setTypes] = useState<Type[]>([]);
  const [loadLimit, setLoadLimit] = useState(12);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [isSelectedPokemon, setIsSelectedPokemon] = useState(false);
  const [isError, setError] = useState(false);

  const loadData = () => {
    (async () => {
      try {
        const pokemonsFromApi: Api = await request(loadLimit);

        const loadPokemonsPromise = pokemonsFromApi.results.map(async (pokemon: Results) => {
          const loadPokemon = await getPokemonsInfo(pokemon.url);

          return loadPokemon;
        });

        const loadPokemons: Pokemon[] = await Promise.all(loadPokemonsPromise);

        setPokemonsData(loadPokemons);
        setPokemons(loadPokemons);
        setError(false);
      } catch {
        setError(true);
      }
    })();
  };

  useEffect(() => {
    (async () => {
      loadData();
      const loadTypes: Types = await getPokemonsType();

      setTypes(loadTypes.results);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      loadData();
    })();
  }, [loadLimit]);

  const getSelectedPokemon = (pokemon: Pokemon) => {
    setIsSelectedPokemon(true);
    setSelectedPokemon(pokemon);
  };

  const filteredByTypes = (typeName: string) => {
    setIsSelectedPokemon(false);

    if (typeName === 'All') {
      setPokemons(pokemonsData);

      return;
    }

    const filteredPokemons = pokemonsData
      .filter(pokemon => pokemon.types.find(type => type.type.name === typeName));

    setPokemons(filteredPokemons);
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    filteredByTypes(event.target.value);
  };

  return (
    <main>
      <h1 className="main_title">Pokedex</h1>

      <FilterByTypes onHandleSelect={handleSelect} types={types} />

      {isError ? ('Something went wrong') : (
        <section className="container">
          <article className="row row-cols-1 row-cols-md-3 container_list">
            {pokemons.length > 0 ? (pokemons.map((pokemon: Pokemon) => {
              return (
                <div key={pokemon.id} className="col mb-4">
                  <div
                    role="button"
                    tabIndex={0}
                    className="card"
                    onClick={() => getSelectedPokemon(pokemon)}
                    onKeyPress={() => getSelectedPokemon(pokemon)}
                  >
                    <img
                      src={pokemon.sprites.front_default}
                      className="card-img-top"
                      alt={`pokemon ${pokemon.name}`}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{pokemon.name}</h5>
                      <div className="card_types">
                        {pokemon.types.map(type => {
                          const { url, name } = type.type;

                          return (
                            <p key={url} className={`card_type-item card_type-item--${name}`}>
                              {name}
                            </p>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })) : 'Need to load more pokemons ))'}

            <button
              className="btn btn-primary container_btn-loader"
              type="button"
              onClick={() => setLoadLimit(loadLimit + 12)}
            >
              Load More
            </button>
          </article>

          <article className="container_info-card">
            {isSelectedPokemon && selectedPokemon
              && <SelectedCard selectedPokemon={selectedPokemon} />}
          </article>
        </section>
      )}
    </main>
  );
};
