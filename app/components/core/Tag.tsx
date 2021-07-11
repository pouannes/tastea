export interface TagProps {
  children: JSX.Element | JSX.Element[] | string;
}

export const Tag = ({ children }: TagProps): JSX.Element => {
  return (
    <div
      className="px-3 py-1 rounded-full bg-accentDark "
      style={{ height: 'fit-content' }}
    >
      {children}
    </div>
  );
};
