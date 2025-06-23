import { AppBackButton } from '@/components/app-components/back-btn';
import { Clock02Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { router, useNavigation } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useLayoutEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Account {
  id: string;
  bankName: string;
  accountNumber: string;
  accountName: string;
  logo: any;
}

interface WithdrawFundsScreenProps {
  availableBalance: number;
}

type StepType = 'amount' | 'selectAccount' | 'verifyEmail' | 'processing' | 'success';

const WithdrawFundsScreen = ({ availableBalance = 32540.4 }: WithdrawFundsScreenProps) => {
  const [amount, setAmount] = useState('0');
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<StepType>('amount');
  const [otpCode, setOtpCode] = useState('');
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <AppBackButton name="withdraw" onBackPress={() => router.back()} />,
    });
  }, [navigation]);

  // Mock user emailB
  const userEmail = 'a****@gmail.com';

  // Mock accounts data
  const accounts: Account[] = [
    {
      id: '1',
      bankName: 'First Bank',
      accountNumber: '3273840488',
      accountName: 'Antony Joshua',
      logo: require('@/assets/images/firstbank-logo.png'),
    },
    {
      id: '2',
      bankName: 'Access Bank',
      accountNumber: '3273840488',
      accountName: 'Antony Joshua',
      logo: require('@/assets/images/access-logo.png'),
    },
  ];

  const handleNumberPress = (num: string) => {
    if (currentStep === 'verifyEmail') {
      if (otpCode.length < 6) {
        setOtpCode((prev) => prev + num);
      }
    } else {
      if (amount === '0' && num !== '0') {
        setAmount(num);
      } else {
        setAmount((prev) => prev + num);
      }
    }
  };

  const handleBackspace = () => {
    if (currentStep === 'verifyEmail') {
      setOtpCode((prev) => prev.slice(0, -1));
    } else {
      setAmount((prev) => prev.slice(0, -1) || '0');
    }
  };

  const handleContinue = () => {
    switch (currentStep) {
      case 'amount':
        setCurrentStep('selectAccount');
        break;
      case 'selectAccount':
        if (selectedAccount) {
          setCurrentStep('verifyEmail');
        }
        break;
      case 'verifyEmail':
        if (otpCode.length === 6) {
          setCurrentStep('processing');
          setTimeout(() => {
            setCurrentStep('success');
          }, 2000);
        }
        break;
      case 'success':
        router.back();
        break;
    }
  };

  const renderNumpad = () => {
    const numbers = [
      ['1', '2', '3'],
      ['4', '5', '6'],
      ['7', '8', '9'],
      ['', '0', 'backspace'],
    ];

    return (
      <View className="mt-auto">
        {numbers.map((row, rowIndex) => (
          <View key={rowIndex} className="flex-row justify-around">
            {row.map((num, colIndex) => (
              <TouchableOpacity
                key={colIndex}
                className="h-[60px] w-[120px] items-center justify-center"
                onPress={() => (num === 'backspace' ? handleBackspace() : handleNumberPress(num))}>
                {num === 'backspace' ? (
                  <Text className="text-2xl text-white">⌫</Text>
                ) : num ? (
                  <View>
                    <Text className="text-center font-PlusJakartaSansBold text-2xl text-white">
                      {num}
                    </Text>
                  </View>
                ) : null}
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    );
  };

  const renderAmountInput = () => (
    <View className="flex-1">
      <View className="mt-12 items-center">
        <Text className="font-PlusJakartaSansExtraBold text-[56px] font-medium">
          <Text className="font-TankerRegular text-[32px] text-white">$</Text>
          <Text
            className={
              amount === '0'
                ? 'font-TankerRegular text-[50px] text-[#787A80]'
                : 'font-TankerRegular text-[50px] text-white'
            }>
            {Number(amount).toLocaleString()}
          </Text>
        </Text>
        <Text className="mt-2 font-PlusJakartaSansMedium text-lg text-[#787A80]">
          {Number(amount)} USDC
        </Text>
      </View>

      <View className="mx-4 mt-[129px]">
        <View className="flex-row items-center justify-between rounded-lg border border-[#12141B] bg-[#0A0B0F] p-[20px]">
          <View className="fitems-center">
            <Text className="font-PlusJakartaSansMedium text-[14px] text-[#787A80]">
              Available balance
            </Text>
            <Text className="font-PlusJakartaSansBold text-[20px] text-[#f4f4f4]">
              ${availableBalance.toLocaleString()}
            </Text>
          </View>
          <TouchableOpacity
            className="ml-2 rounded-[24px] border border-[#12141B] bg-[#12141B] p-[12px]"
            onPress={() => setAmount(availableBalance.toString())}>
            <Text className="text-white">Withdraw max</Text>
          </TouchableOpacity>
        </View>
      </View>

      {renderNumpad()}
    </View>
  );

  const renderOTPVerification = () => (
    <View className="flex-1">
      <View className="mt-12 items-center">
        <Text className="mb-2 text-xl font-bold text-white">Enter verification code</Text>
        <Text className="mb-8 text-center text-[#787A80]">
          We've sent a verification code to {userEmail}
        </Text>

        {/* OTP Display */}
        <View className="mb-[30px] flex-row justify-center gap-x-2">
          {[...Array(6)].map((_, index) => (
            <View
              key={index}
              className={`h-[49px] w-[49px] items-center justify-center rounded-lg ${
                index < otpCode.length ? 'border-2 border-[#1D2029]' : 'bg-[#0A0B0F]'
              }`}>
              <Text className="text-xl text-white">
                {index < otpCode.length ? otpCode[index] : ''}
              </Text>
            </View>
          ))}
        </View>

        <TouchableOpacity className="mt-4">
          <Text className="text-[#FF8A49]">Resend code</Text>
        </TouchableOpacity>
      </View>

      {renderNumpad()}
    </View>
  );

  const renderAccountSelection = () => (
    <View className="flex-1 px-4">
      <Text className="mb-4 mt-6 text-xl text-white">Select withdrawal account</Text>

      {accounts.map((account) => (
        <TouchableOpacity
          key={account.id}
          className={`mb-3 flex-row items-center rounded-lg border border-[#12141B] bg-[#0A0B0F] px-[16px] py-[19px]`}
          onPress={() => setSelectedAccount(account.id)}>
          <View className="mr-3 h-6 w-6 items-center justify-center rounded-full border border-[#FF8A49]">
            {selectedAccount === account.id && (
              <View className="h-4 w-4 rounded-full bg-[#FF8A49]" />
            )}
          </View>
          <Image source={account.logo} className="mr-3 h-8 w-8 rounded-full" />
          <View>
            <Text className="text-white">{account.accountNumber}</Text>
            <Text className="text-[#787A80]">{account.accountName}</Text>
          </View>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        className="mt-4 flex-row items-center justify-center rounded-lg bg-[#1D2029] p-4"
        onPress={() => router.push('/wallet/connectedAccountsScreen')}>
        <Text className="text-[#787A80]">+ Add bank account</Text>
      </TouchableOpacity>
    </View>
  );

  const renderProcessing = () => (
    <View className="flex-1 items-center justify-center px-4">
      <View className="mb-6 rounded-full bg-[#1D2029] p-6">
        <HugeiconsIcon icon={Clock02Icon} size={40} color="#787A80" />
      </View>
      <Text className="mb-2 text-center text-2xl text-white">Processing your payment request.</Text>
    </View>
  );

  const renderSuccess = () => (
    <View className="flex-1 items-center justify-center px-4">
      <View className="mb-6 rounded-full bg-[#1D2029] p-6"></View>
      <Text className="mb-2 text-center text-2xl text-white">
        Your payment request has been submitted successfully!
      </Text>
      <Text className="mb-8 text-center text-[#787A80]">
        Good news! Your funds will be available in your withdrawal account soon!
      </Text>
    </View>
  );

  const renderContent = () => {
    switch (currentStep) {
      case 'amount':
        return renderAmountInput();
      case 'selectAccount':
        return renderAccountSelection();
      case 'verifyEmail':
        return renderOTPVerification();
      case 'processing':
        return renderProcessing();
      case 'success':
        return renderSuccess();
      default:
        return null;
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <StatusBar style="light" />
      <View className="flex-1">
        {/* Header */}

        {/* Content */}
        {renderContent()}

        {/* Bottom Button */}
        {(currentStep === 'amount' ||
          currentStep === 'selectAccount' ||
          currentStep === 'verifyEmail' ||
          currentStep === 'success') && (
          <View className="px-4 pb-8">
            <TouchableOpacity
              className={`rounded-[56px] py-[16px] ${
                (currentStep === 'amount' && Number(amount) > 0) ||
                (currentStep === 'selectAccount' && selectedAccount) ||
                (currentStep === 'verifyEmail' && otpCode.length === 6) ||
                currentStep === 'success'
                  ? 'bg-[#FF6D1B]'
                  : 'bg-[#FF6D1B] opacity-50'
              }`}
              onPress={handleContinue}
              disabled={
                (currentStep === 'amount' && Number(amount) === 0) ||
                (currentStep === 'selectAccount' && !selectedAccount) ||
                (currentStep === 'verifyEmail' && otpCode.length !== 6)
              }>
              <Text className="text-center font-bold text-white">
                {currentStep === 'success' ? 'Done' : 'Continue'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default WithdrawFundsScreen;
