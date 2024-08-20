import {
   Image,
   StatusBar,
   StyleSheet,
   Text,
   useColorScheme,
   View,
} from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";
import useDarkMode from "@/hooks/useDarkMode";
import CarouselComponent from "@/components/CarouselComponent";
import { router } from "expo-router";
import HomeHeader from "@/components/HomeHeader";
import Category from "@/components/Category";
import Foryou from "@/components/Foryou";
import { ScrollView } from "react-native-gesture-handler";

export default function Home() {
   const isDark = useDarkMode();
   return (
      <ScrollView style={{backgroundColor:isDark?Colors.dark.background:Colors.light.background}}>
         <View style={[styles(isDark).container, { paddingHorizontal: 20 }]}>
            <StatusBar
               barStyle={isDark ? "light-content" : "dark-content"}
               backgroundColor={
                  isDark ? Colors.dark.background : Colors.light.background
               }
            />

            {/* Header */}
            <View>
               <HomeHeader />
            </View>

            {/* sliders */}
            <View>
               <CarouselComponent />
            </View>

            {/* Category */}
            <View>
               <Category />
            </View>

            {/* For you */}
            <View>
               <Foryou />
            </View>
         </View>
      </ScrollView>
   );
}

const styles = (isDark: boolean) =>
   StyleSheet.create({
      container: {
         flex: 1,
         backgroundColor: isDark
            ? Colors.dark.background
            : Colors.light.background,
         paddingTop: StatusBar.currentHeight, // Adjusting for StatusBar height
      },
   });
