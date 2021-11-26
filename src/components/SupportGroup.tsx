import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import tw, { styled } from 'twin.macro';
import React, { Fragment, useState } from 'react';

const tipAmounts = [
  { amount: 0.01 },
  { amount: 0.1 },
  { amount: 0.25 },
  { amount: 0.5 },
  { amount: 0.75 },
  { amount: 1 },
];

export const SupportGroup = () => {
  const [tipAmount, setTipAmount] = useState(tipAmounts[1]);
  return (
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
                <span className="block truncate">{tipAmount.amount}Ξ</span>
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

          <a
            href="#"
            className="flex justify-center items-center px-2 mt-1 ml-1 w-1/4 uppercase bg-pink-400 rounded shadow hover:bg-pink-500"
          >
            send
          </a>
        </div>
      </section>
    </article>
  );

};
