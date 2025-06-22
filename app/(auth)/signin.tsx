import { AppButton } from '../../components/app-components/button';
import AuthHeader from '../../components/AuthHeader';
import { Input } from '../../components/ui/input';
import { useLogin } from '../../hooks/useLogin';
import { zodResolver } from '@hookform/resolvers/zod';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { ViewIcon, ViewOffIcon } from '@hugeicons/core-free-icons';
import { router } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import { useEffect, useState } from 'react';
import { Controller, useForm, UseFormReturn } from 'react-hook-form';
import {
  ActivityIndicator,
  Image,
  ImageSourcePropType,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { z } from 'zod';

import { useNotification } from '../../context/NotificationContext';
import { useAppleAuth, useGoogleAuth } from '../../hooks/useSocialAuth';

// Complete WebBrowser auth session
WebBrowser.maybeCompleteAuthSession();

// Validation schema
const schema = z.object({
  email: z
    .string({ message: 'Please enter a valid email address' })
    .email({ message: 'Please enter a valid email address' })
    .nonempty({ message: 'Email is required' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' })
    .nonempty({ message: 'Password is required' }),
});

// Define form data type from schema
type FormData = z.infer<typeof schema>;

// Props for SocialButton component
interface SocialButtonProps {
  onPress: () => void;
  imageSource: ImageSourcePropType;
  text: string;
  loading?: boolean; // Add loading prop
}

const SocialButton: React.FC<SocialButtonProps> = ({ onPress, imageSource, text, loading }) => (
  <TouchableOpacity
    onPress={onPress}
    disabled={loading}
    className={`flex-row items-center justify-center gap-x-4 ${
      loading ? 'bg-gray-300' : 'bg-white'
    } w-full rounded-full px-4 py-2`}
    style={{ minHeight: 56 }}>
    {loading ? (
      <ActivityIndicator size="small" color="#040405" />
    ) : (
      <>
        <Image source={imageSource} style={{ width: 40, height: 40 }} />
        <Text className="font-PlusJakartaSansMedium text-[14px] text-[#040405]">{text}</Text>
      </>
    )}
  </TouchableOpacity>
);

const Signin: React.FC = () => {
  const { showNotification } = useNotification();
  const { mutate: login, isPending, isError, error } = useLogin();
  const { handleGoogleSignIn, loading: googleLoading } = useGoogleAuth();
  const { handleAppleSignIn, loading: appleLoading } = useAppleAuth();
  const [passwordView, setPasswordView] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  }: UseFormReturn<FormData> = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '', // Add default value for password
    },
  });

  useEffect(() => {
    if (error) {
      showNotification({
        type: 'error',
        title: 'Login Failed',
        message: error?.response?.data.message || 'Invalid email or password',
        position: 'top',
      });
    }
  }, [error]);

  // Modify the onSubmit handler to prevent default behavior
  const onSubmit = (data: FormData): void => {
    login(data, {
      onSuccess: () => {
        router.navigate('/(musicTabs)');
      },
      onError: (error: any) => {
        showNotification({
          type: 'error',
          title: 'Signup Failed',
          message: error?.response?.data.message || 'Failed to send verification code',
          position: 'top',
        });
      },
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1"
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
      <ScrollView
        className="flex-1"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 px-6 pb-8" style={{ gap: 48 }}>
          <View style={{ gap: 20 }}>
            <AuthHeader
              title="Welcome to Looop"
              description="Sign in to your account to continue"
            />

            <View style={{ gap: 12, marginTop: 24 }}>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    label="Email Address"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder="Email Address"
                    placeholderTextColor="#787A80"
                    keyboardType="email-address"
                    inputMode="email"
                    keyboardAppearance="dark"
                    autoCapitalize="none"
                    autoCorrect={false}
                    autoComplete="email"
                    returnKeyType="next"
                    error={errors?.email?.message}
                  />
                )}
              />

              <View className="relative">
                <Controller
                  control={control}
                  name="password"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      label="Password"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      placeholder="Enter your password"
                      placeholderTextColor="#787A80"
                      secureTextEntry={!passwordView}
                      keyboardAppearance="dark"
                      error={errors?.password?.message}
                    />
                  )}
                />
                <TouchableOpacity
                  onPress={() => setPasswordView(!passwordView)}
                  className="absolute right-4 top-[51px]">
                  {passwordView ? (
                    <HugeiconsIcon icon={ViewOffIcon} size={24} color="#787A80" />
                  ) : (
                    <HugeiconsIcon icon={ViewIcon} size={24} color="#787A80" />
                  )}
                </TouchableOpacity>
              </View>
            </View>

            <AppButton.Secondary
              color="#FF7A1B"
              text="Sign In"
              onPress={handleSubmit((data) => {
                onSubmit(data);
              })}
              loading={isPending}
            />

            <Text className="font-PlusJakartaSansRegular mt-[10px] text-center text-sm text-gray-400">
              Or continue with
            </Text>
          </View>

          <View className="flex-col gap-y-4">
            <SocialButton
              onPress={handleGoogleSignIn}
              imageSource={require('../../assets/images/google.png')}
              text="Sign in with Google"
              loading={googleLoading}
            />
            <SocialButton
              onPress={handleAppleSignIn}
              imageSource={require('../../assets/images/apple.png')}
              text="Sign in with Apple"
              loading={appleLoading}
            />
          </View>

          <Pressable
            onPress={() => router.navigate('/(auth)')}
            className="mx-auto mt-[10%] items-center">
            <Text className="font-PlusJakartaSansRegular text-[14px] text-[#f4f4f4]">
              Don't have an account?
              <Text className="text-Orange/08 font-PlusJakartaSansBold underline"> Sign Up</Text>
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Signin;
