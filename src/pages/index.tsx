import { useState } from 'react';
import Link from 'next/link';
import type { NextPage } from 'next';
import tw from 'twin.macro';

const Input = tw.input`p-2 rounded border`;

const AButton = tw.a`p-2 ml-1 bg-blue-300 rounded shadow hover:bg-blue-400 cursor-pointer`;

const Home: NextPage = () => {
  const [wallet, setWallet] = useState('');

  return (
    <div className="grid place-items-center h-screen">
      <div className="flex flex-col">
        <h1 className="mb-2 text-3xl font-bold tracking-wide">floor check</h1>
        <div className="flex">
          <Input
            type="text"
            placeholder="wallet address"
            onChange={(e) => setWallet(e.target.value)}
          />
          <Link href={`/floor?wallet=${wallet}`}>
            <AButton>view</AButton>
          </Link>
        </div>
      </div>
    </div>
  );
};


export default Home;
