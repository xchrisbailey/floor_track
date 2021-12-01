import React from 'react';
import { CardBase, CardContent, CardHeader } from '../styles/Card';
import { Hyper } from '../styles/Typography';

export const SupportCard = () => {
  return (
    <CardBase type="info">
      <CardHeader color="pink" type="info">
        support
      </CardHeader>
      <CardContent>
        <p className="pb-2 mb-2 border-b">
          Any bug reports, or feature requests can be made on the{' '}
          <Hyper href="https://github.com/xchrisbailey/floor_track/issues">
            github
          </Hyper>{' '}
          page.
        </p>
        <p className="pb-2">
          Interested in supporting continued development or buying me a nacho
          belle grande? Toss a little eth at:{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-pink-600 to-yellow-600">
            chrisbailey.eth
          </span>
        </p>
      </CardContent>
    </CardBase>
  );

};
