import { useState, useRef, useEffect, useCallback, ChangeEvent } from 'react';

import Fuse from 'fuse.js';
import _ from 'lodash';

import { Select, TextField } from './core';
import { useTeasContext } from '@/contexts';
import { brand, teaType } from '@/types/api';

type TeaSearchProps = {
  teaBrands: brand[];
  teaTypes: teaType[];
};

type Filter = {
  brand: string;
  type: string;
};

const options = {
  includeScore: true,
  // Search in `author` and in `tags` array
  keys: ['name', 'tags.name', 'brand.name', 'type.type'],
};

const TeaSearch = ({ teaBrands, teaTypes }: TeaSearchProps): JSX.Element => {
  const { teas, setSearchTeas } = useTeasContext();

  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<Filter>({
    brand: '',
    type: '',
  });

  const fuseRef = useRef(new Fuse(teas, options));

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);

    searchTeas(e.target.value);
  };

  const searchTeas = useCallback(
    (searchString: string) => {
      if (searchString === '') {
        setSearchTeas(teas);
      } else {
        setSearchTeas(
          fuseRef.current
            .search(searchString)
            .map((resultItem) => resultItem.item)
        );
      }
    },
    [setSearchTeas, teas]
  );

  const handleFilterChange = (name: string, value: string | null) => {
    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  // change fuse list on filter change and change search as well
  useEffect(() => {
    let currentTeas = teas;
    if (filter.brand !== '') {
      currentTeas = currentTeas.filter(
        (tea) => tea.brand.name === filter.brand
      );
    }
    if (filter.type !== '') {
      currentTeas = currentTeas.filter((tea) => tea.type.type === filter.type);
    }

    fuseRef.current = new Fuse(currentTeas, options);

    if (search === '') {
      setSearchTeas(currentTeas);
    } else {
      searchTeas(search);
    }
  }, [filter, search, searchTeas, setSearchTeas, teas]);

  return (
    <div className="flex flex-col">
      <TextField name="search" value={search} onChange={handleSearchChange} />
      <div className="flex gap-2 my-4">
        <Select
          value={filter.brand}
          onChange={(value) => handleFilterChange('brand', value)}
          label="Brand"
          name="brand"
          className="mr-5 w-52"
          options={[
            { value: '', label: '' },
            ...teaBrands.map((brand) => ({
              value: brand.name,
              label: _.startCase(brand.name),
            })),
          ]}
        />
        <Select
          value={filter.type}
          onChange={(value) => handleFilterChange('type', value)}
          label="Type"
          name="type"
          className="w-52"
          options={[
            { value: '', label: '' },
            ...teaTypes.map((tea) => ({
              value: tea.type,
              label: _.startCase(tea.type),
            })),
          ]}
        />
      </div>
    </div>
  );
};

export default TeaSearch;
