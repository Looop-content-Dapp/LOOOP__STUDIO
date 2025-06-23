import {
  Calendar01Icon,
  Gif01Icon,
  ImageAdd01Icon,
  ShoppingBag01Icon,
  VoiceIcon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {
  Image,
  Platform,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SvgUri } from 'react-native-svg';

const imgFrame1111 = 'http://localhost:3845/assets/b19723ed0852ecaa5a5e9df9e96faf29791dc871.png';
const imgVector = 'http://localhost:3845/assets/48fdc31e03810db6c09897596aa01b01df288fdb.svg';

export default function CreatePostModal() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-[#040405]">
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      <View className="flex-1 bg-[#040405] px-6">
        <View className="flex-row items-center justify-between py-3">
          <TouchableOpacity onPress={() => router.back()}>
            <Text className="text-base font-medium text-[#63656b]">Cancel</Text>
          </TouchableOpacity>
          <Text className="text-xl font-medium text-white">Create post</Text>
          <TouchableOpacity className="rounded-full bg-[#202227] px-4 py-2">
            <Text className="text-base font-medium text-[#63656b]">Post</Text>
          </TouchableOpacity>
        </View>

        <View className="mt-6 flex-row items-center gap-4">
          <Image source={{ uri: imgFrame1111 }} className="h-16 w-16 rounded-full" />
          <View>
            <View className="flex-row items-center gap-1">
              <Text className="text-base font-medium text-white">Rema</Text>
              <SvgUri uri={imgVector} width="17" height="17" />
            </View>
          </View>
        </View>

        <TextInput
          placeholder="What's on your mind?"
          placeholderTextColor="#63656b"
          className="mt-8 text-xl text-white"
          multiline
        />

        <View className="flex-1" />

        <View className="mb-4">
          <TouchableOpacity className="flex-row items-center gap-4 border-y border-[#202227] py-4">
            <HugeiconsIcon icon={ImageAdd01Icon} size={24} color="#63656B" />
            <Text className="font-PlusJakartaSansBold text-base text-[#d2d3d5]">
              Add a photo/video
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row items-center gap-4 border-b border-[#202227] py-4">
            <HugeiconsIcon icon={Gif01Icon} size={24} color="#63656B" />
            <Text className="font-PlusJakartaSansBold text-base text-[#d2d3d5]">
              Add a GIF file
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row items-center gap-4 border-b border-[#202227] py-4">
            <HugeiconsIcon icon={VoiceIcon} size={24} color="#63656B" />
            <Text className="font-PlusJakartaSansBold text-base text-[#d2d3d5]">
              Add audio file
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row items-center gap-4 border-b border-[#202227] py-4">
            <HugeiconsIcon icon={Calendar01Icon} size={24} color="#63656B" />
            <Text className="font-PlusJakartaSansBold text-base text-[#ff8a49]">
              Create an event
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row items-center gap-4 border-b border-[#202227] py-4">
            <HugeiconsIcon icon={ShoppingBag01Icon} size={24} color="#63656B" />
            <Text className="font-PlusJakartaSansBold text-base text-[#ff8a49]">
              Create a store
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
