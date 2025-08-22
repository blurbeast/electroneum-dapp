'use client';

import { useState, useMemo } from 'react';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import peopleAbi from '@/constants/ABIs/people.json';
import { PEOPLE_ADDRESS } from '@/constants/addresses';

export function useCreatePerson() {
  const [hash, setHash] = useState<`0x${string}` | undefined>(undefined);

  const { writeContractAsync, isPending: isWriting, error: writeError } = useWriteContract();

  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    error: receiptError,
  } = useWaitForTransactionReceipt({
    hash,
  });

  const isSubmitting = useMemo(() => isWriting || isConfirming, [isWriting, isConfirming]);
  const error = writeError ?? receiptError;

  async function createPerson(name: string, age: number | string) {
    if (!name || `${name}`.trim().length === 0) throw new Error('Name is required');
    const ageBn = BigInt(age);

    const txHash = await writeContractAsync({
      abi: peopleAbi as const,
      address: PEOPLE_ADDRESS as `0x${string}`,
      functionName: 'createPerson',
      args: [name.trim(), ageBn],
    });
    setHash(txHash);
    return txHash;
  }

  return {
    createPerson,
    hash,
    isSubmitting,
    isConfirmed,
    error,
  };
}
