import React from 'react';
import { Collection } from '../types';

interface Props {
  collection: Collection;
}

export const CollectionCard = ({ collection }: Props) => {
  return (
    <article
      className="flex overflow-hidden p-0 mb-2 bg-gray-200 rounded shadow"
      key={collection.slug}
    >
      <div className="flex-grow p-2">
        {collection.name} ({collection.owned_asset_count})
      </div>
      <div className="flex justify-center p-2 w-1/6 bg-blue-300 rounded-l">
        F: {collection.stats.floor_price?.toFixed(2)}Ξ
      </div>
      <div className="flex justify-center p-2 w-1/6 bg-green-300">
        1D/V: {collection.stats.one_day_volume?.toFixed(2)}Ξ
      </div>
    </article>
  );

};
