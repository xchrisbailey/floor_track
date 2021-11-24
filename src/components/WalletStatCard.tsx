import {
  calculateCollectionSize,
  calculateCollectionValue,
} from '../lib/collectionUtils';
import { CardBase, CardContent, CardHeader } from '../styles/Card';
import { Collection } from '../types';

export const WalletStatCard = ({
  collections,
}: {
  collections: Collection[];
}) => {
  return (
    <CardBase>
      <CardHeader color="purple">stats</CardHeader>
      <CardContent>
        <p>collection value: {calculateCollectionValue(collections)}</p>
        <p>collection size: {calculateCollectionSize(collections)}</p>
      </CardContent>
    </CardBase>
  );
};
