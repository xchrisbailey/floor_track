import '../styles/global.css';
import { GlobalStyles } from 'twin.macro';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { SWRDevtools } from '@jjordy/swr-devtools';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Floor Track</title>
      </Head>
      <GlobalStyles />
      <SWRDevtools>
        <Component {...pageProps} />
      </SWRDevtools>
    </>
  );
}

export default MyApp;
