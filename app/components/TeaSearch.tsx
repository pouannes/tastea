import { useState, useRef, ChangeEvent } from 'react';

import Fuse from 'fuse.js';

import { TextField } from './core';
import { useTeasContext } from '@/contexts';

const options = {
  includeScore: true,
  // Search in `author` and in `tags` array
  keys: ['name', 'tags.name', 'brand.name', 'type.type'],
};

const TeaSearch = (): JSX.Element => {
  const { teas, setSearchTeas } = useTeasContext();
  const [search, setSearch] = useState('');

  const fuseRef = useRef(new Fuse(teas, options));

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);

    if (e.target.value === '') {
      setSearchTeas(teas);
    } else {
      setSearchTeas(
        fuseRef.current
          .search(e.target.value)
          .map((resultItem) => resultItem.item)
      );
    }
  };

  return (
    <div>
      <TextField name="search" value={search} onChange={handleSearchChange} />
    </div>
  );
};

export default TeaSearch;
