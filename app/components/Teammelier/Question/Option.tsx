import { MouseEventHandler } from 'react';

import { Button } from '@/components/core';

type OptionProps = {
  label: string;
  onClick: MouseEventHandler;
};

const Option = ({ label, onClick }: OptionProps): JSX.Element => {
  return <Button onClick={onClick}>{label}</Button>;
};

export default Option;
