import React from 'react';
import { PokemonList } from './components/PokemonList';
import './App.scss';

export const App: React.FC = () => {
  return (
    <div className="starter">
      <PokemonList />
    </div>
  );
};
