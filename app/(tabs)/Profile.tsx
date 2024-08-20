import React, { useState } from "react";
import {
   Alert,
   KeyboardAvoidingView,
   Pressable,
   StatusBar,
   StyleSheet,
   Text,
   View,
   Platform,
   TouchableOpacity,
} from "react-native";
import useDarkMode from "@/hooks/useDarkMode";
import { Colors } from "@/constants/Colors";
import * as ImagePicker from "expo-image-picker";
import { TextInput } from "react-native-gesture-handler";
import { Image } from "expo-image";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { logout } from "@/redux/userSlice";
import { router } from "expo-router";

export default function Profile() {
   const isDark = useDarkMode();
   const [selectedImage, setSelectedImage] = useState("");
   const dispatch = useDispatch()
   const currentUser = useSelector(
      (state: RootState) => state.user.currentUser
   );

   // Image picker function
   const pickImage = async () => {
      const permission =
         await ImagePicker.requestMediaLibraryPermissionsAsync();

      // Request permission for media access
      if (permission?.granted === false) {
         alert("Permission to access camera roll is required");
      }

      const result = await ImagePicker.launchImageLibraryAsync({
         allowsEditing: true,
         quality: 1,
      });

      if (!result.canceled) {
         setSelectedImage(result.assets[0].uri);
      } else {
         Alert.alert("You didn't select any image");
      }
   };

   //handel logout
   const handelLogout = () => {
      router.push('../Login')
      dispatch(logout())
   }

   return (
         <View style={styles(isDark).container}>
            <StatusBar
               backgroundColor={
                  isDark ? Colors.dark.background : Colors.light.background
               }
               barStyle={isDark ? "light-content" : "dark-content"}
            />
            <View style={styles(isDark).profileContainer}>
               <Text style={styles(isDark).Text}>Profile</Text>
               <View style={styles(isDark).profileContainer}>
                  {/* User Image */}
                  <Pressable >
                     <View>
                        <Image
                           source={{ uri: currentUser?.avatar }}
                           style={styles(isDark).profileImage}
                        />
                     </View>
                  </Pressable>
                  <View style={styles(isDark).profileContainer}>
                     <Text style={styles(isDark).profileInput}>Name: {currentUser?.userName}</Text>
                     <Text style={styles(isDark).profileInput}>Email: {currentUser?.email}</Text>
                  </View>
                  <View>
                     <TouchableOpacity style={{marginTop:30}} onPress={handelLogout}>
                        <Text style={{color:'red'}}>Logout</Text>
                     </TouchableOpacity>
                  </View>
               </View>
            </View>
         </View>
   );
}

const styles = (isDark: any) =>
   StyleSheet.create({
      container: {
         backgroundColor: isDark ? Colors.dark.background : Colors.light.background,
         paddingTop: StatusBar.currentHeight,
         flex: 1,
      },
      profileImage: {
         width: 150,
         height: 150,
         borderRadius: 100,
      },
      Text: {
         fontSize: 25,
         fontWeight: "bold",
         color: isDark ? Colors.dark.text : Colors.light.text,
         marginBottom: 10,
      },
      profileContainer: {
         justifyContent: "center",
         alignItems: "center",
         marginTop: 10,
         flexDirection: "column",
         width: "100%",
      },
      profileInput: {
         fontSize: 17,
         fontWeight: "400",
         color: isDark ? Colors.dark.text : Colors.light.text,
      },
   });









