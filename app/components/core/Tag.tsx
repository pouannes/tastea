export interface TagProps {
  className?: string;
  children: JSX.Element | JSX.Element[] | string;
}

export const Tag = ({ className = '', children }: TagProps): JSX.Element => {
  return (
    <div
      className={`px-3 py-1 rounded-full bg-accentDark ${className}`}
      style={{ height: 'fit-content' }}
    >
      {children}
    </div>
  );
};
