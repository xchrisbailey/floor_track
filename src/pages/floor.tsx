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
import { CollectionCard } from '../components/Collection';

const sortOptions = [{ name: 'floor' }, { name: 'vol' }];
const tipAmounts = [
  { amount: 0.01 },
  { amount: 0.1 },
  { amount: 0.25 },
  { amount: 0.5 },
  { amount: 0.75 },
  { amount: 1 },
];

const Floor: NextPage = () => {
  const router = useRouter();
  const { wallet } = router.query;

  const [isSortBy, setIsSortBy] = useState(sortOptions[0]);
  const [isSmallHidden, setIsSmallHidden] = useState(false);
  const [isSmVolHidden, setIsSmVolHidden] = useState(false);
  const [tipAmount, setTipAmount] = useState(tipAmounts[1]);

  const { data, error } = useSWR<{ collections: Collection[] }>(
    `/api/os?wallet=${wallet}&sort=${isSortBy.name}&vol=${isSmVolHidden}&small=${isSmallHidden}`,
    fetcher
  );

  if (error) {
    return (
      <main className="grid place-items-center h-screen">
        <p>
          <span className="font-bold text-red-400 uppercase">error</span>:{' '}
          {error.message}
        </p>
      </main>
    );
  }

  if (!data) {
    return (
      <main className="grid place-items-center h-screen">
        <div
          style={{ borderTopColor: 'transparent' }}
          className="w-16 h-16 rounded-full border-4 border-blue-400 border-solid animate-spin"
        ></div>
      </main>
    );
  }

  return (
    <main className="p-1 w-full md:container md:p-0 md:mx-auto">
      <header>
        <h1 className="text-2xl font-bold tracking-wider text-indigo-400 uppercase">
          FLOOR TRACK
        </h1>
      </header>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-6">
        <section className="flex flex-col col-span-4">
          {data.collections.map((collection: Collection) => (
            <CollectionCard collection={collection} key={collection.slug} />
          ))}
        </section>
        <section className="col-span-2">
          <article className="overflow-hidden mb-2 bg-gray-200 rounded shadow">
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
          <article className="mb-2 bg-gray-200 rounded shadow">
            <h3 className="p-2 tracking-wide uppercase bg-yellow-400 rounded-t text-md">
              Modifiers
            </h3>
            <article className="p-2">
              <p className="px-2 mt-1 text-xs">sort by:</p>
              <Listbox value={isSortBy} onChange={setIsSortBy}>
                <div className="relative mt-1 mb-2">
                  <Listbox.Button className="relative py-2 pr-10 pl-3 w-full text-left bg-white rounded-lg shadow-md cursor-default sm:text-sm focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300">
                    <span className="block truncate">{isSortBy.name}</span>
                    <span className="flex absolute inset-y-0 right-0 items-center pr-2 pointer-events-none">
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
                    <Listbox.Options className="overflow-auto absolute z-50 py-1 mt-1 w-full max-h-60 text-base bg-white rounded-md ring-1 ring-black ring-opacity-5 shadow-lg sm:text-sm focus:outline-none">
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
            </article>
            <article className="flex items-center p-2 space-between">
              <p className="flex-grow pr-2 text-sm">Hide small values</p>
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
            </article>
            <article className="flex items-center p-2 space-between">
              <p className="flex-grow pr-2 text-sm">
                Hide low volume collections
              </p>
              <Switch
                checked={isSmVolHidden}
                onChange={setIsSmVolHidden}
                className={`${
                  isSmVolHidden ? 'bg-purple-400' : 'bg-gray-300'
                } relative inline-flex items-center h-6 rounded-full w-11`}
              >
                <span className="sr-only">Hide Small Floor Values</span>
                <span
                  className={`${
                    isSmVolHidden ? 'translate-x-6' : 'translate-x-1'
                  } inline-block w-4 h-4 transform bg-white rounded-full`}
                />
              </Switch>
            </article>
          </article>
          <article className="mb-2 bg-gray-200 rounded shadow">
            <h3 className="p-2 tracking-wide uppercase bg-pink-400 rounded-t text-md">
              support
            </h3>
            <section className="p-2 border-b">
              <p>
                Any questions or feature request please email me{' '}
                <a
                  href="mailto:"
                  className="text-blue-500 underline hover:text-blue-700"
                >
                  here
                </a>
              </p>
            </section>
            <section className="p-2">
              <p>Help support continued develepment by sending a tip:</p>
              <div className="flex mt-1 mb-2">
                <Listbox value={tipAmount} onChange={setTipAmount}>
                  <div className="relative flex-grow mt-1">
                    <Listbox.Button className="relative py-2 pr-10 pl-3 w-full text-left bg-white rounded-lg shadow-md cursor-default sm:text-sm focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300">
                      <span className="block truncate">
                        {tipAmount.amount}Ξ
                      </span>
                      <span className="flex absolute inset-y-0 right-0 items-center pr-2 pointer-events-none">
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
                      <Listbox.Options className="overflow-auto absolute py-1 mt-1 w-full max-h-60 text-base bg-white rounded-md ring-1 ring-black ring-opacity-5 shadow-lg sm:text-sm focus:outline-none">
                        {tipAmounts.map((amt, amtIdx) => (
                          <Listbox.Option
                            key={amtIdx}
                            className={({ active }) =>
                              `${
                                active
                                  ? 'text-amber-900 bg-amber-100'
                                  : 'text-gray-900'
                              }
                          cursor-default select-none relative py-2 pl-10 pr-4`
                            }
                            value={amt}
                          >
                            {({ selected, active }) => (
                              <>
                                <span
                                  className={`${
                                    selected ? 'font-medium' : 'font-normal'
                                  } block truncate`}
                                >
                                  {amt.amount}Ξ
                                </span>
                                {selected ? (
                                  <span
                                    className={`${
                                      active
                                        ? 'text-amber-600'
                                        : 'text-amber-600'
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
                <a
                  href="#"
                  className="flex justify-center items-center px-2 mt-1 ml-1 w-1/4 uppercase bg-pink-400 rounded shadow hover:bg-pink-500"
                >
                  send
                </a>
              </div>
            </section>
          </article>
        </section>
      </div>
    </main>
  );
};


export default Floor;
