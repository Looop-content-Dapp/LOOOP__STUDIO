import { Stack } from 'expo-router';

export default function _WalletLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        contentStyle: {
          backgroundColor: '#040405',
        },
        headerStyle: {
          backgroundColor: '#040405',
        },
        title: '',
      }}>
      <Stack.Screen name="index" />

      <Stack.Screen name="cryptoWithdraw" />
      <Stack.Screen name="musicStreams" />
      <Stack.Screen name="tribeSubscriptions" />
      <Stack.Screen
        name="stablecoinFunding"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: '#040405',
          },
          headerTintColor: '#fff',
          title: '',
        }}
      />
      <Stack.Screen
        name="transaction-details"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: '#040405',
          },
          headerTintColor: '#fff',
          title: '',
        }}
      />
      <Stack.Screen name="WithdrawFundsScreen" />
    </Stack>
  );
}
