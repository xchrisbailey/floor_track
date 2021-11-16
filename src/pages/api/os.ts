import type { NextApiRequest, NextApiResponse } from 'next';
import { Collection } from '../../types';

interface Data {
  collections: Collection[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (!req.query.wallet) throw new Error('Must provide wallet');

  const dres = await fetch(
    `https://api.opensea.io/api/v1/collections?asset_owner=${req.query.wallet}&offset=0&limit=300`
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

  res.status(200).json({ collections: expData });
}
