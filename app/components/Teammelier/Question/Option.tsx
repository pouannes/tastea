import { Button } from '@/components/core';
import { useKey } from 'rooks';

type OptionProps = {
  label: string;
  handleClick: () => void;
  selected?: boolean;
  index: number;
  disabled: boolean;
};

const Option = ({
  label,
  handleClick,
  selected,
  index,
  disabled,
}: OptionProps): JSX.Element => {
  const key = (index + 10).toString(36);

  useKey([key, key.toUpperCase()], handleClick);

  return (
    <Button
      onClick={handleClick}
      color="accent"
      variant="outlined"
      tabIndex={-1}
      className={`min-w-min pl-4 transition ${
        disabled
          ? 'border-textDisabled text-textDisabled cursor-default'
          : selected
          ? 'border-accentLight ring-1 ring-accentLight text-accentLight bg-accentVeryDark'
          : 'border-textSecondary text-textSecondary hover:bg-bgPaper'
      }`}
      disabled={disabled}
    >
      <span
        className={`hidden sm:flex items-center justify-center transition px-2 mr-3 text-sm leading-6 align-middle border rounded  ${
          disabled
            ? 'border-textDisabled'
            : selected
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
