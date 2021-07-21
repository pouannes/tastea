import { useContext, createContext, useState, useCallback } from 'react';

type teammelierContextProps = {
  selectedOptions: number[];
  setSelectedOptions: (optionValues: number[]) => void;
  toggleOption: (value: number) => void;
};

const teammelierContext = createContext<teammelierContextProps>({
  selectedOptions: [],
  setSelectedOptions: () => {
    return null;
  },
  toggleOption: () => {
    return null;
  },
});

const useTeammelierContext = (): teammelierContextProps => {
  const context = useContext(teammelierContext);

  if (context === undefined) {
    throw new Error(
      'useTeammelierContext must be used inside a TeammelierContextProvider'
    );
  }

  return context;
};

export interface TeammelierContextProviderProps {
  children: JSX.Element | JSX.Element[];
}

const options = {
  includeScore: true,
  // Search in `author` and in `tags` array
  keys: ['author', 'tags'],
};

const TeammelierContextProvider = ({
  children,
}: TeammelierContextProviderProps): JSX.Element => {
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);

  const toggleOption = useCallback(
    (value) =>
      setSelectedOptions((prevSelectedOptions) =>
        prevSelectedOptions.includes(value)
          ? prevSelectedOptions.filter((option) => option !== value)
          : [...prevSelectedOptions, value]
      ),
    []
  );

  return (
    <teammelierContext.Provider
      value={{ selectedOptions, setSelectedOptions, toggleOption }}
    >
      {children}
    </teammelierContext.Provider>
  );
};

export { useTeammelierContext, TeammelierContextProvider };
