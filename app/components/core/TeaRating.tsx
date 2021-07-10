import TeaIcon from '@/public/tea-cup.svg';
import TeaIconFilled from '@/public/tea-cup-filled.svg';

export interface TeaRatingProps {
  value: number;
}

export const TeaRating = ({ value }: TeaRatingProps): JSX.Element => {
  return (
    <div className="flex items-center">
      {new Array(5).fill(null).map((el, i) => (
        <button
          key={i}
          className={`w-8 h-8 flex items-center relative p-1 ${
            i < value ? 'text-accent' : 'text-textSecondary'
          }`}
        >
          {i < Math.floor(value) ? (
            <TeaIconFilled className="fill-current w-7 h-7 text-accent" />
          ) : i === Math.floor(value) ? (
            <PartialCup value={value} />
          ) : (
            <TeaIcon className="fill-current" />
          )}
        </button>
      ))}
    </div>
  );
};

const PartialCup = ({ value }: { value: number }): JSX.Element => {
  // Math is to make it go from 20 to 80 instead of from 0 to 100
  // useful visually
  const diff = value - Math.floor(value);
  const percentage = diff === 0 ? 0 : 30 + 0.4 * 100 * diff;
  return (
    <div>
      <TeaIconFilled
        className="absolute inset-0 z-10 w-8 h-8 p-1 fill-current text-accent"
        style={{
          clipPath: `inset(0 ${100 - percentage}% 0 0)`,
        }}
      />
      <TeaIcon
        className="absolute inset-0 z-0 w-8 h-8 p-1 fill-[rgba(255,255,255,0.7)]"
        style={{
          clipPath: `inset(0 0 0 ${percentage}% )`,
        }}
      />
    </div>
  );
};
