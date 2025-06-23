import { Ionicons } from '@expo/vector-icons';
import { useCallback, useMemo, useState } from 'react';
import { Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';

interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps {
  label: string;
  description?: string;
  options: SelectOption[];
  value: string;
  onValueChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
}

export const Select = ({
  label,
  description,
  options,
  value,
  onValueChange,
  error,
  disabled = false,
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = useMemo(
    () => options.find((option) => option.value === value),
    [options, value]
  );

  const handleSelect = useCallback(
    (optionValue: string) => {
      onValueChange(optionValue);
      setIsOpen(false);
    },
    [onValueChange]
  );

  const handleOpen = useCallback(() => {
    if (disabled) return;
    setIsOpen(true);
  }, [disabled]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <View className="gap-y-[12px]">
      <Text className="font-PlusJakartaSansMedium text-[16px] text-[#F4F4F4]">{label}</Text>
      {description && (
        <Text className="font-PlusJakartaSansMedium text-[14px] text-[#787A80]">{description}</Text>
      )}

      <TouchableOpacity
        onPress={handleOpen}
        className={`rounded-[56px] border-2 bg-[#111318] px-[24px] py-[20px] ${
          error ? 'border-red-500' : 'border-[#202227]'
        } flex-row items-center justify-between`}>
        <Text
          className={`font-PlusJakartaSansRegular text-[16px] ${
            selectedOption ? 'text-[#F4F4F4]' : 'text-[#787A80]'
          }`}>
          {selectedOption ? selectedOption.label : 'Select option'}
        </Text>
        <Ionicons name="chevron-down" size={20} color="#787A80" />
      </TouchableOpacity>

      {error && <Text className="font-PlusJakartaSansRegular text-sm text-red-500">{error}</Text>}

      {isOpen && (
        <Modal visible={true} transparent animationType="slide" onRequestClose={handleClose}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => setIsOpen(false)}
            className="flex-1 justify-end bg-black/50">
            <TouchableOpacity
              activeOpacity={1}
              onPress={(e) => e.stopPropagation()}
              className="rounded-t-[24px] bg-[#111318] p-6">
              <View className="mb-6 flex-row items-center justify-between">
                <Text className="font-PlusJakartaSansMedium text-lg text-[#F4F4F4]">{label}</Text>
                <TouchableOpacity onPress={() => setIsOpen(false)}>
                  <Ionicons name="close" size={24} color="#787A80" />
                </TouchableOpacity>
              </View>

              <ScrollView className="max-h-[400px]">
                {options.map((option) => (
                  <TouchableOpacity
                    key={option.value}
                    onPress={() => handleSelect(option.value)}
                    className={`flex-row items-center justify-between border-b border-[#2C2F36] p-4 ${
                      value === option.value ? 'bg-[#202227]' : ''
                    }`}>
                    <Text
                      className={`font-PlusJakartaSansMedium text-[16px] ${
                        value === option.value ? 'text-[#FF7A1B]' : 'text-[#F4F4F4]'
                      }`}>
                      {option.label}
                    </Text>
                    {value === option.value && (
                      <Ionicons name="checkmark" size={24} color="#FF7A1B" />
                    )}
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </TouchableOpacity>
          </TouchableOpacity>
        </Modal>
      )}
    </View>
  );
};
