import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <div className="grid place-items-center h-screen">
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold tracking-wide mb-2">floor check</h1>
        <div className="flex">
          <input
            type="text"
            placeholder="wallet address"
            className="border p-2 rounded"
          />
          <a
            href="#"
            className="bg-blue-300 hover:bg-blue-400 shadow p-2 rounded ml-1"
          >
            view
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
