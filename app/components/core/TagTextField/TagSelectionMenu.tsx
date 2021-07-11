import { Menu } from '@headlessui/react';
import { TagIcon } from '@heroicons/react/outline';

type option<T> = { value: T; label: string };

export interface TagSelectionMenuProps<T> {
  options: option<T>[];
  open: boolean;
  onOptionClick: (value: T) => void;
}

export const TagSelectionMenu = <T,>({
  options,
  open,
  onOptionClick,
}: TagSelectionMenuProps<T>): JSX.Element => {
  return (
    <div className="absolute w-full">
      <Menu as="div">
        {open && (
          <div className="relative w-full py-1 mt-1 overflow-auto text-base rounded-md shadow-lg bg-bgPaper max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {options.map((option) => (
              <Menu.Item key={`${option.value}`}>
                {({ active }) => (
                  <button
                    className={`${
                      active
                        ? 'text-textPrimary bg-bgPaperSecondary'
                        : 'text-textSecondary'
                    }
                                cursor-pointer text-left select-none w-full relative py-2 pl-4 pr-4 flex items-center`}
                    onClick={() => onOptionClick(option.value)}
                  >
                    <TagIcon
                      className={`w-5 h-5 mr-3 ${active ? 'text-accent' : ''}`}
                      aria-hidden="true"
                    />

                    {option.label}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        )}
      </Menu>
    </div>
  );
};
