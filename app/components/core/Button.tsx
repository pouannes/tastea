export interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  variant?: string | undefined;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant,
  className,
  ...otherProps
}) => {
  const backgroundColor = variant === 'accent' ? `bg-accent` : 'bg-bgPaper';
  return (
    <button
      {...otherProps}
      className={`${backgroundColor} px-5 py-2  rounded-md text-textPrimary ${className}`}
    >
      {children}
    </button>
  );
};
