import { NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import { Fragment, useState } from 'react';
import useSWR from 'swr';
import { Listbox, Transition, Switch } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import {
  calculateCollectionSize,
  calculateCollectionValue,
} from '../lib/collectionUtils';
import { fetcher } from '../lib/fetcher';
import { Collection } from '../types';

const sortOptions = [{ name: 'floor' }, { name: 'vol' }];

const Floor: NextPage = () => {
  const router = useRouter();
  const { wallet } = router.query;

  const [isSortBy, setIsSortBy] = useState(sortOptions[0]);
  const [isSmallHidden, setIsSmallHidden] = useState(false);
  const [isVolHidden, setIsVolHidden] = useState(false);

  const { data, error } = useSWR<{ collections: Collection[] }>(
    `/api/os?wallet=${wallet}&sort=${isSortBy.name}&vol=${isVolHidden}&small=${isSmallHidden}`,
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
              className="flex p-0 mb-2 overflow-hidden bg-gray-200 rounded shadow"
              key={collection.slug}
            >
              <div className="flex-grow p-2">
                {collection.name} ({collection.owned_asset_count})
              </div>
              <div className="p-2 bg-blue-300 rounded-l">
                F: {collection.stats.floor_price}Ξ
              </div>
              <div className="p-2 bg-green-300">
                1D: {collection.stats.one_day_volume}Ξ
              </div>
            </article>
          ))}
        </section>
        <section className="col-span-2">
          <article className="mb-2 overflow-hidden bg-gray-200 rounded shadow">
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
          <article className="bg-gray-200 rounded shadow">
            <h3 className="tracking-wide p-2 bg-yellow-400 uppercase text-md rounded-t">
              filters
            </h3>
            <section className="p-2">
              <p className="text-xs px-2 mt-1">sort by:</p>
              <Listbox value={isSortBy} onChange={setIsSortBy}>
                <div className="relative mt-1 mb-2">
                  <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
                    <span className="block truncate">{isSortBy.name}</span>
                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <SelectorIcon
                        className="w-5 h-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {sortOptions.map((sort, sortIdx) => (
                        <Listbox.Option
                          key={sortIdx}
                          value={sort}
                          className={({ active }) =>
                            `${
                              active
                                ? 'text-amber-900 bg-amber-100'
                                : 'text-gray-900'
                            }
                          cursor-default select-none relative py-2 pl-10 pr-4`
                          }
                        >
                          {({ selected, active }) => (
                            <>
                              <span
                                className={`${
                                  selected ? 'font-medium' : 'font-normal'
                                } block truncate`}
                              >
                                {sort.name}
                              </span>
                              {selected ? (
                                <span
                                  className={`${
                                    active ? 'text-amber-600' : 'text-amber-600'
                                  }
                                absolute inset-y-0 left-0 flex items-center pl-3`}
                                >
                                  <CheckIcon
                                    className="w-5 h-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            </section>
            <section className="p-2 flex items-center space-between">
              <p className="pr-2 text-sm flex-grow">Hide small values</p>
              <Switch
                checked={isSmallHidden}
                onChange={setIsSmallHidden}
                className={`${
                  isSmallHidden ? 'bg-pink-400' : 'bg-gray-300'
                } relative inline-flex items-center h-6 rounded-full w-11`}
              >
                <span className="sr-only">Hide small floor values</span>
                <span
                  className={`${
                    isSmallHidden ? 'translate-x-6' : 'translate-x-1'
                  } inline-block w-4 h-4 transform bg-white rounded-full`}
                />
              </Switch>
            </section>
            <section className="p-2 flex items-center space-between">
              <p className="pr-2 text-sm flex-grow">
                Hide low volume collections
              </p>
              <Switch
                checked={isVolHidden}
                onChange={setIsVolHidden}
                className={`${
                  isVolHidden ? 'bg-purple-400' : 'bg-gray-300'
                } relative inline-flex items-center h-6 rounded-full w-11`}
              >
                <span className="sr-only">Hide Small Floor Values</span>
                <span
                  className={`${
                    isVolHidden ? 'translate-x-6' : 'translate-x-1'
                  } inline-block w-4 h-4 transform bg-white rounded-full`}
                />
              </Switch>
            </section>
          </article>
        </section>
      </div>
    </main>
  );
};

export default Floor;
