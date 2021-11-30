import React from 'react';
import { CardBase, CardContent, CardHeader } from '../styles/Card';

export const SupportCard = () => {
  return (
    <CardBase type="info">
      <CardHeader color="pink" type="info">
        support
      </CardHeader>
      <CardContent>
        <p className="pb-2 mb-2 border-b">
          Any bug reports, or feature requests can be made on the{' '}
          <a
            href="https://github.com/xchrisbailey/floor_track/issues"
            className="text-blue-500 underline hover:text-blue-700"
          >
            github
          </a>{' '}
          page.
        </p>
        <p className="pb-2">
          Interested in supporting continued development or buying me a nacho
          belle grande? Can send eth to{' '}
          <span className="text-purple-400">chrisbailey.eth</span>
        </p>
      </CardContent>
    </CardBase>
  );

};
