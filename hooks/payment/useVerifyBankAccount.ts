import { FlutterwaveService } from '@/services/flutterwave';
import { VerifyAccountRequest } from '@/types/bank';
import { useState } from 'react';

export const useVerifyBankAccount = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [accountName, setAccountName] = useState<string | null>(null);

  const verifyAccount = async (details: VerifyAccountRequest) => {
    try {
      setIsLoading(true);
      setError(null);
      setAccountName(null);
      const result = await FlutterwaveService.verifyBankAccount(details);
      setAccountName(result.account_name);
      return result.account_name;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to verify account');
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setAccountName(null);
    setError(null);
    setIsLoading(false);
  };

  return {
    verifyAccount,
    isLoading,
    error,
    accountName,
    reset,
  };
};
