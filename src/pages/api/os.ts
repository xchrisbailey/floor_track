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

    if (!wallet || wallet === undefined) throw new Error('Must provide wallet');

    const { data } = await axios(
      `https://api.opensea.io/api/v1/collections?asset_owner=${wallet}&offset=0&limit=300`,
      {
        method: 'GET',
        headers: { 'X-API-KEY': `${process.env.OS_API_KEY ?? null}` },
      }
    );

    let collections: Collection[] = [];

    for (const collection of data) {
      await setTimeout(500);
      const { data } = await axios.get(
        `https://api.opensea.io/api/v1/collection/${collection.slug}/stats`,
        {
          method: 'GET',
          headers: { 'X-API-KEY': `${process.env.OS_API_KEY ?? null}` },
        }
      );

      collections.push({
        ...collection.primary_asset_contracts[0],
        stats: data.stats,
      });
    }

    if (!collections) throw new Error('No collections found');

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
    if (err.data?.detail) {
      console.error(err);
      throw new Error(err.data.detail);
    } else {
      console.error(err);
      throw new Error(err.message);
    }
  }
}
