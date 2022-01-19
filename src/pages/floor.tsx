import { NextPage, NextPageContext } from 'next';
import { setTimeout } from 'timers/promises';
import { useState } from 'react';
import tw from 'twin.macro';
import { Collection } from '../types';
import { CollectionCard } from '../components/CollectionCard';
import { ModiferCard } from '../components/ModiferCard';
import { WalletStatCard } from '../components/WalletStatCard';
import { CenterContainer } from '../styles/Containers';
import { Brand } from '../styles/Typography';
import { SupportCard } from '../components/SupportCard';

export const sortOptions = [{ name: 'floor' }, { name: 'vol' }];

interface Props {
  data: Collection[];
}

const Floor: NextPage<Props> = (props) => {
  const [isSortBy, setIsSortBy] = useState(sortOptions[0]);
  const [isSmallHidden, setIsSmallHidden] = useState(false);
  const [isSmVolHidden, setIsSmVolHidden] = useState(false);

  const data = props.data;

  if (!data) {
    return (
      <CenterContainer>
        <p>
          <span className="font-bold text-red-400 uppercase">error</span>:{' '}
          something went wrong
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
          {data.map((collection: Collection) => (
            <CollectionCard collection={collection} key={collection.slug} />
          ))}
        </CollectionContainer>
        <Sidebar>
          <WalletStatCard collections={data} />
          <ModiferCard
            isSmVolHidden={isSmVolHidden}
            isSmallHidden={isSmallHidden}
            isSortBy={isSortBy}
            setIsSmVolHidden={setIsSmVolHidden}
            setIsSmallHidden={setIsSmallHidden}
            setIsSortBy={setIsSortBy}
          />
          <SupportCard />
        </Sidebar>
      </div>
    </main>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const wallet: string = context.query.wallet as string;

  const res = await fetch(
    `https://api.opensea.io/api/v1/collections?asset_owner=${wallet}&offset=0&limit=300`
  );
  const data = await res.json();

  const collections: Collection[] = [];

  for (const collection of data) {
    await setTimeout(1000);
    const res = await fetch(
      `https://api.opensea.io/api/v1/collection/${collection.slug}/stats`,
      {
        method: 'GET',
        headers: { 'X-API-KEY': `${process.env.OS_API_KEY ?? null}` },
      }
    );

    const data = await res.json();

    collections.push({
      ...collection,
      stats: data.stats,
    });
  }

  return {
    props: { data: collections }, // will be passed to the page component as props
  };
}

const Sidebar = tw.section`flex flex-col col-span-1 md:col-span-2`;
const CollectionContainer = tw.section`flex flex-col col-span-4`;

export default Floor;
