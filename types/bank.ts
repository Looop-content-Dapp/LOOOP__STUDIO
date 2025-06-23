export interface FlutterwaveBank {
  id: number;
  code: string;
  name: string;
  country: string;
}

export interface UseBanksResult {
  banks: FlutterwaveBank[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export interface VerifyAccountRequest {
  accountNumber: string;
  bankCode: string;
}

export interface VerifyAccountResponse {
  account_number: string;
  account_name: string;
}
