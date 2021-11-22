import React from 'react';
import Image from 'next/image';
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
        <p className="flex items-center">
          {collection?.image_url && (
            <Image
              src={collection.image_url}
              alt={`${collection.name} logo image`}
              height={30}
              width={30}
              className="rounded-full shadow-inner"
            />
          )}
          <a
            href={`https://opensea.io/collection/${collection.slug}`}
            className="mx-2 text-blue-700 underline hover:text-blue-800 hover:no-underline"
          >
            {collection.name}
          </a>{' '}
          ({collection.owned_asset_count})
        </p>
      </div>
      <div className="flex justify-center items-center p-2 w-1/5 bg-blue-300 rounded-l">
        F: {collection.stats.floor_price?.toFixed(2)}Ξ
      </div>
      <div className="flex justify-center items-center p-2 w-1/5 bg-green-300">
        1D/V: {collection.stats.one_day_volume?.toFixed(2)}Ξ
      </div>
    </article>
  );

};
