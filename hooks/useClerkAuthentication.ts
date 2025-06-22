import { showToast } from '@/components/ShowMessage';
import api from '@/config/apiConfig';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'expo-router';
import { useState } from 'react';

/**
 * Custom hook to handle authentication with OAuth providers
 */
export const useClerkAuthentication = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState('');
  const { setUserData, setClaimId } = useAuthStore();

  const handleOAuthSignIn = async (provider: 'google' | 'apple') => {
    setLoading(true);
    setError(null);
    try {
    } catch (err: any) {
      console.error(`Error during ${provider} sign-in:`, err);
      setError(`${provider} sign-in failed`);
      showToast('Failed to sign in with ' + provider, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSignUp = async (emailAddress: string) => {
    try {
      if (userId) {
        setUserId(userId);
        showToast('Verification email sent successfully', 'success');
      }
    } catch (err: any) {
      console.error('Error during email sign-up:', err.message);
      console.error(JSON.stringify(err, null, 2));
      setError('Error during email sign-up.');
      showToast('Failed to send verification email', 'error');
    }
  };

  const handleEmailSignIn = async (emailAddress: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      // Then authenticate with your backend
      const response = await api.post(`/api/user/signin`, {
        email: emailAddress,
        password: password,
      });
      showToast('Successfully signed in', 'success');
    //   router.push('/(musicTabs)/(home)');
      return response.data;
    } catch (err: any) {
      setLoading(false);
      console.error('Error during sign-in:', err);

      // Show more specific error messages
      if (err.type === 'user_invalid_credentials') {
        showToast('Invalid email or password', 'error');
      } else {
        showToast('Failed to sign in. Please try again.', 'error');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    setError(null);
    try {
      router.dismissTo('/');
    } catch (error) {
      console.error('Error during logout:', error);
      showToast('Failed to logout. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async (userId: string) => {
    setLoading(true);
    setError(null);
    try {
      showToast('Account successfully deleted', 'success');
      router.replace('/');
    } catch (err: any) {
      console.error('Error deleting account:', err);
      setError('Failed to delete account');
      showToast('Failed to delete account', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleClerkAuthentication = async () => {

  };

  return {
    error,
    handleEmailSignUp,
    handleEmailSignIn,
    handleOAuthSignIn,
    handleLogout,
    handleDeleteAccount,
    userId,
    loading,
    handleClerkAuthentication,
  };
};
