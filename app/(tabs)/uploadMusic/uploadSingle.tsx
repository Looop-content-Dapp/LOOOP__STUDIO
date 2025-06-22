import React, { useLayoutEffect, useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { useNavigation, useRouter } from 'expo-router';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { AppBackButton } from '@/components/app-components/back-btn';
import { AppButton } from '@/components/app-components/button';
import TrackUploadForm from '@/components/uploadMusicFlow/TrackUploadForm';
import FileUpload from '@/components/uploadMusicFlow/FileUpload';
import PreviewUpload from '@/components/uploadMusicFlow/PreviewUpload';
import { useCreateRelease } from '@/hooks/useCreateRelease';

interface TrackInfo {
  trackName: string;
  songType: string;
  primaryGenre: string;
  secondaryGenre?: string;
  releaseDate: Date | null;
}

interface FileMetadata {
  audioFile: File | null;
  coverImage: string;
  writers: string[];
  producers: string[];
  isrc: string;
  explicitLyrics: string;
  creatorUrl: string;
}

const UploadSingle = () => {
  const [flow, setFlow] = useState('Track info');
  const [formData, setFormData] = useState({
    trackInfo: null,
    fileMetadata: null
  });
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const navigation = useNavigation();
  const { back } = useRouter();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerStyle: {
        backgroundColor: '#000'
      },
      headerLeft: () => (
        <AppBackButton
          name="Upload music"
          onBackPress={() => back()}
        />
      ),
      headerTitle: ''
    });
  }, [navigation]);

  const handleTrackInfoSubmit = (data: TrackInfo) => {
    setFormData(prev => ({ ...prev, trackInfo: data }));
    setFlow('File Metadata');
  };

  const handleFileMetadataSubmit = (data: FileMetadata) => {
    setFormData(prev => ({ ...prev, fileMetadata: data }));
    setFlow('Preview');
  };

  const router = useRouter();

  const showSuccessAlert = () => {
    Alert.alert(
      "Upload Successful! 🎉",
      "Your track has been uploaded successfully and will be available soon.",
      [
        {
          text: "View My Music",
          onPress: () => router.push("/(tabs)/music" as any),
          style: "default"
        },
        {
          text: "Upload Another",
          onPress: () => {
            setFlow('Track info');
            setFormData({ trackInfo: null, fileMetadata: null });
            setUploadProgress(0);
          }
        }
      ]
    );
  };

  const showErrorAlert = (error: any) => {
    Alert.alert(
      "Upload Failed",
      error?.message || "Something went wrong while uploading your track. Please try again.",
      [
        {
          text: "Try Again",
          onPress: () => setIsUploading(false)
        }
      ]
    );
  };

  const handleFinishUpload = async () => {
    try {
      setIsUploading(true);
      const { mutateAsync } = useCreateRelease();

      // Simulated upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 500);

      await mutateAsync({
        trackInfo: formData.trackInfo,
        fileMetadata: formData.fileMetadata
      });

      setUploadProgress(100);
      clearInterval(progressInterval);

      // Show success alert after a brief delay to show 100% progress
      setTimeout(() => {
        setIsUploading(false);
        showSuccessAlert();
      }, 500);

    } catch (error) {
      showErrorAlert(error);
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const renderStep = () => {
    switch (flow) {
      case 'Track info':
        return <TrackUploadForm onSubmit={handleTrackInfoSubmit} />;
      case 'File Metadata':
        return <FileUpload onSubmit={handleFileMetadataSubmit} />;
      case 'Preview':
        return <PreviewUpload {...formData} />;
      default:
        return null;
    }
  };

  const steps = [
    { id: 'Track info', label: 'Track Information' },
    { id: 'File Metadata', label: 'File & Credits' },
    { id: 'Preview', label: 'Preview & Upload' }
  ];

  const currentStepIndex = steps.findIndex(step => step.id === flow);

  const handleContinue = () => {
    if (flow === 'Track info') {
      // Trigger TrackUploadForm submission
      const trackFormElement = document.querySelector('form');
      if (trackFormElement) {
        trackFormElement.requestSubmit();
      }
    } else if (flow === 'File Metadata') {
      // Trigger FileUpload submission
      const fileFormElement = document.querySelector('form');
      if (fileFormElement) {
        fileFormElement.requestSubmit();
      }
    } else if (flow === 'Preview') {
      handleFinishUpload();
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{
        paddingBottom: 220,
        flexGrow: 1,
        justifyContent: 'space-between'
      }}
      className="flex-1 min-h-screen"
      enabled
      extraKeyboardSpace={20}
      keyboardShouldPersistTaps="handled"
    >
      <View className="mb-[16px] pl-[16px]">
        <Text className="text-[24px] font-PlusJakartaSansBold leading-[30px] text-[#F4F4F4]">
          Upload single
        </Text>
      </View>

      <View className="py-[32px] gap-y-[32px] px-[16px] rounded-[24px]">
        {renderStep()}
      </View>

      {isUploading ? (
        <View className="mt-4">
          <Text className="text-white text-center mb-2">
            Uploading... {uploadProgress}%
          </Text>
          <View className="h-2 bg-[#2C2F36] rounded-full">
            <View
              className="h-full bg-[#57E09A] rounded-full"
              style={{ width: `${uploadProgress}%` }}
            />
          </View>
        </View>
      ) : (
        <AppButton.Primary
          text={flow === 'Preview' ? 'Finish Upload' : 'Continue'}
          color="#57E09A"
          loading={false}
          onPress={handleContinue}
        />
      )}
    </KeyboardAwareScrollView>
  );
};

export default UploadSingle;
