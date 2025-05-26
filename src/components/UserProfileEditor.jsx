import React from 'react';

export default function UserProfileEditor({ data, setData }) {
  return (
    <div className="col-span-1 bg-white border border-gray-200 rounded-lg p-6 text-center shadow-sm">
      <img
        src={data.avatar || 'https://i.pravatar.cc/150'}
        alt="Avatar"
        className="w-20 h-20 rounded-full mx-auto mb-4"
      />
      <h3 className="text-lg font-bold">{data.nombre}</h3>
      <p className="text-sm text-gray-500">{data.bio}</p>

      <textarea
        className="w-full mt-4 p-2 rounded bg-gray-100 border border-gray-300 text-sm"
        value={data.bio}
        onChange={(e) => setData({ ...data, bio: e.target.value })}
      />

      <div className="mt-4 space-y-2">
        {data.enlaces.map((enlace, i) => (
          <input
            key={i}
            className="w-full p-2 rounded bg-gray-100 border border-gray-300 text-sm"
            value={enlace}
            onChange={(e) => {
              const updated = [...data.enlaces];
              updated[i] = e.target.value;
              setData({ ...data, enlaces: updated });
            }}
          />
        ))}
      </div>
    </div>
  );
}
