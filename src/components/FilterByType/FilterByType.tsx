import React from 'react';

type Props = {
  types: Type[],
  onHandleSelect: (event: React.ChangeEvent<HTMLSelectElement>) => void,
};

export const FilterByTypes: React.FC<Props> = (props) => {
  const { onHandleSelect, types } = props;

  return (
    <select className="form-control" onChange={onHandleSelect}>
      <option value="All">All</option>
      {types.map(type => (
        <option
          key={type.name}
          value={type.name}
        >
          {type.name}
        </option>
      ))}
    </select>
  );
};
