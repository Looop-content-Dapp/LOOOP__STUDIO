import { AppBackButton } from '@/components/app-components/back-btn';
import { useWalletBalance } from '@/hooks/useWalletBalance';
import * as Clipboard from 'expo-clipboard';
import { router, useNavigation } from 'expo-router';
import { useEffect, useLayoutEffect, useState } from 'react';
import { Alert, ScrollView, View } from 'react-native';

import ConnectedAccounts from '@/components/wallet/ConnectedAccounts';
import Earnings from '@/components/wallet/Earnings';
import WalletBalance from '@/components/wallet/WalletBalance';
import WithdrawFunds from '@/components/wallet/WithdrawFunds';

const WalletScreen = () => {
  const [timeFrame, setTimeFrame] = useState('Last 30 days');
  const [selectedNetwork, setSelectedNetwork] = useState<string>('Xion');
  const networkOptions: string[] = ['Xion', 'Starknet'];
  const navigation = useNavigation();
  const { data: walletBalanceData, isLoading: walletLoading } = useWalletBalance();

  // Initialize wallet data state
  const [walletData, setWalletData] = useState({
    balances: {
      xion: 0,
      starknet: 0,
      total: 0,
    },
    addresses: [
      { chain: 'XION', address: '' },
      { chain: 'Starknet', address: '' },
    ],
  });

  // Update wallet balances when data is available
  useEffect(() => {
    if (walletBalanceData) {
      const xionBalance = walletBalanceData?.data?.xion?.balances?.[0]?.usdValue ?? 0;
      const starknetBalance = walletBalanceData?.data?.starknet?.balance?.usdValue ?? 0;

      setWalletData((prev) => ({
        ...prev,
        balances: {
          xion: xionBalance,
          starknet: starknetBalance,
          total: xionBalance + starknetBalance,
        },
      }));
    }
  }, [walletBalanceData]);

  const networkIcons = {
    Xion: require('@/assets/images/XIONB.png'),
    Starknet: require('@/assets/images/StarknetB.png'),
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <AppBackButton name="Wallet" onBackPress={() => router.back()} />,
    });
  }, [navigation, selectedNetwork]);

  const handleCopyAddress = async (address: string) => {
    try {
      await Clipboard.setStringAsync(address);
      Alert.alert('Success', 'Wallet address copied to clipboard');
    } catch (error) {
      Alert.alert('Error', 'Failed to copy wallet address');
    }
  };

  const handleWithdrawFunds = () => {
    router.push('/wallet/withdrawFundsScreen');
  };

  const handleConnectedAccounts = () => {
    router.push('/wallet/connectedAccountsScreen');
  };

  return (
    <View className="flex-1 bg-[#040405]">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <WalletBalance
          balances={walletData.balances}
          addresses={walletData.addresses}
          isLoading={walletLoading}
          usdcPrice={walletBalanceData?.data?.usdcPrice}
          onCopyAddress={handleCopyAddress}
        />

        {/* Withdraw Funds Component */}
        <WithdrawFunds onPress={handleWithdrawFunds} />

        {/* Connected Accounts Component */}
        <ConnectedAccounts onPress={handleConnectedAccounts} />

        {/* Earnings Component */}
        <Earnings timeFrame={timeFrame} onTimeFrameChange={setTimeFrame} />
      </ScrollView>
    </View>
  );
};

export default WalletScreen;
