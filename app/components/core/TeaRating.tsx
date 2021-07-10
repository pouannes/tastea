import TeaIcon from '@/public/coffee-cup.svg';
import TeaIconFilled from '@/public/coffee-cup-filled.svg';

export interface TeaRatingProps {
  value: number;
}

export const TeaRating = ({ value }: TeaRatingProps): JSX.Element => {
  return (
    <div className="flex items-center">
      {new Array(5).fill(null).map((el, i) => (
        <button
          key={i}
          className={`w-8 h-8 flex items-center p-1 ${
            i < value ? 'text-accent' : 'text-textSecondary'
          }`}
        >
          {i < value ? (
            <TeaIconFilled className="fill-current" />
          ) : (
            <TeaIcon className="fill-current" />
          )}
        </button>
      ))}
    </div>
  );
};
