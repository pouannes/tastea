import { MouseEventHandler } from 'react';

import { Button } from '@/components/core';

type OptionProps = {
  label: string;
  onClick: MouseEventHandler;
  selected?: boolean;
};

const Option = ({ label, onClick, selected }: OptionProps): JSX.Element => {
  return (
    <Button
      onClick={onClick}
      color="accent"
      variant="outlined"
      className={` w-full border-accentLight text-accentLight hover:bg-accentVeryDark ${
        selected ? 'ring-1 ring-accent  bg-accentVeryDark' : ''
      }`}
    >
      {label}
    </Button>
  );
};

export default Option;
