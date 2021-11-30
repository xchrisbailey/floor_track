import React from 'react';
import { Collection } from '../types';
import {
  CardBase,
  CardHeader,
  CardImage,
  CardInfoTab,
  CardLink,
} from '../styles/Card';

interface Props {
  collection: Collection;
}

export const CollectionCard = ({ collection }: Props) => {
  return (
    <CardBase type="collection" key={collection.slug}>
      <CardHeader type="collection" color="default">
        {collection?.image_url && (
          <CardImage
            src={collection.image_url}
            alt={`${collection.name} logo image`}
            height={30}
            width={30}
          />
        )}
        <CardLink
          href={`https://opensea.io/collection/${collection.slug}`}
          target="_blank"
          rel="noreferrer"
        >
          {collection.name}
        </CardLink>{' '}
        ({collection.owned_asset_count})
      </CardHeader>
      <CardInfoTab position="left" color="blue">
        F: {collection.stats.floor_price?.toFixed(2)}Ξ
      </CardInfoTab>
      <CardInfoTab color="green">
        1D/V: {collection.stats.one_day_volume?.toFixed(2)}Ξ
      </CardInfoTab>
    </CardBase>
  );
};
