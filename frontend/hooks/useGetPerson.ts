'use client';

import { useReadContract } from 'wagmi';
import peopleAbi from '@/constants/ABIs/people.json';
import { PEOPLE_ADDRESS } from '@/constants/smart_contract_addresses';

export function useGetPerson(index?: number) {
  const enabled = typeof index === 'number' && index >= 0;

  const query = useReadContract({
    abi: peopleAbi ,
    address: PEOPLE_ADDRESS as `0x${string}`,
    functionName: 'getPerson',
    args: enabled ? [BigInt(index!)] : undefined,
    query: {
      enabled,
    },
  });

  const person = query.data as undefined | { name: string; age: bigint };

  return {
    ...query,
    person,
    isEnabled: enabled,
  };
}
