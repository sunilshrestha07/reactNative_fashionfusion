import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import useDarkMode from '@/hooks/useDarkMode'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { Colors } from '@/constants/Colors'
import { Image } from 'expo-image'

export default function HomeHeader() {
    const currentUser = useSelector((state: RootState) => state.user.currentUser)
    const isDark = useDarkMode()
  return (
    <View>
      <View style={{ marginTop: 30 }}>
            <View style={[styles(isDark).headerTitle]}>
               <View>
                  <Text
                     style={[
                        styles(isDark).text,
                        { fontSize: 20, fontWeight: "semibold" },
                     ]}
                  >
                     Welcome back
                  </Text>
                  <Text
                     style={[
                        styles(isDark).text,
                        { fontSize: 26, marginTop: -5 },
                     ]}
                  >
                     {currentUser?.userName}
                  </Text>
               </View>
               <View>
                  <Image
                     style={{ width: 45, height: 45, objectFit: "contain" }}
                     source={require("../assets/images/logo.png")}
                  />
               </View>
            </View>
         </View>
    </View>
  )
}

const styles = (isDark: any) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: isDark
           ? Colors.dark.background
           : Colors.light.background,
        paddingTop: StatusBar.currentHeight, // Adjusting for StatusBar height
     },
     text: {
        color: isDark ? Colors.dark.text : Colors.light.text,
        fontWeight: "bold",
        fontFamily: "sans-serif",
     },
     headerTitle: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
     },
})