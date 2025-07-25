import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'

const Preview = ({ formData }) => {
  return (
    <ScrollView className="flex-1">
      {/* Header */}
      <View className="h-[200px]">
        <Image
          source={{ uri: formData?.coverImage }}
          className="w-full h-full object-cover"
        />
      </View>

      {/* Tribe Info */}
      <View className="p-5">
        <Text className="text-[28px] font-PlusJakartaSansBold text-white mb-2.5">
          {formData?.tribeName}
        </Text>

        <Text className="text-[14px] text-[#f4f4f4] mb-[30px] font-PlusJakartaSansRegular">
          {formData?.description}
        </Text>

        {/* Tribe Pass Section */}
        <Text className="text-[20px] font-bold text-[#f4f4f4] mb-5">
          Tribe pass
        </Text>

        {/* Pass Card */}
        <View className="bg-[#111318] rounded-[20px] overflow-hidden mb-[30px] p-2 border-[0.5px] border-[#63656B]">
          <Image
            source={{ uri: formData?.collectibleMedia }}
            className="w-full h-[300px] object-cover"
          />

          <View className="flex-row items-center justify-between w-full px-[10px] py-[16px]">
            <Text className="text-[24px] font-PlusJakartaSansBold text-white mb-2">
              {formData?.collectibleName}
            </Text>
            <Image source={require("../../../assets/images/logo-gray.png")} className='w-[49px] h-[22px]' />
          </View>
        </View>

      </View>
    </ScrollView>
  )
}

export default Preview
