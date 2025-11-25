import React from 'react';

export default function ErrorDisplay({ message }) {
  return (
    <div className="flex justify-center items-center py-10">
      <div className="text-red-600 text-lg font-semibold">
        Error: {message || 'Something went wrong.'}
      </div>
    </div>
  );
}
