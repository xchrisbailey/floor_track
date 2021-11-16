import { NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import useSWR from 'swr';
import {
  calculateCollectionSize,
  calculateCollectionValue,
} from '../lib/collectionUtils';
import { fetcher } from '../lib/fetcher';
import { Collection } from '../types';

const Floor: NextPage = () => {
  const router = useRouter();
  const { wallet } = router.query;

  const { data, error } = useSWR<{ collections: Collection[] }>(
    `/api/os?wallet=${wallet}`,
    fetcher
  );

  if (error) {
    return (
      <main className="grid h-screen place-items-center">
        <p>
          <span className="font-bold text-red-400 uppercase">error</span>:{' '}
          {error.message}
        </p>
      </main>
    );
  }

  if (!data) {
    return (
      <main className="grid h-screen place-items-center">
        <p>loading...</p>
      </main>
    );
  }

  return (
    <main className="w-full p-1 md:p-0 md:container md:mx-auto">
      <header>
        <h1 className="text-2xl font-bold tracking-wider text-indigo-400 uppercase">
          FLOOR TRACK
        </h1>
      </header>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-6">
        <section className="flex flex-col col-span-4">
          {data.collections.map((collection: Collection) => (
            <article
              className="flex p-0 mb-2 overflow-hidden bg-gray-200 rounded"
              key={collection.slug}
            >
              <div className="flex-grow p-2">
                {collection.name} ({collection.owned_asset_count})
              </div>
              <div className="p-2 bg-blue-300">
                F: {collection.stats.floor_price.toFixed(2)}Ξ
              </div>
              <div className="p-2 bg-green-300">
                1D: {collection.stats.one_day_volume.toFixed(2)}Ξ
              </div>
            </article>
          ))}
        </section>
        <section className="col-span-2">
          <article className="mb-2 overflow-hidden bg-gray-200 rounded">
            <h3 className="p-2 tracking-wide uppercase bg-purple-400 text-md">
              stats
            </h3>
            <p className="p-2">
              collection value: {calculateCollectionValue(data.collections)}
            </p>
            <p className="p-2">
              collection size: {calculateCollectionSize(data.collections)}
            </p>
          </article>
          <article className="p-2 bg-yellow-400 rounded">
            <h3 className="tracking-wide uppercase text-md">filters</h3>
          </article>
        </section>
      </div>
    </main>
  );
};

export default Floor;
