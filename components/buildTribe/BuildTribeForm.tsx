import { useCreateCommunity } from '@/hooks/useCreateCommunity';
import { useAuthStore } from '@/store/authStore';
import { MaterialIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useRef, useState } from 'react';
import {
  Alert,
  Keyboard,
  Platform,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import Preview from './formFlow/Preview';
import TribeForm, { FormData } from './formFlow/TribeForm';
import StepIndicator from './StepIndicator';
import TribeSuccessScreen from './TribeSuccessScreen';

const STEPS = {
  BASIC: 'basic',
  MEMBERSHIP: 'membership',
  PREVIEW: 'preview',
  SUCCESS: 'success',
};

const STEP_COLORS = {
  [STEPS.BASIC]: '#A187B5',
  [STEPS.MEMBERSHIP]: '#87A1B5',
  [STEPS.PREVIEW]: '#87B5A1',
};

interface BuildTribeFormProps {
  onBack: () => void;
}

const BuildTribeForm: React.FC<BuildTribeFormProps> = ({ onBack }) => {
  const [currentStep, setCurrentStep] = useState(STEPS.BASIC);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    tribeName: '',
    description: '',
    coverImage: '',
    collectibleName: '',
    CollectibleDescription: '',
    collectibleMedia: '',
    collectibleType: '',
    communitySymbol: '',
  });
  const scrollViewRef = useRef(null);
  const { userdata } = useAuthStore();
  const createCommunityMutation = useCreateCommunity();

  const handleCreateCommunity = async () => {
    if (!userdata?.artist) {
      Alert.alert('Error', 'Artist ID is required');
      return;
    }

    const payload = {
      communityName: formData?.tribeName,
      description: formData?.description,
      coverImage: formData?.coverImage,
      collectibleName: formData?.collectibleName,
      collectibleDescription: formData?.CollectibleDescription,
      collectibleImage: formData?.collectibleMedia,
      collectibleType: formData?.collectibleType,
      artistId: userdata?.artist,
      communitySymbol: formData?.communitySymbol,
    };

    createCommunityMutation.mutate(payload, {
      onSuccess: (data) => {
        Alert.alert('Success', 'Community Created successfully!', [
          {
            text: 'OK',
            onPress: () => setCurrentStep(STEPS.SUCCESS),
          },
        ]);
      },
      onError: (error: any) => {
        Alert.alert('Error', error?.message || 'Failed to Create a Community. Please try again.');
      },
    });
  };

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case STEPS.BASIC:
      case STEPS.MEMBERSHIP:
        return (
          <TribeForm
            formData={formData}
            updateFormData={updateFormData}
            currentStep={currentStep}
            STEPS={STEPS}
          />
        );
      case STEPS.PREVIEW:
        return <Preview formData={formData} />;
      case STEPS.SUCCESS:
        return <TribeSuccessScreen tribeName={formData} />;
      default:
        return (
          <TribeForm
            formData={formData}
            updateFormData={updateFormData}
            currentStep={currentStep}
            STEPS={STEPS}
          />
        );
    }
  };

  const handleNext = () => {
    switch (currentStep) {
      case STEPS.BASIC:
        // Validate basic info
        if (!formData.tribeName || !formData.description || !formData.coverImage) {
          Alert.alert('Required Fields', 'Please fill in all required fields');
          return;
        }
        setCurrentStep(STEPS.MEMBERSHIP);
        break;

      case STEPS.MEMBERSHIP:
        // Validate membership info
        if (
          !formData.collectibleName ||
          !formData.CollectibleDescription ||
          !formData.collectibleMedia ||
          !formData.communitySymbol
        ) {
          Alert.alert('Required Fields', 'Please fill in all required fields');
          return;
        }
        setCurrentStep(STEPS.PREVIEW);
        break;

      case STEPS.PREVIEW:
        handleCreateCommunity();
        break;
    }
  };

  const handleBack = () => {
    switch (currentStep) {
      case STEPS.MEMBERSHIP:
        setCurrentStep(STEPS.BASIC);
        break;
      case STEPS.PREVIEW:
        setCurrentStep(STEPS.MEMBERSHIP);
        break;
      default:
        onBack();
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="light" />

      {/* Header */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 16,
          marginTop: 12,
        }}>
        <TouchableOpacity onPress={handleBack} style={{ padding: 8 }}>
          <MaterialIcons name="arrow-back" size={24} color="#f4f4f4" />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 20,
            color: '#f4f4f4',
            fontFamily: 'PlusJakartaSansBold',
            marginLeft: 12,
          }}>
          Build my Tribe
        </Text>
      </View>

      <StepIndicator currentStep={currentStep} STEPS={STEPS} />

      {/* Scrollable Content */}
      <KeyboardAwareScrollView
        ref={scrollViewRef}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}>
        <View style={{ flex: 1, paddingHorizontal: 16 }}>{renderCurrentStep()}</View>

        <View
          style={{
            padding: 16,
            paddingBottom: Platform.OS === 'ios' ? 34 : 16,
            borderTopWidth: 1,
            borderTopColor: '#1C1F2A',
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: STEP_COLORS[currentStep],
              alignItems: 'center',
              width: '100%',
              paddingVertical: 16,
              borderRadius: 56,
            }}
            onPress={() => {
              Keyboard.dismiss();
              handleNext();
            }}>
            <Text
              style={{
                color: '#12141B',
                fontSize: 16,
                fontFamily: 'PlusJakartaSansMedium',
              }}>
              {currentStep === STEPS.PREVIEW ? 'Create Tribe' : 'Continue'}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default BuildTribeForm;
