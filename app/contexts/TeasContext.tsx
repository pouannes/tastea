import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from 'react';

import { tag, tea } from '@/types/api';
import { supabase } from '@/utils';
import { useTagContext } from './TagContext';

interface fullTeas extends tea {
  tags: tag[];
}

type teaContextType = {
  teas: fullTeas[];
  triggerFetchTeas: () => void;
  searchTeas: fullTeas[];
  setSearchTeas: (teas: fullTeas[]) => void;
};

const teaContext = createContext<teaContextType>({
  teas: [],
  triggerFetchTeas: () => {
    return;
  },
  searchTeas: [],
  setSearchTeas: () => {
    return;
  },
});

const useTeasContext = (): teaContextType => {
  const context = useContext(teaContext);

  if (context === undefined) {
    throw new Error('useTeasContext must be used inside a TeasContextProvider');
  }

  return context;
};

export interface TeasContextProviderProps {
  teas: tea[];
  children: JSX.Element | JSX.Element[];
}

const TeasContextProvider = ({
  teas = [],
  children,
}: TeasContextProviderProps): JSX.Element => {
  const tags = useTagContext();

  const [internalTeas, setInternalTeas] = useState(teas);
  const fullTeas = useMemo(
    () =>
      internalTeas.map((tea) => ({
        ...tea,
        tags: tags.filter((tag) => tea.tag_ids.includes(tag.id)),
      })),
    [tags, internalTeas]
  );

  const [searchTeas, setSearchTeas] = useState(fullTeas);

  // always have searchTeas data in sync with fullTeas
  useEffect(() => {
    setSearchTeas((teas) =>
      teas.map(
        (tea) => fullTeas.find((fullTea) => tea.id === fullTea.id) ?? tea
      )
    );
  }, [fullTeas]);

  const triggerFetchTeas = useCallback(async () => {
    const { data: teas } = (await supabase.from('teas').select(`*,
    brand:brand_id (id, name),
    type:tea_type_id (id, type)`)) as { data: tea[] };

    setInternalTeas(teas);
  }, []);

  // update teas on first render since they might be stale
  useEffect(() => {
    triggerFetchTeas();
  }, [triggerFetchTeas]);

  return (
    <teaContext.Provider
      value={{ teas: fullTeas, triggerFetchTeas, searchTeas, setSearchTeas }}
    >
      {children}
    </teaContext.Provider>
  );
};

export { useTeasContext, TeasContextProvider };
