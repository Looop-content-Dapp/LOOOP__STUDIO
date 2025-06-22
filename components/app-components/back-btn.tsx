import {  ArrowLeft02Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { Pressable, Text } from 'react-native';

export const AppBackButton = ({
  name,
  onBackPress = () => {},
}: {
  name: string;
  onBackPress: () => void;
}) => {
  return (
    <Pressable className="flex flex-row items-center gap-3" onPress={onBackPress}>
      <HugeiconsIcon icon={ArrowLeft02Icon} size={24} color="#FFFFFF" />
      <Text className="font-PlusJakartaSansBold text-[16px] text-[#f4f4f4]">{name}</Text>
    </Pressable>
  );
};
