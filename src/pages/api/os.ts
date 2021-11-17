import type { NextApiRequest, NextApiResponse } from 'next';
import { Collection } from '../../types';

interface Data {
  collections: Collection[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { wallet, sort } = req.query;

  if (!wallet) throw new Error('Must provide wallet');

  const dres = await fetch(
    `https://api.opensea.io/api/v1/collections?asset_owner=${wallet}&offset=0&limit=300`
  );

  const data: Collection[] = await dres.json();

  const expData: Collection[] = await Promise.all(
    data.map(async (collection) => {
      const res = await fetch(
        `https://api.opensea.io/api/v1/collection/${collection.slug}/stats`
      );
      const stats = await res.json();

      const newCollection = {
        description: collection.description,
        image_url: collection.image_url,
        name: collection.name,
        owned_asset_count: collection.owned_asset_count,
        slug: collection.slug,
        stats: { ...stats.stats },
      };

      return newCollection;
    })
  );

  let sortedData;

  if (sort === 'floor') {
    sortedData = expData.sort((a, b) =>
      a.stats.floor_price < b.stats.floor_price ? 1 : -1
    );
  } else {
    sortedData = expData.sort((a, b) =>
      a.stats.one_day_volume < b.stats.one_day_volume ? 1 : -1
    );
  }

  res.status(200).json({ collections: sortedData });
}
