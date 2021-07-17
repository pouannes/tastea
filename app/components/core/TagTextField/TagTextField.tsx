import React, {
  MutableRefObject,
  useState,
  useEffect,
  ChangeEvent,
  useRef,
} from 'react';

import { useMergeRefs } from 'rooks';
import Fuse from 'fuse.js';

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
  inputRef?: MutableRefObject<HTMLInputElement> | undefined;
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
  const [searchResults, setSearchResults] = useState<tag[]>([]);

  const fuseRef = useRef<Fuse<tag> | null>(null);
  const internalInputRef = useRef();

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const refs = useMergeRefs(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    inputRef,
    internalInputRef
  ) as MutableRefObject<HTMLInputElement>;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    const fetchTags = async () => {
      const { data } = await supabase.from('tags').select(`id, name`);

      const fuseOptions = {
        includeScore: true,
        keys: ['name'],
      };
      if (Array.isArray(data) && data.length > 0) {
        fuseRef.current = new Fuse(data, fuseOptions);
      }

      setTags(data);
    };
    fetchTags();
  }, []);

  useEffect(() => {
    if (fuseRef.current) {
      setSearchResults(
        fuseRef.current.search(value).map((result) => result.item)
      );
    }
  }, [value]);

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
        className={`relative items-center max-w-full h-full inline-flex flex-wrap rounded-md shadow-sm  box-border pl-3 pr-3 cursor-text ${
          error ? 'border-red-400' : 'border-gray-500'
        } focus:ring-accent focus:border-accent bg-bgPaper text-textPrimary sm:text-sm border`}
        style={{ width: 'calc(100% - 1.5rem)' }}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        onClick={() => internalInputRef?.current?.focus()}
      >
        {selectedTags.map((tag) => (
          <Tag key={tag.id} className="m-1">
            {tag.name}
          </Tag>
        ))}
        <input
          value={value}
          onChange={onChange}
          type="text"
          name={name}
          required={required}
          className={`border-0 flex-grow min-w-[40px] bg-bgPaper text-textPrimary sm:text-sm focus:ring-0  rounded-md  ${inputClassName}`}
          placeholder={placeholder}
          ref={refs}
          autoComplete="off"
          size={1}
        />
        {tags ? (
          <TagSelectionMenu
            options={searchResults
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
