import { View, Text, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { InformationCircleIcon, Mail02Icon } from '@hugeicons/core-free-icons';

const CELL_COUNT = 6;

const EnterCode = () => {
  const [timer, setTimer] = useState(60);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const router = useRouter();
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const { email } = useLocalSearchParams<{ email: string }>();

  const handleResend = async () => {
    setError('');
    setIsPending(true);
    try {
      // Add your resend logic here
      setTimer(60);
    } catch (err) {
      setError('Failed to resend code');
    } finally {
      setIsPending(false);
    }
  };

  const handleVerify = async (code: string) => {
    setError('');
    setIsVerifying(true);
    try {
      // Add your verification logic here
      console.log({ email, otp: code });
      setIsSuccess(true);
    } catch (err) {
      setError('Invalid verification code');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleCodeChange = (code: string) => {
    setValue(code);
    if (code.length === CELL_COUNT) {
      setTimeout(() => {
        handleVerify(code);
      }, 100);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (timer > 0) {
        setTimer((prev) => prev - 1);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const getCellStyle = (index: number, symbol: string, isFocused: boolean) => {
    return [
      styles.cell,
      isFocused && styles.focusCell,
      error && styles.errorCell,
      isVerifying && styles.verifyingCell,
      symbol && styles.filledCell,
      isSuccess && styles.successCell,
    ];
  };

  return (
    <View className="flex-col items-center justify-center gap-y-4 pt-8">
      {error && (
        <View className="flex-row items-center gap-x-2">
          <HugeiconsIcon icon={InformationCircleIcon} size={20} color="#FF1B1B" />
          <Text className="font-PlusJakartaSansRegular text-xs text-[#FF1B1B]">{error}</Text>
        </View>
      )}
      <HugeiconsIcon icon={Mail02Icon} size={150} variant="solid" color="#040405" />
      <View className="flex-col gap-y-1">
        <Text className="font-PlusJakartaSansRegular text-center text-[16px] text-[#D2D3D5]">
          Please enter the code we sent to
        </Text>
        <Text className="font-PlusJakartaSansRegular text-center text-[16px] text-[#787A80]">
          {email}
        </Text>
      </View>
      <Text
        onPress={() => !isVerifying && router.navigate({ pathname: '/(auth)/verifyemail' })}
        className={`text-Orange/08 font-PlusJakartaSansBold mt-[24px] text-center text-[16px] underline ${
          isVerifying ? 'opacity-50' : ''
        }`}>
        Change email
      </Text>

      <CodeField
        ref={ref}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        cellCount={CELL_COUNT}
        renderCell={({ index, symbol, isFocused }) => (
          <View key={index} style={styles.cellContainer}>
            <Text
              style={getCellStyle(index, symbol, isFocused)}
              onLayout={getCellOnLayoutHandler(index)}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
            {isVerifying && index === CELL_COUNT - 1 && (
              <ActivityIndicator style={styles.verifyingIndicator} color="#FFA500" />
            )}
          </View>
        )}
        value={value}
        onChangeText={handleCodeChange}
        editable={!isVerifying}
        {...props}
      />

      <View className="flex-row items-center justify-center gap-x-2">
        <Text className="text-sm font-medium text-[#D2D3D5]">Didn't receive a code?</Text>
        {timer > 0 ? (
          <Text className="text-gray-500">Resend in {timer}s</Text>
        ) : isPending ? (
          <Text className="text-gray-500">Resending...</Text>
        ) : (
          <Pressable onPress={handleResend} disabled={isVerifying}>
            <Text
              className={`text-orange-600 active:text-orange-700 ${
                isVerifying ? 'opacity-50' : ''
              }`}>
              Resend
            </Text>
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default EnterCode;

const styles = StyleSheet.create({
  codeFieldRoot: {
    marginTop: 32,
    marginHorizontal: 14,
    gap: 6,
    justifyContent: 'center',
  },
  cellContainer: {
    position: 'relative',
  },
  cell: {
    width: 56,
    height: 72,
    lineHeight: 36,
    fontSize: 28,
    borderWidth: 2,
    borderColor: '#12141B',
    textAlign: 'center',
    borderRadius: 10,
    color: '#FFFFFF',
    fontWeight: '400',
    paddingTop: 13,
  },
  focusCell: {
    borderColor: '#12141B',
  },
  errorCell: {
    borderColor: '#FF1B1B',
  },
  verifyingCell: {
    borderColor: '#FFA500',
  },
  filledCell: {
    backgroundColor: '#1A1B1E',
  },
  verifyingIndicator: {
    position: 'absolute',
    top: -15,
    right: -15,
  },
  errorMessage: {
    color: '#FF1B1B',
    textAlign: 'center',
    marginTop: 10,
    fontSize: 14,
  },
  successCell: {
    borderColor: '#45F42E',
  },
});
