import { Collection } from '../types';

export function calculateCollectionValue(collections: Collection[]): string {
  const value: string = collections
    .reduce(
      (sum, collection): number =>
        sum + collection.owned_asset_count * collection.stats.floor_price,
      0
    )
    .toFixed(2);

  return `${value}Ξ`;
}

export function calculateCollectionSize(collections: Collection[]): number {
  const size: number = collections.reduce(
    (sum, col): number => sum + col.owned_asset_count,
    0
  );

  return size;
}
