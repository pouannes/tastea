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
    <div
      className="relative z-10 -ml-1"
      style={{ width: 'calc(100% + 0.25rem)' }}
    >
      <Menu as="div" className="w-full">
        {open && (
          <div
            className="absolute left-0 w-full py-1 overflow-auto text-base rounded-md shadow-lg top-2 bg-bgPaper max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
            style={{ width: 'calc(100% + 0.25rem)' }}
          >
            {options.map((option, optionIdx) => (
              <Menu.Item key={`${option.value}`}>
                {({ active }) => (
                  <button
                    className={`${
                      active || optionIdx === 0
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
