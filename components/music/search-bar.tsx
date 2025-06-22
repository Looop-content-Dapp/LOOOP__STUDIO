import { Ionicons } from '@expo/vector-icons';
import { TextInput, TouchableOpacity, View } from 'react-native';

export function SearchBar() {
  return (
    <View className="mb-4 flex-row items-center">
      <View className="flex-1 flex-row items-center rounded-lg bg-[#202227] px-4">
        <Ionicons name="search" size={18} color="#63656b" />
        <TextInput
          placeholder="Search songs and albums"
          placeholderTextColor="#63656b"
          className="ml-2 h-12 flex-1 text-white"
        />
      </View>
      <TouchableOpacity className="ml-2 rounded-lg border border-[#202227] bg-[#111318] p-3">
        <Ionicons name="options-outline" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}
