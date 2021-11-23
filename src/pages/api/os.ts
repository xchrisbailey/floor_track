import type { NextApiRequest, NextApiResponse } from 'next';
import { Collection } from '../../types';

interface Data {
  collections: Collection[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { wallet, sort, vol, small } = req.query;

  if (!wallet) throw new Error('Must provide wallet');

  const config: RequestInit = {
    method: 'GET',
    headers: { 'X-API-KEY': `${process.env.OS_API_KEY}` },
  };

  const collectionResponse = await fetch(
    `https://api.opensea.io/api/v1/collections?asset_owner=${wallet}&offset=0&limit=300`,
    config
  );

  let collections: Collection[] = await collectionResponse.json();

  collections = await Promise.all(
    collections.map(async (collection) => {
      const res = await fetch(
        `https://api.opensea.io/api/v1/collection/${collection.slug}/stats`
      );
      const stats = await res.json();

      return {
        ...collection,
        stats: { ...stats.stats },
      };
    })
  );

  if (small === 'true') {
    collections = collections.filter((data) => data.stats.floor_price >= 0.01);
  }

  if (vol === 'true') {
    collections = collections.filter((data) => data.stats.one_day_volume !== 0);
  }

  if (sort === 'floor') {
    collections = collections.sort((a, b) =>
      a.stats.floor_price < b.stats.floor_price ? 1 : -1
    );
  } else {
    collections = collections.sort((a, b) =>
      a.stats.one_day_volume < b.stats.one_day_volume ? 1 : -1
    );
  }

  res.status(200).json({ collections: collections });
}
