import {
  useContext,
  createContext,
  useState,
  useCallback,
  useRef,
  useEffect,
} from 'react';
import Fuse from 'fuse.js';
import { useTagContext, useTeasContext } from '@/contexts';

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
  keys: ['name', 'tags', 'brand.name', 'type.type'],
};

const TeammelierContextProvider = ({
  children,
}: TeammelierContextProviderProps): JSX.Element => {
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  const { teas } = useTeasContext();
  const tags = useTagContext();

  const fuseRef = useRef(
    new Fuse(
      teas.map((tea) => ({
        ...tea,
        tags: tags
          .filter((tag) => tea.tag_ids.includes(tag.id))
          .map((tag) => tag.name),
      })),
      options
    )
  );

  useEffect(() => {
    const selectedTagNames = selectedOptions.map(
      (tagId) => `="${tags.find((tag) => tag.id === tagId)?.name}"`
    );
    console.log('searching string: ', selectedTagNames.join(' '));

    console.log(fuseRef.current.search(selectedTagNames.join(' ')));
  }, [selectedOptions, tags]);

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
