import LoadingSpinner from '@/public/loading-spinner.svg';

type color = 'accent';
type variant = 'contained' | 'outlined';
export interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  color?: color;
  variant?: variant;
  className?: string;
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  color,
  variant = 'contained',
  className,
  loading,
  ...otherProps
}) => {
  const ButtonType = variant === 'contained' ? ContainedButton : OutlinedButton;

  return (
    <ButtonType className={className} color={color} {...otherProps}>
      {loading ? (
        <LoadingSpinner className={'h-5 w-5 absolute left-1'} />
      ) : null}
      {children}
    </ButtonType>
  );
};

const ContainedButton = ({
  className,
  color,
  children,
  ...otherProps
}: ButtonProps): JSX.Element => {
  const backgroundColor = color === 'accent' ? `bg-accent` : 'bg-bgPaper';
  const focusRing =
    color === 'accent'
      ? 'focus:outline-none focus:ring-2 focus:ring-offset-bgPaper focus:ring-offset-2 focus:ring-accent text-bgDefault'
      : 'focus:outline-none text-textPrimary';

  return (
    <button
      {...otherProps}
      className={`${backgroundColor} ${focusRing} px-8 py-2  rounded-md flex items-center relative  ${className}`}
    >
      {children}
    </button>
  );
};

const OutlinedButton = ({
  className,
  color,
  children,
  ...otherProps
}: ButtonProps): JSX.Element => {
  const borderColor = color === 'accent' ? `border-accent` : 'border-bgPaper';
  const textColor = color === 'accent' ? `text-accent` : 'text-bgPaper';

  return (
    <button
      {...otherProps}
      className={` border ${borderColor} ${textColor} px-8 py-[7px]  rounded-md  flex items-center relative ${className}`}
    >
      {children}
    </button>
  );
};
