import { View, Text } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';

export default function _Profilelayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: '#040405',
        },
        headerTitle: '',
        headerStyle: {
          backgroundColor: '#040405',
        },
      }}
    />
  );
}
