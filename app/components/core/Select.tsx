import { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';

interface SelectProps {
  label?: string;
  className?: string;
  required?: boolean;
  error?: boolean;
}

const people = [
  { name: 'Wade Cooper' },
  { name: 'Arlene Mccoy' },
  { name: 'Devon Webb' },
  { name: 'Tom Cook' },
  { name: 'Tanya Fox' },
  { name: 'Hellen Schmidt' },
];
const Select = ({
  label,
  className = '',
  required = false,
  error = false,
}: SelectProps): JSX.Element => {
  const [selected, setSelected] = useState(people[0]);

  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className={`relative mt-1 ${className}`}>
        {label ? (
          <Listbox.Label className="block text-sm font-medium text-textSecondary">
            {label} {required ? '*' : ''}
          </Listbox.Label>
        ) : null}
        <Listbox.Button
          className={`relative w-full py-2 pl-3 pr-10 mt-1 text-left rounded-md shadow-sm cursor-pointer focus:ring-accent focus:border-accent bg-bgPaper sm:text-sm text-textPrimary  border-${
            error ? 'red-400' : 'gray-500'
          }`}
        >
          <span className="block truncate">{selected.name}</span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <SelectorIcon
              className="w-5 h-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute z-10 w-full py-1 mt-1 overflow-auto text-base rounded-md shadow-lg bg-bgPaper max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {people.map((person, personIdx) => (
              <Listbox.Option
                key={personIdx}
                className={({ active }) =>
                  `${
                    active
                      ? 'text-textPrimary bg-bgPaperSecondary'
                      : 'text-textSecondary'
                  }
                              cursor-pointer select-none relative py-2 pl-10 pr-4`
                }
                value={person}
              >
                {({ selected, active }) => (
                  <>
                    <span
                      className={`${
                        selected
                          ? 'font-medium text-textPrimary'
                          : 'font-normal'
                      } block truncate`}
                    >
                      {person.name}
                    </span>
                    {selected ? (
                      <span
                        className={`${active ? 'text-accent' : 'text-accent'}
                                    absolute inset-y-0 left-0 flex items-center pl-3`}
                      >
                        <CheckIcon className="w-5 h-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};

export { Select };
