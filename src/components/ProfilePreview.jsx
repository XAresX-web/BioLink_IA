import React from 'react';
import { ExternalLink } from 'lucide-react';

export default function ProfilePreview({ data }) {
  return (
    <div className="col-span-1 bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-2xl p-6 shadow-lg w-full max-w-sm mx-auto">
      {/* Avatar */}
      <div className="flex flex-col items-center mb-4">
        <img
          src={data.avatar || 'https://i.pravatar.cc/150'}
          alt="Avatar"
          className="w-20 h-20 rounded-full ring-2 ring-primary mb-2"
        />
        <h3 className="text-xl font-bold text-center text-gray-800 dark:text-white">
          {data.nombre || 'Tu nombre'}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
          {data.bio || 'Aquí irá tu biografía profesional'}
        </p>
      </div>

      {/* Enlaces */}
      <div className="mt-4 space-y-2">
        {data.enlaces?.map((enlace, i) => (
          <a
            key={i}
            href={enlace.url || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between w-full px-4 py-2 rounded-lg bg-white dark:bg-neutral-700 text-sm font-medium text-gray-800 dark:text-white hover:bg-primary hover:text-white transition"
          >
            <span className="truncate">{enlace.url || 'https://tuenlace.com'}</span>
            <ExternalLink size={16} />
          </a>
        ))}
      </div>
    </div>
  );
}
