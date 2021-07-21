import { createContext, useContext, useState, useCallback } from 'react';

import { tea } from '@/types/api';
import { supabase } from '@/utils';

type teaContextType = {
  teas: tea[];
  triggerFetchTeas: () => void;
};

const teaContext = createContext<teaContextType>({
  teas: [],
  triggerFetchTeas: () => {
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
  const [internalTeas, setInternalTeas] = useState(teas);

  const triggerFetchTeas = useCallback(async () => {
    // TODO: the 'as' call should probably be replaced with something better
    const { data: teas } = (await supabase.from('teas').select(`*,
    brand:brand_id (id, name),
    type:tea_type_id (id, type)`)) as { data: tea[] };

    setInternalTeas(teas);
  }, []);

  return (
    <teaContext.Provider value={{ teas: internalTeas, triggerFetchTeas }}>
      {children}
    </teaContext.Provider>
  );
};

export { useTeasContext, TeasContextProvider };
