import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import { Dispatch, Fragment, SetStateAction } from 'react';
import { sortOptions } from '../pages/floor';
import { CardBase, CardContent, CardHeader } from '../styles/Card';
import {
  Toggle,
  ToggleAccess,
  ToggleContainer,
  ToggleLabel,
  ToggleSlider,
} from '../styles/Toggle';

export const ModiferCard = (props: {
  isSortBy: {
    name: string;
  };
  isSmallHidden: boolean;
  isSmVolHidden: boolean;
  setIsSortBy: Dispatch<SetStateAction<{ name: string }>>;
  setIsSmallHidden: Dispatch<SetStateAction<boolean>>;
  setIsSmVolHidden: Dispatch<SetStateAction<boolean>>;
}) => {
  const {
    isSmVolHidden,
    isSmallHidden,
    isSortBy,
    setIsSmVolHidden,
    setIsSmallHidden,
    setIsSortBy,
  } = props;
  return (
    <CardBase type="info">
      <CardHeader color="yellow" type="info">
        Modifiers
      </CardHeader>
      <CardContent>
        <div className="flex items-center">
          <p className="px-2 mt-1 w-1/2 text-sm">sort by:</p>
          <Listbox value={isSortBy} onChange={setIsSortBy}>
            <div className="relative mt-1 mb-2 w-1/2">
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
        </div>
        <ToggleContainer>
          <ToggleLabel>Hide small values</ToggleLabel>
          <Toggle
            checked={isSmallHidden}
            onChange={setIsSmallHidden}
            color="pink"
          >
            <ToggleAccess className="sr-only">
              Hide small floor values
            </ToggleAccess>
            <ToggleSlider checked={isSmallHidden} />
          </Toggle>
        </ToggleContainer>
        <ToggleContainer>
          <ToggleLabel>Hide low volume collections</ToggleLabel>
          <Toggle
            color="purple"
            checked={isSmVolHidden}
            onChange={setIsSmVolHidden}
          >
            <ToggleAccess>Hide Small Floor Values</ToggleAccess>
            <ToggleSlider checked={isSmVolHidden} />
          </Toggle>
        </ToggleContainer>
      </CardContent>
    </CardBase>
  );

};
