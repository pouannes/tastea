import { useMemo } from 'react';

import { useTagContext } from 'app/contexts';

type option = {
  label: string;
  value: number | string;
};

type question = {
  title: string;
  options: option[];
};

type TeammelierContent = question[];

const tagTypes = ['time', 'weather', 'taste', 'blend', 'flavor'];

const useTeammelierContent = (): TeammelierContent => {
  const tags = useTagContext();

  const content = useMemo(() => {
    const array: TeammelierContent = [];

    tagTypes.forEach((type) =>
      array.push({
        title: `Do you want to filter on ${type} tags?`,
        options: tags
          .filter((tag) => tag.type === type)
          .map((tag) => ({
            value: tag.id,
            label: tag.name,
          })),
      })
    );
    return array;
  }, [tags]);

  return content;
};

export default useTeammelierContent;
