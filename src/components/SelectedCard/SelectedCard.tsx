import React from 'react';

import './SelectedCard.scss';

type Props = {
  selectedPokemon: Pokemon,
};

export const SelectedCard: React.FC<Props> = (props) => {
  const {
    sprites,
    name,
    moves,
    stats,
    types,
    weight,
  } = props.selectedPokemon;

  return (
    <div className="card_info">
      <img src={sprites.front_default} className="card-img-top" alt="..." />
      <div className="card-body card-body--info">
        <h5 className="card-title">{name}</h5>

        <table className="table table-bordered card_table">
          <thead>
            <tr>
              <th>Type</th>
              <td>{types.map(type => type.type.name).join(', ')}</td>
            </tr>
          </thead>
          <tbody>
            {stats.map(item => (
              <tr key={item.stat.name}>
                <th>{item.stat.name}</th>
                <td>{item.base_stat}</td>
              </tr>
            ))}
            <tr>
              <th>Weight</th>
              <td>{weight}</td>
            </tr>
            <tr>
              <th>Total moves</th>
              <td>{moves.length}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
