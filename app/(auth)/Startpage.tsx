import {
   Image,
   StyleSheet,
   Text,
   View,
   StatusBar,
   TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import useDarkMode from "@/hooks/useDarkMode";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function Startpage() {
   const isDark = useDarkMode();
   const router = useRouter();

   return (
      <View style={styles(isDark).container}>
         <StatusBar
            barStyle={isDark ? "light-content" : "dark-content"}
            backgroundColor={
               isDark ? Colors.dark.background : Colors.light.background
            }
         />
         {/* Main content */}
         <View style={styles(isDark).maincontainer}>
            {/* Right image */}
            <View
               style={[
                  styles(isDark).imageBox,
                  { transform: [{ rotate: "-5deg" }] },
               ]}
            >
               <Image
                  style={styles(isDark).image}
                  source={require("../../assets/images/main5.jpg")}
               />
            </View>
            {/* Left image */}
            <View
               style={[
                  styles(isDark).imageBox,
                  { transform: [{ rotate: "5deg" }] },
               ]}
            >
               <Image
                  style={styles(isDark).image}
                  source={require("../../assets/images/cinematic.jpg")}
               />
            </View>
         </View>

         {/* Text content */}
         <View style={styles(isDark).textBox}>
            <View>
               <Text style={styles(isDark).text}>
                  Discover Endless Possibilities with{" "}
                  <Text style={{ color: "#FF8C00" }}>Aora</Text>
               </Text>
               <Text style={styles(isDark).smallText}>
                  Where Creativity Meets Innovation: Embark on a Journey of
                  Limitless Exploration with Aora
               </Text>
            </View>

            {/* Button */}
            <TouchableOpacity
               style={styles(isDark).button}
               onPress={()=>router.replace("/Signup")}
            >
               <Text style={styles(isDark).buttonText}>Get Started</Text>
            </TouchableOpacity>
         </View>
      </View>
   );
}

const styles = (isDark: boolean) =>
   StyleSheet.create({
      container: {
         flex: 1,
         backgroundColor: isDark
            ? Colors.dark.background
            : Colors.light.background,
         alignItems: "center",
         paddingTop: StatusBar.currentHeight, // Adjusting for StatusBar height
      },
      maincontainer: {
         flexDirection: "row", 
         justifyContent: "space-between", 
         alignItems: "center", 
         height: "auto",
         paddingHorizontal: 20,
         paddingTop: 20,
      },
      imageBox: {
         flex: 1, 
         justifyContent: "center", 
         alignItems: "center",
         objectFit: "cover",
         height: "60%",
         borderRadius: 15,
         borderWidth: 3,
         borderColor: isDark ? Colors.light.background : Colors.dark.background,
         overflow: "hidden",
      },
      image: {
         width: "110%",
         height: "110%",
         objectFit: "cover",
      },
      text: {
         fontSize: 33,
         fontWeight: "bold",
         fontFamily: "sans-serif",
         textAlign: "center",
         color: isDark ? Colors.dark.text : Colors.light.text,
      },
      textBox: {
         marginTop: -60,
         alignItems: "center",
      },
      smallText: {
         fontSize: 15,
         marginTop: 10,
         fontFamily: "sans-serif",
         textAlign: "center",
         color: isDark ? Colors.dark.text : Colors.light.text,
      },
      button: {
         marginTop: 25,
         backgroundColor: "#FF8C00",
         paddingVertical: 15,
         paddingHorizontal: 100,
         borderRadius: 10,
      },
      buttonText: {
         color: Colors.light.text,
         fontSize: 18,
         fontWeight: "bold",
         textAlign: "center",
      },
   });
