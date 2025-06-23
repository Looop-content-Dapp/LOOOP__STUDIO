import { AppBackButton } from '@/components/app-components/back-btn';
import { FormField } from '@/components/app-components/formField';
import { useFlutterwaveBanks } from '@/hooks/payment/useFlutterwaveBanks';
import useUserInfo from '@/hooks/user/useUserInfo';
import {
  Add01Icon,
  Copy02Icon,
  Delete01Icon,
  InformationCircleIcon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { router, useNavigation } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useLayoutEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type ScreenType = 'main' | 'addAccount' | 'accountDetails';

interface Bank {
  label: string;
  value: string;
  logo: string;
  branches: string[];
}

interface BankAccount {
  id: string;
  bankName: string;
  accountNumber: string;
  accountName: string;
  bankLogo: string;
  bankCode?: string; // Add this for Flutterwave integration
}

const ConnectedAccountsScreen = () => {
  const [activeScreen, setActiveScreen] = useState<ScreenType>('main');
  const [selectedBank, setSelectedBank] = useState<Bank>();
  const [accounts, setAccounts] = useState<BankAccount[]>([
    {
      id: '1',
      bankName: 'First Bank of Nigeria PLC',
      accountNumber: '3273840488',
      accountName: 'Antony Joshua',
      bankLogo: '🏦',
    },
    {
      id: '2',
      bankName: 'Access Bank',
      accountNumber: '3273840488',
      accountName: 'Antony Joshua',
      bankLogo: '🏦',
    },
  ]);
  const [selectedAccount, setSelectedAccount] = useState<BankAccount | null>(null);
  const [newAccount, setNewAccount] = useState({
    accountNumber: '',
    bankName: '',
    accountName: '',
  });
  const { location } = useUserInfo();
  const {
    banks: flutterwaveBanks,
    isLoading: banksLoading,
    error: banksError,
  } = useFlutterwaveBanks(location?.country || 'NG');

  const handleBackNavigation = () => {
    if (activeScreen !== 'main') {
      setActiveScreen('main');
    } else {
      router.back();
    }
  };
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <AppBackButton name="Connect Account" onBackPress={() => router.back()} />,
      headerShown: false,
    });
  }, [navigation]);

  const handleAccountPress = (account: BankAccount) => {
    setSelectedAccount(account);
    setActiveScreen('accountDetails');
  };

  const handleAddAccount = () => {
    setActiveScreen('addAccount');
  };

  const handleRemoveAccount = (accountId: string) => {
    setAccounts(accounts.filter((acc) => acc.id !== accountId));
    setActiveScreen('main');
  };

  const handleAddNewAccount = () => {
    if (newAccount.accountNumber && newAccount.bankName && newAccount.accountName && selectedBank) {
      const newBankAccount: BankAccount = {
        id: Date.now().toString(),
        bankName: newAccount.bankName,
        accountNumber: newAccount.accountNumber,
        accountName: newAccount.accountName,
        bankLogo: '🏦',
        bankCode: selectedBank.value,
      };
      setAccounts([...accounts, newBankAccount]);
      setNewAccount({ accountNumber: '', bankName: '', accountName: '' });
      setSelectedBank(undefined);
      setActiveScreen('main');
    }
  };

  const renderMainContent = () => (
    <View className="px-4 pt-[72px]">
      <Text className="mb-6 text-xl font-bold text-white">Linked Accounts</Text>
      {accounts.map((account) => (
        <TouchableOpacity
          key={account.id}
          className="mb-4 rounded-lg bg-[#12141B] p-4"
          onPress={() => handleAccountPress(account)}>
          <View className="flex-row items-center">
            <Text className="mr-3 text-2xl">{account.bankLogo}</Text>
            <View>
              <Text className="text-base text-white">{account.accountNumber}</Text>
              <Text className="text-sm text-[#787A80]">{account.accountName}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        className="mx-auto mt-4 max-w-[164px] flex-row items-center justify-center gap-x-[8px] rounded-lg bg-[#12141B] p-4"
        onPress={handleAddAccount}>
        <HugeiconsIcon icon={Add01Icon} color="#A5A6AA" size={16} variant="solid" />
        <Text className="text-center text-[#A5A6AA]">Add bank account</Text>
      </TouchableOpacity>
    </View>
  );

  const renderAddAccount = () => (
    <View style={{ paddingHorizontal: 16 }}>
      <Text className="mb-4 text-xl font-bold text-white">Add Your Account</Text>

      <View className="my-[24px] flex-row items-start gap-x-[8px] rounded-[10px] bg-[#2A1708] p-[12px]">
        <HugeiconsIcon icon={InformationCircleIcon} size={16} color="#EC6519" variant="stroke" />
        <Text className="mb-6 font-PlusJakartaSansRegular text-[14px] text-[#EC6519]">
          Make sure to confirm that the bank account details are yours and are correct.
        </Text>
      </View>

      <FormField.TextField
        label="Account Number"
        placeholder="Enter account number"
        value={newAccount.accountNumber}
        onChangeText={(text: string) => setNewAccount({ ...newAccount, accountNumber: text })}
        keyboardType="numeric"
      />

      <FormField.PickerField
        label="Select Bank"
        placeholder={banksLoading ? 'Loading banks...' : 'Choose your bank'}
        value={selectedBank?.label || ''}
        onSelect={(value: any) => {
          const bank = flutterwaveBanks?.find((b) => b.name === value);
          if (bank) {
            setSelectedBank({
              label: bank.name,
              value: bank.code,
              logo: '🏦',
              branches: [],
            });
            setNewAccount((prev) => ({ ...prev, bankName: bank.name }));
          }
        }}
        options={
          flutterwaveBanks?.map((bank) => ({
            label: bank.name,
            value: bank.code,
          })) || []
        }
        // disabled={banksLoading || !!banksError}
      />

      {banksError && (
        <View className="mt-2 flex-row items-start gap-x-[8px] rounded-[10px] bg-[#2A1208] p-[12px]">
          <HugeiconsIcon icon={InformationCircleIcon} size={16} color="#FF3B30" variant="stroke" />
          <Text className="font-PlusJakartaSansRegular text-[14px] text-[#FF3B30]">
            Failed to load banks. Please check your connection and try again.
          </Text>
        </View>
      )}

      <FormField.TextField
        label="Account Name"
        placeholder="Enter account name"
        value={newAccount.accountName}
        onChangeText={(text: string) => setNewAccount({ ...newAccount, accountName: text })}
      />

      <TouchableOpacity
        className={`mt-6 rounded-lg bg-[#FF6D1B] py-[16px] ${
          !(newAccount.accountNumber && newAccount.bankName && newAccount.accountName)
            ? 'opacity-50'
            : ''
        }`}
        onPress={handleAddNewAccount}
        disabled={!(newAccount.accountNumber && newAccount.bankName && newAccount.accountName)}>
        <Text className="text-center font-bold text-white">Continue</Text>
      </TouchableOpacity>
    </View>
  );

  const renderAccountDetails = () => {
    if (!selectedAccount) return null;

    return (
      <View className="px-4">
        <Text className="mb-6 text-xl font-bold text-white">Bank Account</Text>

        <View className="mb-4 rounded-lg bg-[#12141B] p-4">
          <View className="mb-4 flex-row items-center">
            <Text className="mr-3 text-2xl">{selectedAccount.bankLogo}</Text>
            <View>
              <Text className="text-base text-white">{selectedAccount.accountName}</Text>
              <Text className="text-sm text-[#787A80]">{selectedAccount.bankName}</Text>
            </View>
          </View>

          <View className="flex-row items-center justify-between rounded-lg bg-[#1D2029] p-3">
            <Text className="text-white">{selectedAccount.accountNumber}</Text>
            <TouchableOpacity>
              <HugeiconsIcon icon={Copy02Icon} size={20} color="#787A80" />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          className="mt-4 flex-row items-center justify-center rounded-lg bg-[#2A1215] p-4"
          onPress={() => handleRemoveAccount(selectedAccount.id)}>
          <HugeiconsIcon icon={Delete01Icon} size={20} color="#FF3B30" className="mr-2" />
          <Text className="text-[#FF3B30]">Remove bank account</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderContent = () => {
    switch (activeScreen) {
      case 'addAccount':
        return renderAddAccount();
      case 'accountDetails':
        return renderAccountDetails();
      case 'main':
      default:
        return renderMainContent();
    }
  };

  const getHeaderTitle = () => {
    switch (activeScreen) {
      case 'addAccount':
        return 'Add Your Account';
      case 'accountDetails':
        return 'Bank Account';
      case 'main':
      default:
        return 'Connected Accounts';
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-black">
      <StatusBar style="light" />

      {/* Header */}
      <View className="px-4 py-4">
        <View className="flex-row items-center justify-between">
          <TouchableOpacity onPress={handleBackNavigation}>
            <Text className="text-base text-[#787A80]">
              {activeScreen !== 'main' ? 'Back' : 'Close'}
            </Text>
          </TouchableOpacity>
          <Text className="text-xl font-bold text-white">{getHeaderTitle()}</Text>
          <View className="w-16" />
        </View>
      </View>

      {/* Content */}
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {renderContent()}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ConnectedAccountsScreen;
