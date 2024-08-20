import { StyleSheet, Text, useColorScheme, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Startpage from './(auth)/Startpage'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { Redirect } from 'expo-router'

export default function index() {
  const currentUser = useSelector((state: RootState) => state.user.currentUser)

  //if ther is no user the redirect to the starting page
  if(currentUser) return <Redirect href="/Home" />
  return (
    <GestureHandlerRootView>
      <Startpage/>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({})