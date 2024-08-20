import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

export default function _layout() {
  return (
    <Stack screenOptions={{ headerShown: false }} initialRouteName='Startpage'>
        <Stack.Screen name="Startpage" options={{ headerShown: false }} />
        <Stack.Screen name="Signup" options={{ headerShown: false }} />
        <Stack.Screen name="Login" options={{ headerShown: false }} />
    </Stack>
  )
}

const styles = StyleSheet.create({})