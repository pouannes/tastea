import { useState, useRef, useEffect, useCallback, ChangeEvent } from 'react';

import Fuse from 'fuse.js';
import _ from 'lodash';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid';

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
  threshold: 0.5,
  keys: ['name'],
};

const TeaSearch = ({ teaBrands, teaTypes }: TeaSearchProps): JSX.Element => {
  const { teas, setSearchTeas } = useTeasContext();

  const [isOpen, setIsOpen] = useState(false);
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
        console.log(fuseRef.current.search(searchString));
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
    <div className="sticky top-0 z-10 flex flex-col pt-4 -mt-4 rounded-md md:pb-4 md:pt-10 md:-mt-10 bg-bgDefault">
      <div className={`flex-col ${!isOpen ? 'hidden' : 'flex'} md:flex`}>
        <TextField
          name="search"
          value={search}
          onChange={handleSearchChange}
          label="Search"
        />
        <div className="flex flex-wrap gap-2 my-4">
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

      <button
        className="flex justify-center w-full py-1 my-2 rounded md:hidden align-items text-textSecondary hover:bg-bgPaperSecondary"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {isOpen ? 'Close filters' : 'Open filters'}
        {isOpen ? (
          <ChevronUpIcon className="w-6 h-6 ml-2" />
        ) : (
          <ChevronDownIcon className="w-6 h-6 ml-2" />
        )}
      </button>
    </div>
  );
};

export default TeaSearch;
