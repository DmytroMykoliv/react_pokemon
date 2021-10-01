import React from 'react';
import './FilterByTypes.scss';

type Props = {
  types: Type[],
  selectedType: string,
  onHandleSelect: (event: React.ChangeEvent<HTMLSelectElement>) => void,
};

export const FilterByTypes: React.FC<Props> = (props) => {
  const { onHandleSelect, types, selectedType } = props;

  return (
    <select
      className="form-control"
      id="form-select"
      value={selectedType}
      onChange={onHandleSelect}
    >
      <option className="form_options" value="All">All</option>
      {types.map(type => (
        <option
          key={type.name}
          value={type.name}
          className="form_options"
        >
          {type.name}
        </option>
      ))}
    </select>
  );
};
