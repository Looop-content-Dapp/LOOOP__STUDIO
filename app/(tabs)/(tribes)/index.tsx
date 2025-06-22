import { Container } from '@/components/Container';
import { Text, View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useState } from 'react';
import StatsTabs from '@/components/StatsTabs';
import KeyboardAvoidingViewUi from '@/components/ui/KeyboardAvoidingViewUi';
import { HugeiconsIcon } from '@hugeicons/react-native';
import {
  Settings01Icon,
  CameraMicrophone01Icon,
  VideoIconFreeIcons,
  PlusSignIcon,
  ArrowLeft02Icon,
  PencilEdit02Icon,
} from '@hugeicons/core-free-icons';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const CommunityScreen = () => {
  const [activeTab, setActiveTab] = useState('Posts');
  const [showFeatureSheet, setShowFeatureSheet] = useState(false);
  const [featureInfo, setFeatureInfo] = useState({ title: '', description: '' });

  const handleFeaturePress = (feature: string) => {
    setFeatureInfo({
      title: `${feature} Coming Soon!`,
      description:
        feature === 'Live'
          ? "Soon you'll be able to go live and connect with your community in real-time."
          : 'Get ready to share your voice through audio spaces with your community.',
    });
    setShowFeatureSheet(true);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Posts':
        return (
          <View className="flex-1 items-center justify-center">
            <Text className="text-[16px] font-medium leading-[22px] tracking-[-0.32px] text-[#63656b]">
              No posts yet
            </Text>
          </View>
        );
      case 'Announcements':
        return (
          <View className="flex-1 items-center justify-center">
            <Text className="text-[16px] font-medium leading-[22px] tracking-[-0.32px] text-[#63656b]">
              No announcements yet
            </Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <View className="flex-1 bg-[#040405]">
        {/* Cover Image Section */}
        <View className="h-[260px] w-full">
          <Image
            source={require('@/assets/images/community.jpg')}
            className="h-full w-full"
            style={{ opacity: 0.8 }}
          />
          <LinearGradient
            colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.7)', 'rgba(0,0,0,1)']}
            style={styles.bottomGradient}
            pointerEvents="none"
          />
          <TouchableOpacity className="absolute bg-Grey/07/80 h-[40px] w-[40px] items-center justify-center rounded-full  left-6 top-[72px]">
            <HugeiconsIcon icon={ArrowLeft02Icon} size={32} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity className="absolute z-[20px] right-[24px] top-[198px] rounded-3xl border border-[#d2d3d5] px-4 py-3">
            <Text className="text-[14px] font-PlusJakartaSansMedium leading-[18px] tracking-[-0.28px] text-[#d2d3d5]">
              Change cover
            </Text>
          </TouchableOpacity>
        </View>

        {/* Community Info Section */}
        <View className="px-2 pt-6">
          <View className="flex-row items-center justify-between">
            <Text className="font-TankerRegular text-[28px] font-bold leading-[36px] tracking-[-1.12px] text-[#f4f4f4]">
              Rema Ravers
            </Text>
            <View className="flex-row items-center gap-x-2">
              <TouchableOpacity onPress={() => handleFeaturePress('Audio')}>
                <HugeiconsIcon icon={CameraMicrophone01Icon} size={24} color="#D2D3D5" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleFeaturePress('Live')}>
                <HugeiconsIcon icon={VideoIconFreeIcons} size={24} color="#D2D3D5" />
              </TouchableOpacity>
              <TouchableOpacity className="flex-row items-center gap-x-2 rounded-3xl border border-[#63656b] px-4 py-3">
                <HugeiconsIcon icon={PencilEdit02Icon} size={16} color="#D2D3D5" />
                <Text className="text-[14px] font-medium leading-[18px] tracking-[-0.28px] text-[#d2d3d5]">
                  Edit
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text className="mt-3 text-[14px] font-PlusJakartaSansRegular leading-[18px] tracking-[-0.28px] text-[#d2d3d5]">
            The official community for Rema fans. Catch all the latest updates from shows, the new
            releases and just generally chill with me.
          </Text>
        </View>

        {/* Tabs */}
        <View className="mt-6">
          <StatsTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            tabs={['Posts', 'Announcements']}
          />
        </View>

        {/* Content */}
        {renderContent()}

        {/* Floating Action Button */}
        <TouchableOpacity
          onPress={() => router.push('/modal')}
          className="absolute bottom-4 right-4 h-[52px] w-[52px] items-center justify-center rounded-3xl bg-[#A187B5]">
          <HugeiconsIcon icon={PlusSignIcon} size={22} color="#FFFFFF" />
        </TouchableOpacity>

        {/* Bottom Sheet */}
        <KeyboardAvoidingViewUi
          isVisible={showFeatureSheet}
          onClose={() => setShowFeatureSheet(false)}>
          <View className="flex-1 items-center justify-center p-4">
            <Text className="mb-2 text-[20px] font-bold leading-[28px] tracking-[-0.8px] text-[#f4f4f4]">
              {featureInfo.title}
            </Text>
            <Text className="text-center text-[14px] leading-[18px] tracking-[-0.28px] text-[#63656b]">
              {featureInfo.description}
            </Text>
          </View>
        </KeyboardAvoidingViewUi>
      </View>
    </>
  );
};

export default CommunityScreen;

const styles = StyleSheet.create({
  bottomGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 120, // Adjust as needed for coverage
    zIndex: 2,
  },
});
