import React, { useState, MouseEventHandler, useRef, useEffect } from 'react';

import TeaIcon from '@/public/tea-cup.svg';
import TeaIconFilled from '@/public/tea-cup-filled.svg';
import { usePrevious } from 'rooks';

export interface TeaRatingProps {
  value: number;
  setValue?: (value: number) => void;
  readOnly?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

function getDecimalPrecision(num: number) {
  const decimalPart = num.toString().split('.')[1];
  return decimalPart ? decimalPart.length : 0;
}

function roundValueToPrecision(value: number, precision: number) {
  if (value == null) {
    return value;
  }

  const nearest = Math.round(value / precision) * precision;
  return Number(nearest.toFixed(getDecimalPrecision(precision)));
}

export const TeaRating = ({
  value,
  setValue,
  readOnly,
  size = 'md',
}: TeaRatingProps): JSX.Element => {
  const [internalValue, setInternalValue] = useState(value);

  const dimensions =
    size === 'sm' ? 'w-6 h-6' : size === 'md' ? 'w-8 h-8' : 'w-10 h-10';
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove: MouseEventHandler<HTMLDivElement> = (event) => {
    const max = 5;
    const precision = 0.5;
    if (containerRef.current) {
      const rootNode = containerRef.current;
      const firstChild = rootNode.firstChild as HTMLElement;
      const { left } = rootNode.getBoundingClientRect();
      const { width } = firstChild?.getBoundingClientRect();

      const percent = (event.clientX - left) / (width * max);
      const roundedValue = roundValueToPrecision(
        max * percent + precision / 2,
        precision
      );

      setInternalValue(Math.max(precision, roundedValue - precision));
    }
  };

  const handleMouseLeave: MouseEventHandler<HTMLDivElement> = () => {
    setInternalValue(value);
  };

  const previousValue = usePrevious(value);
  useEffect(() => {
    if (value !== previousValue) {
      setInternalValue(value);
    }
  }, [previousValue, value]);

  return (
    <div
      className="flex items-center w-min"
      ref={containerRef}
      onMouseMove={readOnly ? undefined : handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => setValue && setValue(internalValue)}
    >
      {new Array(5).fill(null).map((el, i) => (
        <button
          key={i}
          className={`${dimensions} flex items-center relative mr-1 ${
            i < internalValue ? 'text-accent' : 'text-textDisabled'
          } ${readOnly ? 'pointer-events-none' : ''}`}
          aria-label={`rating-${i + 1}`}
        >
          {i < Math.floor(internalValue) ? (
            <FullCup />
          ) : i === Math.floor(internalValue) ? (
            <PartialCup value={internalValue} />
          ) : (
            <EmptyCup />
          )}
        </button>
      ))}
    </div>
  );
};

interface CupProps {
  className?: string;
}

const FullCup = ({ className, ...props }: CupProps) => {
  return (
    <TeaIconFilled
      className={`w-full h-full fill-current text-accent ${className}`}
      {...props}
    />
  );
};

const EmptyCup = ({ className, ...props }: CupProps) => {
  return <TeaIcon className={`fill-current ${className}`} {...props} />;
};

interface PartialCup extends CupProps {
  value: number;
}

const PartialCup = ({ value, ...props }: PartialCup): JSX.Element => {
  // Math is to make it go from 35 to 70 instead of from 0 to 100
  // useful visually
  const diff = value - Math.floor(value);
  const percentage = diff === 0 ? 0 : 35 + 0.35 * 100 * diff;
  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <div className="w-full h-full" {...props}>
      <TeaIconFilled
        className="absolute inset-0 z-0 w-full h-full fill-current text-accent"
        style={{
          clipPath: `inset(0 ${100 - percentage}% 0 0)`,
        }}
      />
      <TeaIcon
        className="absolute inset-0 z-0 w-full h-full  fill-[rgba(255,255,255,0.5)]"
        style={{
          clipPath: `inset(0 0 0 ${percentage}% )`,
        }}
      />
    </div>
  );
};
