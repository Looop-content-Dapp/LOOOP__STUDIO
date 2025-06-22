import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { CdIcon, Playlist02Icon, Vynil03Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const baseWidth = 391;
const scale = Math.min(SCREEN_WIDTH / baseWidth, 1.2);
const responsiveSize = (size: number) => {
  const scaledSize = Math.round(size * scale);
  return Math.max(scaledSize, size * 0.7);
};

const isIOS = Platform.OS === 'ios';

const Index = () => {
  const { push } = useRouter();
  const [selectedType, setSelectedType] = useState<'Single' | 'EP' | 'Album' | null>(null);
  const [dimensions, setDimensions] = useState({
    window: Dimensions.get('window'),
  });

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions({ window });
    });

    return () => subscription?.remove();
  }, []);

  const gridItemWidth = Math.min((dimensions.window.width - responsiveSize(60)) / 2, 180);

  const uploadTypes = [
    {
      id: 'Single',
      icon: CdIcon,
      text: 'Single',
      route: 'uploadMusic/uploadSingle',
    },
    {
      id: 'EP',
      icon: Playlist02Icon,
      text: 'EP',
      route: 'uploadMusic/uploadEp',
    },
    {
      id: 'Album',
      icon: Vynil03Icon,
      text: 'Album',
      route: 'uploadMusic/uploadAlbum',
    },
  ];

  const handleTypeSelect = (type: 'Single' | 'EP' | 'Album') => {
    setSelectedType(type);
  };

  const handleContinue = () => {
    if (selectedType) {
      const selectedUploadType = uploadTypes.find((type) => type.id === selectedType);
      if (selectedUploadType) {
        try {
          push(selectedUploadType.route);
        } catch (error) {
          Alert.alert('Navigation Error', 'Failed to navigate to the selected upload type.');
        }
      }
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="flex-1">
        <ScrollView showsVerticalScrollIndicator={false} className="flex-grow">
          <View className="flex-1 p-4">
            <Text className="mt-4 font-TankerRegular text-[34px] font-bold text-white">
              Upload Type
            </Text>
            <Text className="mt-1 text-base font-normal leading-5 text-[#AAAAAA]">
              Select from the upload types
            </Text>

            <View className="mt-4 flex-row flex-wrap justify-between gap-4">
              {uploadTypes.map((item) => {
                const isSelected = selectedType === item.id;
                return (
                  <TouchableOpacity
                    key={item.id}
                    className={`relative items-start justify-end overflow-hidden rounded-2xl bg-[#1E1E1E] p-3 ${
                      isSelected ? 'border-2 border-[#57E09A]' : ''
                    }`}
                    style={{
                      width: gridItemWidth,
                      height: gridItemWidth,
                    }}
                    onPress={() => handleTypeSelect(item.id as 'Single' | 'EP' | 'Album')}>
                    <View
                      className="absolute -right-5 -top-5 opacity-50"
                      style={{
                        transform: [{ scale }],
                      }}>
                      <HugeiconsIcon
                        icon={item.icon}
                        size={responsiveSize(120)}
                        color={isSelected ? '#57E09A' : '#787A80'}
                        variant="solid"
                      />
                    </View>
                    <Text
                      className={`font-PlusJakartaSansMedium text-[16px] ${isSelected ? 'text-[#57E09A]' : 'text-[#F4F4F4]'}`}>
                      {item.text}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </ScrollView>

        <View className={`p-4 ${isIOS ? 'pb-8' : 'pb-4'} bg-black`}>
          <TouchableOpacity
            className={`${
              selectedType ? 'bg-[#4ADE80]' : 'bg-[#12141B] opacity-50'
            } h-12 items-center justify-center rounded-[30px]`}
            onPress={handleContinue}
            disabled={!selectedType}>
            <Text
              className={`text-base font-semibold tracking-[0.2px] ${
                selectedType ? 'text-black' : 'text-[#787A80]'
              }`}>
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Index;
