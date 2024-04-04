import React from 'react';
import { RotatingLines } from 'react-loader-spinner';

export default function RotatingLoader({}) {
  return (
    <div className="flex justify-center items-center">
      <RotatingLines
        color="#000"
        strokeWidth={4}
        strokeColor="#94a3b8"
        width={40}
      />
    </div>
  );
}
