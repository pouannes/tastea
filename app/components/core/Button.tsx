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
  return (
    <button
      {...otherProps}
      className={`bg-${
        variant ?? 'bgPaper'
      } px-5 py-2  rounded-md text-textPrimary ${className}`}
    >
      {children}
    </button>
  );
};
