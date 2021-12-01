import React from 'react';
import { Collection } from '../types';
import { CardBase, CardHeader, CardImage, CardInfoTab } from '../styles/Card';
import { Hyper } from '../styles/Typography';

interface Props {
  collection: Collection;
}

export const CollectionCard = ({ collection }: Props) => {
  const [statsOpen, setStatsOpen] = React.useState(false);

  return (
    <>
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
          <Hyper
            className="px-2"
            href={`https://opensea.io/collection/${collection.slug}`}
            target="_blank"
            rel="noreferrer"
          >
            {collection.name}
          </Hyper>{' '}
          ({collection.owned_asset_count})
        </CardHeader>
        <CardInfoTab position="left" color="blue">
          F: {collection.stats.floor_price?.toFixed(2)}Ξ
        </CardInfoTab>
        <CardInfoTab color="green">
          1D/V: {collection.stats.one_day_volume?.toFixed(2)}Ξ
        </CardInfoTab>
      </CardBase>
      <div className="z-0 mx-auto mb-3 -mt-0.5 w-11/12 bg-gray-50 rounded-b shadow">
        {!statsOpen && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="pt-1 mx-auto w-4 h-4 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            onClick={() => setStatsOpen(true)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        )}
        {statsOpen && (
          <>
            <div className="p-2 w-full">
              <div className="flex justify-between mx-auto mb-1 w-10/12">
                <Hyper
                  className="px-2"
                  href={`https://opensea.io/collection/${collection.slug}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  opensea
                </Hyper>
                <Hyper
                  className="px-2"
                  href={collection.discord_url}
                  target="_blank"
                  rel="noreferrer"
                >
                  discord
                </Hyper>
                <Hyper
                  className="px-2"
                  href={`https://twitter.com/${collection.twitter_username}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  twitter
                </Hyper>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex-row bg-white rounded">
                  <h3 className="p-2 tracking-wide bg-purple-300 rounded-t">
                    24 hour stats
                  </h3>
                  <div className="p-2">
                    <p className="flex justify-between py-2 w-full">
                      one day volume:{' '}
                      <span>
                        {collection.stats.one_day_volume?.toFixed(2)}Ξ
                      </span>
                    </p>
                    <p className="flex justify-between py-2">
                      one day sales:{' '}
                      <span>{collection.stats.one_day_sales?.toFixed(0)}</span>
                    </p>
                    <p className="flex justify-between py-2">
                      average price:{' '}
                      <span>
                        {collection.stats.one_day_average_price?.toFixed(2)}Ξ
                      </span>
                    </p>
                  </div>
                </div>
                <div className="flex-row bg-white rounded">
                  <h3 className="p-2 tracking-wide bg-yellow-300 rounded-t">
                    user stats
                  </h3>
                  <div className="p-2">
                    <p className="flex justify-between w-full">
                      total owned: <span>{collection.owned_asset_count}</span>{' '}
                    </p>
                  </div>
                </div>
                <div className="flex-row bg-white rounded">
                  <h3 className="p-2 tracking-wide bg-blue-300 rounded-t">
                    collection info
                  </h3>
                  <div className="p-2">
                    <p className="flex justify-between w-full">
                      total supply: <span>{collection.stats.total_supply}</span>
                    </p>
                    <p className="flex justify-between w-full">
                      owner count: <span>{collection.stats.num_owners}</span>{' '}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="pt-1 mx-auto w-4 h-4 cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              onClick={() => setStatsOpen(false)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 15l7-7 7 7"
              />
            </svg>
          </>
        )}
      </div>
    </>
  );

};
