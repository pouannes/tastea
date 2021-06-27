import React, { SyntheticEvent } from 'react';

interface TextFieldProps {
  value: string;
  onChange: React.EventHandler<SyntheticEvent>;
  name: string;
  placeholder?: string;
  label?: string;
  inputClassName?: string;
}

export const TextField: React.FC<TextFieldProps> = ({
  value,
  onChange,
  name,
  placeholder,
  label,
  inputClassName,
}) => {
  return (
    <div>
      {label ? (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-textSecondary"
        >
          {label}
        </label>
      ) : null}
      <div className="relative mt-1 rounded-md shadow-sm">
        <input
          value={value}
          onChange={onChange}
          type="text"
          name={name}
          className={`block w-full pl-3 pr-3 border-gray-500 rounded-md focus:ring-accent focus:border-accent bg-bgPaper text-textPrimary sm:text-sm ${inputClassName}`}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};
