import 'tailwindcss/tailwind.css';
import { GlobalStyles } from 'twin.macro';
import type { AppProps } from 'next/app';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Floor Track</title>
      </Head>
      <GlobalStyles />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
