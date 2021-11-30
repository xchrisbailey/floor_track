import { NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import { useState } from 'react';
import useSWR from 'swr';
import tw from 'twin.macro';
import { fetcher } from '../lib/fetcher';
import { Collection } from '../types';
import { CollectionCard } from '../components/CollectionCard';
import { ModiferCard } from '../components/ModiferCard';
import { WalletStatCard } from '../components/WalletStatCard';
import { CenterContainer } from '../styles/containers';
import { Brand } from '../styles/Typography';

export const sortOptions = [{ name: 'floor' }, { name: 'vol' }];

const Floor: NextPage = () => {
  const router = useRouter();
  const { wallet } = router.query;

  const [isSortBy, setIsSortBy] = useState(sortOptions[0]);
  const [isSmallHidden, setIsSmallHidden] = useState(false);
  const [isSmVolHidden, setIsSmVolHidden] = useState(false);

  const { data, error } = useSWR<{ collections: Collection[] }>(
    `/api/os?wallet=${wallet}&sort=${isSortBy.name}&vol=${isSmVolHidden}&small=${isSmallHidden}`,
    fetcher
  );

  if (error) {
    return (
      <CenterContainer>
        <p>
          <span className="font-bold text-red-400 uppercase">error</span>:{' '}
          {error.message}
        </p>
      </CenterContainer>
    );
  }

  if (!data) {
    return (
      <CenterContainer>
        <div
          style={{ borderTopColor: 'transparent' }}
          className="w-16 h-16 rounded-full border-4 border-blue-400 border-solid animate-spin"
        ></div>
      </CenterContainer>
    );
  }

  return (
    <main className="p-1 w-full md:container md:p-0 md:mx-auto">
      <header className="mt-2 mb-3">
        <Brand>FLOOR TRACK</Brand>
      </header>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-6">
        <CollectionContainer>
          {data.collections.map((collection: Collection) => (
            <CollectionCard collection={collection} key={collection.slug} />
          ))}
        </CollectionContainer>
        <Sidebar>
          <WalletStatCard collections={data.collections} />
          <ModiferCard
            isSmVolHidden={isSmVolHidden}
            isSmallHidden={isSmallHidden}
            isSortBy={isSortBy}
            setIsSmVolHidden={setIsSmVolHidden}
            setIsSmallHidden={setIsSmallHidden}
            setIsSortBy={setIsSortBy}
          />
        </Sidebar>
      </div>
    </main>
  );
};

const Sidebar = tw.section`flex flex-col col-span-1 md:col-span-2`;
const CollectionContainer = tw.section`flex flex-col col-span-4`;


export default Floor;
