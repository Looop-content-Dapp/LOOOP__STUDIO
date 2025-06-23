import { FlutterwaveBank, VerifyAccountRequest, VerifyAccountResponse } from '@/types/bank';

const FLUTTERWAVE_API_URL = 'https://api.flutterwave.com/v3';

export class FlutterwaveService {
  private static headers = {
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_FLUTTERWAVE_SECRET_KEY}`,
    'Content-Type': 'application/json',
  };

  static async getBanks(country: string): Promise<FlutterwaveBank[]> {
    try {
      const response = await fetch(`${FLUTTERWAVE_API_URL}/banks/${country}`, {
        method: 'GET',
        headers: this.headers,
      });

      if (!response.ok) {
        throw new Error('Failed to fetch banks');
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      throw error instanceof Error ? error : new Error('An error occurred while fetching banks');
    }
  }

  static async verifyBankAccount(details: VerifyAccountRequest): Promise<VerifyAccountResponse> {
    try {
      const payload = {
        account_number: details.accountNumber,
        account_bank: details.bankCode,
      };

      // In development, Flutterwave test keys might restrict verification to a specific bank code.
      // This forces it to '044' (Access Bank) for testing purposes.
      if (__DEV__) {
        console.warn(
          `DEV MODE: Forcing bank code to '044' for testing. Original code was ${details.bankCode}.`
        );
        payload.account_bank = '044';
      }

      const response = await fetch(`${FLUTTERWAVE_API_URL}/accounts/resolve`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.status === 'error') {
        throw new Error(data.message || 'Failed to verify bank account');
      }

      return {
        account_number: data.data.account_number,
        account_name: data.data.account_name,
      };
    } catch (error) {
      throw error instanceof Error
        ? error
        : new Error('An error occurred while verifying bank account');
    }
  }
}
