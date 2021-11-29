import { useState } from 'react';
import Link from 'next/link';
import type { NextPage } from 'next';
import tw from 'twin.macro';

const Home: NextPage = () => {
  const [wallet, setWallet] = useState('');

  return (
    <CenterContainer>
      <div className="flex flex-col">
        <Title>floor track</Title>
        <div className="flex">
          <Input
            type="text"
            placeholder="wallet address"
            onChange={(e) => setWallet(e.target.value)}
          />
          <Link href={`/floor?wallet=${wallet}`} passHref>
            <AButton>view</AButton>
          </Link>
        </div>
      </div>
    </CenterContainer>
  );
};

const Input = tw.input`p-2 rounded border`;
const Title = tw.h2`mb-2 text-5xl font-brand tracking-wide text-indigo-400 z-50`;
const AButton = tw.a`p-2 ml-1 bg-blue-300 rounded shadow hover:bg-blue-400 cursor-pointer`;
const CenterContainer = tw.div`grid place-itmes-center h-screen`;


export default Home;
