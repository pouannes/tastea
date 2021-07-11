import React, {
  SyntheticEvent,
  MutableRefObject,
  useState,
  useEffect,
} from 'react';

import { tag } from '@/types/api';
import { supabase } from '@/utils';
import { TagSelectionMenu } from './TagSelectionMenu';

export interface TagTextFieldProps {
  value: string;
  onChange: React.EventHandler<SyntheticEvent>;
  name: string;
  placeholder?: string;
  label?: string;
  required?: boolean;
  error?: boolean;
  helperText?: string;
  className?: string;
  inputClassName?: string;
  inputRef?: MutableRefObject<HTMLInputElement | null> | undefined;
}

export const TagTextField: React.FC<TagTextFieldProps> = ({
  value,
  onChange,
  name,
  placeholder,
  label,
  required = false,
  error,
  helperText,
  className,
  inputClassName,
  inputRef,
}) => {
  const [tags, setTags] = useState<tag[] | null>(null);

  useEffect(() => {
    const fetchTags = async () => {
      const { data } = await supabase.from('tags').select(`id, name`);
      setTags(data);
    };
    fetchTags();
  }, []);

  return (
    <div className={className}>
      {label ? (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-textSecondary"
        >
          {label} {required ? '*' : ''}
        </label>
      ) : null}
      <div className="relative w-full mt-1 rounded-md shadow-sm">
        <input
          value={value}
          onChange={onChange}
          type="text"
          name={name}
          required={required}
          className={`block w-full pl-3 pr-3 border-${
            error ? 'red-400' : 'gray-500'
          } rounded-md focus:ring-accent focus:border-accent bg-bgPaper text-textPrimary sm:text-sm ${inputClassName}`}
          placeholder={placeholder}
          ref={inputRef}
        />
        {tags ? (
          <TagSelectionMenu
            options={tags.map((tag) => ({ value: tag.id, label: tag.name }))}
            open={value.length > 0}
            onOptionClick={(value) => console.log(value)}
          />
        ) : undefined}
      </div>

      {helperText ? (
        <p
          className={`mt-1 ml-3 text-xs text-${
            error ? 'red-400' : 'textSecondary'
          }`}
        >
          {helperText}
        </p>
      ) : null}
    </div>
  );
};
