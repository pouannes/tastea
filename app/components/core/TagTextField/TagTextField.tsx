import React, {
  MutableRefObject,
  useState,
  useEffect,
  ChangeEvent,
  KeyboardEvent,
  useRef,
  useMemo,
} from 'react';

import { useMergeRefs } from 'rooks';
import Fuse from 'fuse.js';

import { tag } from '@/types/api';
import { TagSelectionMenu } from './TagSelectionMenu';
import { Tag } from '../Tag';
import { useTagContext } from 'app/contexts';

export interface TagTextFieldProps {
  selectedTags: tag[];
  setSelectedTags: (selectedTags: tag[]) => void;
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
  const tags = useTagContext();

  const [value, setValue] = useState('');
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

  const tagOptions = useMemo(
    () =>
      searchResults
        .filter(
          (tag) =>
            !selectedTags.some((selectedTag) => selectedTag.id === tag.id)
        )
        .map((tag) => ({ value: tag.id, label: tag.name })),
    [searchResults, selectedTags]
  );

  // initialize Fuse
  useEffect(() => {
    const fuseOptions = {
      includeScore: true,
      keys: ['name'],
    };
    if (Array.isArray(tags) && tags.length > 0) {
      fuseRef.current = new Fuse(tags, fuseOptions);
    }
  }, [tags]);

  // do the fuzzy search using Fuse
  useEffect(() => {
    if (fuseRef.current) {
      setSearchResults(
        fuseRef.current.search(value).map((result) => result.item)
      );
    }
  }, [value]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleOptionClick = (tagId: number) => {
    setValue('');
    if (tags && tags.length > 0) {
      const newTag = tags?.find((tag) => tag.id === tagId);
      if (newTag) {
        setSelectedTags([...selectedTags, newTag]);
      }
    }
  };

  const handleEnter = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && tagOptions?.length > 0) {
      handleOptionClick(tagOptions[0].value);
    }
  };

  const handleDeleteTag = (tagId: number) => {
    setSelectedTags(selectedTags?.filter((tag) => tag.id !== tagId) ?? []);
  };

  return (
    <div className={`w-full ${className}`}>
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
        className={`relative mt-1 w-full items-center max-w-full h-full inline-flex flex-wrap rounded-md shadow-sm  box-border pl-1 pr-1 cursor-text ${
          error ? 'border-red-400' : 'border-gray-500'
        } focus:ring-accent focus:border-accent bg-bgPaper text-textPrimary sm:text-sm border`}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        onClick={() => internalInputRef?.current?.focus()}
      >
        {selectedTags.map((tag) => (
          <Tag
            key={tag.id}
            className="m-1"
            canDelete={true}
            onDelete={() => handleDeleteTag(tag.id)}
          >
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
          onKeyDown={handleEnter}
        />
        {tags ? (
          <TagSelectionMenu
            options={tagOptions}
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
