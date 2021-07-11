import React, {
  SyntheticEvent,
  MutableRefObject,
  useState,
  useEffect,
  ChangeEvent,
} from 'react';

import { tag } from '@/types/api';
import { supabase } from '@/utils';
import { TagSelectionMenu } from './TagSelectionMenu';
import { Tag } from '../Tag';

export interface TagTextFieldProps {
  selectedTags: tag[];
  setSelectedTags: (tag: tag | undefined) => void;
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
  selectedTags,
  setSelectedTags,
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
  const [value, setValue] = useState('');
  const [tags, setTags] = useState<tag[] | null>(null);
  const [searchResults, setSearchResults] = useState([]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    const fetchTags = async () => {
      const { data } = await supabase.from('tags').select(`id, name`);
      setTags(data);
    };
    fetchTags();
  }, []);

  const handleOptionClick = (tagId: number) => {
    console.log(tagId);
    setValue('');
    if (tags) {
      setSelectedTags(tags?.find((tag) => tag.id === tagId));
    }
  };

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
      <div
        // The padding below are repeated in the TagSelectionMenu, careful if we change then
        className={`relative max-w-full flex flex-wrap  h-auto mt-1 py-2 rounded-md shadow-sm  box-border pl-3 pr-3 ${
          error ? 'border-red-400' : 'border-gray-500'
        } focus:ring-accent focus:border-accent bg-bgPaper text-textPrimary sm:text-sm border`}
        style={{ width: 'calc(100% - 1.5rem)' }}
      >
        <div className="flex flex-wrap items-center gap-2">
          {selectedTags.map((tag) => (
            <Tag key={tag.id}>{tag.name}</Tag>
          ))}
        </div>
        <input
          value={value}
          onChange={onChange}
          type="text"
          name={name}
          required={required}
          className={`block border-0 w-full bg-bgPaper text-textPrimary sm:text-sm  rounded-md min-w-[40px] ${inputClassName}`}
          placeholder={placeholder}
          ref={inputRef}
          autoComplete="off"
        />
        {tags ? (
          <TagSelectionMenu
            options={tags
              .filter(
                (tag) =>
                  !selectedTags.some((selectedTag) => selectedTag.id === tag.id)
              )
              .map((tag) => ({ value: tag.id, label: tag.name }))}
            open={value.length > 0}
            onOptionClick={handleOptionClick}
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
