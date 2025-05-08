'use client';

import { useState } from 'react';

const justifyOptions = [
  'flex-start',
  'center',
  'flex-end',
  'space-between',
  'space-around',
  'space-evenly',
];

const alignOptions = [
  'flex-start',
  'center',
  'flex-end',
  'stretch',
  'baseline',
];

const directionOptions = ['row', 'row-reverse', 'column', 'column-reverse'];

export default function FlexboxDemo() {
  const [justifyContent, setJustifyContent] = useState('center');
  const [alignItems, setAlignItems] = useState('center');
  const [flexDirection, setFlexDirection] = useState('row');

  return (
    <div className="p-4 border rounded-x shadow-lg">
      <div className="mb-4 grid grid-cols-3 gap-4">
        <div>
          <label className="block mb-1 font-medium">Justify Content</label>
          <select
            className="w-full border p-2 rounded"
            value={justifyContent}
            onChange={(e) => setJustifyContent(e.target.value)}
          >
            {justifyOptions.map((opt) => (
              <option key={opt}>{opt}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1 font-medium">Align Items</label>
          <select
            className="w-full border p-2 rounded"
            value={alignItems}
            onChange={(e) => setAlignItems(e.target.value)}
          >
            {alignOptions.map((opt) => (
              <option key={opt}>{opt}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1 font-medium">Flex Direction</label>
          <select
            className="w-full border p-2 rounded"
            value={flexDirection}
            onChange={(e) => setFlexDirection(e.target.value)}
          >
            {directionOptions.map((opt) => (
              <option key={opt}>{opt}</option>
            ))}
          </select>
        </div>
      </div>

      <div
        className="h-48 border bg-white dark:bg-neutral-800 rounded-xl transition-all duration-300"
        style={{
          display: 'flex',
          justifyContent,
          alignItems,
          flexDirection,
          gap: '1rem',
          padding: '1rem',
        }}
      >
        <div className="bg-blue-500 w-12 h-12 rounded shadow-md flex items-center justify-center">
          {' '}
          1
        </div>
        <div className="bg-pink-500 w-12 h-12 rounded shadow-md flex items-center justify-center">
          2
        </div>
        <div className="bg-green-500 w-12 h-12 rounded shadow-md flex items-center justify-center">
          3
        </div>
      </div>
    </div>
  );
}
