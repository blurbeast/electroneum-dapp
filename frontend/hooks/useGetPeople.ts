'use client';

import { useReadContract } from 'wagmi';
import peopleAbi from '@/constants/ABIs/people.json';
import { PEOPLE_ADDRESS } from '@/constants/addresses';

export function useGetPeople() {
  const query = useReadContract({
    abi: peopleAbi as const,
    address: PEOPLE_ADDRESS as `0x${string}`,
    functionName: 'getPeople',
  });

  return {
    ...query,
    people: (query.data ?? []) as { name: string; age: bigint }[],
  };
}
