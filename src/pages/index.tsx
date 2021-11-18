import { useState } from 'react';
import Link from 'next/link';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  const [wallet, setWallet] = useState('');

  return (
    <div className="grid place-items-center h-screen">
      <div className="flex flex-col">
        <h1 className="mb-2 text-3xl font-bold tracking-wide">floor check</h1>
        <div className="flex">
          <input
            type="text"
            placeholder="wallet address"
            className="p-2 rounded border"
            onChange={(e) => setWallet(e.target.value)}
          />
          <Link href={`/floor?wallet=${wallet}`}>
            <a className="p-2 ml-1 bg-blue-300 rounded shadow hover:bg-blue-400">
              view
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};


export default Home;
