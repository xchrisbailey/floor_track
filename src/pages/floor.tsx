import { NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import useSWR from 'swr';
import { Collection } from './api/os';

interface Props {}

async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(input, init);
  return res.json();
}

const Floor: NextPage = (_props: Props) => {
  const router = useRouter();
  const { wallet } = router.query;

  const { data } = useSWR<Collection>(`/api/os?wallet=${wallet}`, fetcher);

  return (
    <div>
      <h1>floor</h1>
    </div>
  );
};

export default Floor;
