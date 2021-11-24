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
      <div className="p-2 w-1/2 md:flex-grow">
        <p className="flex items-center whitespace-pre-wrap">
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
            target="_blank"
            className="mx-2 text-blue-700 underline hover:text-blue-800 hover:no-underline"
            rel="noreferrer"
          >
            {collection.name}
          </a>{' '}
          ({collection.owned_asset_count})
        </p>
      </div>
      <div className="flex justify-center items-center p-2 w-1/4 bg-blue-300 rounded-l md:w-1/5">
        F: {collection.stats.floor_price?.toFixed(2)}Ξ
      </div>
      <div className="flex justify-center items-center p-2 w-1/4 bg-green-300 md:w-1/5">
        1D/V: {collection.stats.one_day_volume?.toFixed(2)}Ξ
      </div>
    </article>
  );

};
