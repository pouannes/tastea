import { createContext, useContext } from 'react';

import { tag } from '@/types/api';

const tagContext = createContext<tag[]>([]);

const useTagContext = (): tag[] => {
  const context = useContext(tagContext);

  if (context === undefined) {
    throw new Error('useTagContext must be used inside a TagContextProvider');
  }

  return context;
};

export interface TagContextProviderProps {
  tags: tag[];
  children: JSX.Element | JSX.Element[];
}

const TagContextProvider = ({
  tags = [],
  children,
}: TagContextProviderProps): JSX.Element => {
  return <tagContext.Provider value={tags}>{children}</tagContext.Provider>;
};

export { useTagContext, TagContextProvider };
