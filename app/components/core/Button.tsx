import LoadingSpinner from '@/public/loading-spinner.svg';

type color = 'accent';
export interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  color?: color;
  className?: string;
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  color,
  className,
  loading,
  ...otherProps
}) => {
  const backgroundColor = color === 'accent' ? `bg-accent` : 'bg-bgPaper';
  return (
    <button
      {...otherProps}
      className={`${backgroundColor} px-8 py-2  rounded-md text-textPrimary flex items-center relative ${className}`}
    >
      {loading ? (
        <LoadingSpinner className={'h-5 w-5 absolute left-1'} />
      ) : null}
      {children}
    </button>
  );
};
