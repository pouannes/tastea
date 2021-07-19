import { MouseEventHandler } from 'react';

import { Button } from '@/components/core';
import { useKey } from 'rooks';

type OptionProps = {
  label: string;
  onClick: MouseEventHandler;
  selected?: boolean;
  index: number;
};

const Option = ({
  label,
  onClick,
  selected,
  index,
}: OptionProps): JSX.Element => {
  const key = (index + 10).toString(36);

  useKey([key, key.toUpperCase()], () => onClick);

  return (
    <Button
      onClick={onClick}
      color="accent"
      variant="outlined"
      className={`w-full pl-4 transition ${
        selected
          ? 'border-accentLight ring-1 ring-accentLight text-accentLight bg-accentVeryDark'
          : 'border-textSecondary text-textSecondary hover:bg-bgPaper'
      }`}
    >
      <span
        className={`flex items-center justify-center transition px-2 mr-3 text-sm leading-6 align-middle border rounded  ${
          selected
            ? 'border-accentLight bg-accentVeryDark'
            : 'border-textSecondary '
        }`}
      >
        {key.toUpperCase()}
      </span>{' '}
      {label}
    </Button>
  );
};

export default Option;
