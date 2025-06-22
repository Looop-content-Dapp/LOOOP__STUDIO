import React from 'react';
import { Text, View } from 'react-native';

interface StatCardProps {
  title: string;
  subtitle?: string;
  value: string;
  unit?: string;
  change?: string;
  children?: React.ReactNode;
  isTwoLiner?: boolean;
  changeColor?: string;
}

const StatCard = ({
  title,
  subtitle,
  value,
  unit,
  change,
  children,
  isTwoLiner,
  changeColor = 'text-[#a2fa96]',
}: StatCardProps) => {
  return (
    <View className="h-60 w-[48%] justify-between rounded-3xl border border-[#202227] bg-[#111318] p-4">
      <View>
        <Text className="font-PlusJakartaSansBold text-[16px] font-semibold leading-[22px] tracking-[-0.32px] text-[#f4f4f4]">
          {title}
        </Text>
        {subtitle && (
          <Text className="font-PlusJakartaSansBold text-[12px] leading-[16px] tracking-[-0.24px] text-[#63656b]">
            {subtitle}
          </Text>
        )}
        {change && (
          <Text
            className={`${changeColor} mt-1 font-TankerRegular text-[16px] font-semibold leading-[22px] tracking-[-0.32px]`}>
            {change}
          </Text>
        )}
      </View>

      <View>
        {isTwoLiner ? (
          <>
            <Text className="font-TankerRegular text-[24px] font-bold leading-[30px] tracking-[-0.96px] text-[#f4f4f4]">
              {value}
            </Text>
            {unit && (
              <Text className="font-TankerRegular text-[24px] font-normal leading-[30px] text-[#f4f4f4]">
                {unit}
              </Text>
            )}
          </>
        ) : (
          <Text className="font-TankerRegular text-[28px] font-bold leading-[30px] tracking-[-0.96px] text-[#f4f4f4]">
            {value}
            {unit && <Text className="text-sm font-normal"> {unit}</Text>}
          </Text>
        )}
      </View>
      {children && <View className="absolute bottom-0 left-0 right-0 top-0 -z-10">{children}</View>}
    </View>
  );
};

export default StatCard;
