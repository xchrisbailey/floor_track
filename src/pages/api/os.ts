import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { setTimeout } from 'timers/promises';

import { Collection } from '../../types';

interface Data {
  collections: Collection[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const { wallet, sort, vol, small } = req.query;

    if (!wallet) throw new Error('Must provide wallet');
    await setTimeout(70);
    const { data } = await axios.get(
      `https://api.opensea.io/api/v1/collections?asset_owner=${wallet}&offset=0&limit=300`,
      {
        headers: { 'X-API-KEY': `${process.env.OS_API_KEY ?? null}` },
      }
    );

    let collections: Collection[] = await Promise.all(
      data.map(async (collection: Collection) => {
        await setTimeout(70);

        const { data }: { data: Collection } = await axios.get(
          `https://api.opensea.io/api/v1/collection/${collection.slug}/stats`,
          {
            headers: { 'X-API-KEY': `${process.env.OS_API_KEY ?? null}` },
          }
        );

        return {
          ...collection,
          stats: data,
        };
      })
    );

    if (small === 'true') {
      collections = collections.filter(
        (data) => data.stats.floor_price >= 0.01
      );
    }

    if (vol === 'true') {
      collections = collections.filter(
        (data) => data.stats.one_day_volume !== 0
      );
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
  } catch (err: any) {
    if (err.data.detail) {
      throw new Error(err.data.detail);
    } else {
      throw new Error(err.message);
    }
  }
}
