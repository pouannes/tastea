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
      className={`w-full  ${
        selected
          ? 'border-accentLight ring-1 ring-accentLight text-accentLight bg-accentVeryDark'
          : 'border-textSecondary text-textSecondary hover:bg-bgPaper'
      }`}
    >
      {label}
    </Button>
  );
};

export default Option;
