import {
  calculateCollectionSize,
  calculateCollectionValue,
} from '../lib/collectionUtils';
import { Collection } from '../types';

export const WalletStatCard = ({
  collections,
}: {
  collections: Collection[];
}) => {
  return (
    <article className="overflow-hidden mb-2 bg-gray-200 rounded shadow">
      <h3 className="p-2 tracking-wide uppercase bg-purple-400 text-md">
        stats
      </h3>
      <p className="p-2">
        collection value: {calculateCollectionValue(collections)}
      </p>
      <p className="p-2">
        collection size: {calculateCollectionSize(collections)}
      </p>
    </article>
  );

};
