import React from 'react';

type Props = {
  types: Type[],
  selectedType: string,
  onHandleSelect: (event: React.ChangeEvent<HTMLSelectElement>) => void,
};

export const FilterByTypes: React.FC<Props> = (props) => {
  const { onHandleSelect, types, selectedType } = props;

  return (
    <select className="form-control" value={selectedType} onChange={onHandleSelect}>
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
