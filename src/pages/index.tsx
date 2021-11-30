import { useState } from 'react';
import Link from 'next/link';
import type { NextPage } from 'next';
import tw from 'twin.macro';
import { CenterContainer } from '../styles/containers';
import { LinkButton } from '../styles/Button';
import { Input } from '../styles/Input';
import { Brand } from '../styles/Typography';

const Home: NextPage = () => {
  const [wallet, setWallet] = useState('');

  return (
    <CenterContainer>
      <div className="flex flex-col">
        <Brand>floor track</Brand>
        <div className="flex">
          <Input
            width="auto"
            type="text"
            placeholder="wallet address"
            onChange={(e) => setWallet(e.target.value)}
          />
          <Link href={`/floor?wallet=${wallet}`} passHref>
            <LinkButton color="blue">view</LinkButton>
          </Link>
        </div>
      </div>
    </CenterContainer>
  );
};


export default Home;
