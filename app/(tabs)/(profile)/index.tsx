import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import React from 'react';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useAuthStore } from '@/store/authStore';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const ProfileScreen = () => {
  const { userdata } = useAuthStore();

  return (
    <View className="flex-1 bg-[#040405]">
      <ScrollView className="flex-1">
        {/* Profile Info */}
        <View className="items-center">
          <ImageBackground
            source={require('@/assets/images/profile.jpg')}
            className="h-[400px] w-full  justify-end bg-Grey/06 px-2"
            resizeMode="cover">
            <LinearGradient
              colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.7)', 'rgba(0,0,0,1)']}
              style={styles.bottomGradient}
              pointerEvents="none"
            />
            {/* Edit Profile Button */}
            <TouchableOpacity
              className="absolute bottom-4 right-4 z-[20px] rounded-full bg-[#202227] p-2"
              onPress={() => router.push('/edit-profile')}>
              <Ionicons name="pencil" size={24} color="#d2d3d5" />
            </TouchableOpacity>

            {/* Artist Name and Verified Badge */}
            <View className="mb-6 items-start z-[20px] ">
             <View className="flex-row items-center gap-x-2">
               <MaterialIcons name="verified" size={24} color="#2196F3" />
                <Text className="text-[12px] font-PlusJakartaSansMedium text-[#2196F3]">Verified Artist</Text>
             </View>
              <View className="flex-row items-center gap-x-2">
                <Text className="font-TankerRegular text-[32px] text-white">
                  {userdata?.username || 'Artist Name'}
                </Text>
              </View>
            </View>
          </ImageBackground>

          {/* Stats Section */}
          <View className="mt-4 w-full flex-row items-center justify-between px-4">
            <View className="flex-row gap-x-2">
              <View className="items-center">
                <Text className="font-PlusJakartaSansBold text-xl text-white">2.5M</Text>
                <Text className="text-sm font-PlusJakartaSansMedium text-[#63656b]">Monthly</Text>
                <Text className="text-sm font-PlusJakartaSansMedium text-[#63656b]">Listeners</Text>
              </View>
              <View className="items-center">
                <Text className="font-PlusJakartaSansBold text-xl text-white">150K</Text>
                <Text className="text-sm text-[#63656b]">Followers</Text>
              </View>
              <View className="items-center">
                <Text className="font-PlusJakartaSansBold text-xl text-white">45</Text>
                <Text className="text-sm text-[#63656b]">Releases</Text>
              </View>
            </View>
            <View className="flex-row gap-x-4">
              <TouchableOpacity
                onPress={() => router.push('/wallet')}
                className="rounded-full bg-[#202227] p-2">
                <Ionicons name="wallet-outline" size={24} color="#d2d3d5" />
              </TouchableOpacity>
              <TouchableOpacity
                className="rounded-full bg-[#202227] p-2"
                onPress={() => router.push('/settings')}>
                <Ionicons name="settings-outline" size={24} color="#d2d3d5" />
              </TouchableOpacity>
            </View>
          </View>

          <Text className="mb-4 mt-2 font-PlusJakartaSansRegular text-base text-[#63656b]">
            {userdata?.bio || 'No bio yet'}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;

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
