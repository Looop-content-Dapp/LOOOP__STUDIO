import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Input } from './input';
import { Ionicons } from '@expo/vector-icons';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { CheckmarkCircle02Icon } from '@hugeicons/core-free-icons';

interface CreatorInputProps {
  label: string;
  description?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  selectedCreators: string[];
  onAddCreator: (value: string) => void;
  onRemoveCreator: (value: string) => void;
  error?: string;
}

export const CreatorInput = ({
  label,
  description,
  placeholder,
  value,
  onChange,
  selectedCreators = [],
  onAddCreator = () => {},
  onRemoveCreator = () => {},
  error,
}: CreatorInputProps) => {
  const [inputValue, setInputValue] = useState('');
  const buttonLabel = label.toLowerCase().startsWith('add')
    ? label.toLowerCase()
    : `add ${label.toLowerCase()}`;

  const handleAddCreator = () => {
    if (inputValue.trim()) {
      onAddCreator(inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <View className="gap-y-[12px]">
      <View className="w-full flex-row items-center gap-x-[8px]">
        <Input
          label={label}
          description={description}
          placeholder={placeholder}
          value={inputValue}
          onChangeText={setInputValue}
        />
        <TouchableOpacity onPress={() => setInputValue('')}>
          <Ionicons name="close" size={24} color="#787A80" />
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="w-full gap-x-[8px]">
        {selectedCreators.map((creator) => (
          <View
            key={creator}
            className="w-[40%] flex-row items-center gap-x-[8px] rounded-[10px] bg-[#A187B5] px-[8px] py-[8px]">
            <HugeiconsIcon icon={CheckmarkCircle02Icon} size={24} color="#FFFFFF" variant="solid" />
            <Text className="font-PlusJakartaSansMedium text-[16px] text-[#202227]">{creator}</Text>
            <TouchableOpacity onPress={() => onRemoveCreator(creator)}>
              <Ionicons name="close" size={20} color="#202227" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity
        onPress={handleAddCreator}
        className="mx-auto rounded-[10px] bg-[#202227] px-[16px] py-[10px]">
        <Text className="font-PlusJakartaSansMedium text-[14px] text-[#9A9B9F]">
          + {buttonLabel}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
