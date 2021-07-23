import React from 'react';
import { Select, MenuItem } from '@material-ui/core';

export type TOptions = {
  name: string;
  id: number;
}[];

const BaseSelect = ({
  className = '',
  id,
  open,
  onClose,
  onOpen,
  onChange,
  options,
  value,
}: {
  className?: string;
  id: string;
  open: boolean;
  onClose: VoidFunction;
  onOpen: VoidFunction;
  onChange: VoidFunction;
  options: TOptions;
  value: number;
}) => {
  return (
    <Select {...{ className, id, onChange, onClose, onOpen, open, value }} variant="outlined">
      <MenuItem value="">
        <em>未選択</em>
      </MenuItem>
      {options.map((option) => {
        return (
          <MenuItem key={option.id} value={option.id}>
            {option.name}
          </MenuItem>
        );
      })}
    </Select>
  );
};

export default BaseSelect;
