'use client';

import React, { useMemo, useState } from 'react';
import { useGetPeople } from '@/hooks/useGetPeople';
import { useCreatePerson } from '@/hooks/useCreatePerson';

export default function People() {
  const { people, refetch, isFetching, isLoading, error: readError } = useGetPeople();
  const { createPerson, isSubmitting, isConfirmed, error: writeError } = useCreatePerson();

  const [name, setName] = useState('');
  const [age, setAge] = useState<string>('');

  const error = useMemo(() => readError ?? writeError, [readError, writeError]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await createPerson(name.trim(), age);
      setName('');
      setAge('');
      setTimeout(() => refetch(), 1000);
    } catch {
      // handled by error state
    }
  }

  return (
    <div className="mx-auto max-w-xl p-4 space-y-6">
      <h1 className="text-2xl font-semibold">People</h1>

      <form onSubmit={onSubmit} className="flex gap-2 items-end">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            className="w-full border rounded px-3 py-2"
            placeholder="Alice"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={isSubmitting}
          />
        </div>
        <div className="w-32">
          <label className="block text-sm font-medium mb-1">Age</label>
          <input
            type="number"
            min={0}
            className="w-full border rounded px-3 py-2"
            placeholder="30"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
            disabled={isSubmitting}
          />
        </div>
        <button
          type="submit"
          className="border rounded px-4 py-2 hover:bg-gray-50 disabled:opacity-50"
          disabled={isSubmitting || !name || age === ''}
        >
          {isSubmitting ? 'Submitting...' : 'Add'}
        </button>
      </form>

      {error && (
        <div className="text-sm text-red-600">
          {(error as any)?.shortMessage ?? (error as any)?.message ?? 'Transaction failed'}
        </div>
      )}

      {isConfirmed && <div className="text-sm text-green-600">Person added!</div>}

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium">All People</h2>
          <button
            onClick={() => refetch()}
            className="text-sm border rounded px-3 py-1 hover:bg-gray-50 disabled:opacity-50"
            disabled={isFetching || isLoading}
          >
            {isFetching || isLoading ? 'Loading...' : 'Refresh'}
          </button>
        </div>

        <ul className="divide-y border rounded">
          {(people ?? []).length === 0 && (
            <li className="px-4 py-3 text-sm text-gray-500">No entries yet.</li>
          )}
          {(people ?? []).map((p, i) => (
            <li key={i} className="px-4 py-3 flex justify-between">
              <span className="font-medium">{p.name}</span>
              <span className="text-gray-600">{Number(p.age)}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
