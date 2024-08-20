import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import {
   GestureHandlerRootView,
   TextInput,
} from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import useDarkMode from "@/hooks/useDarkMode";
import { Colors } from "../../../constants/Colors";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/redux/userSlice";

export default function Verify() {
   const { email } = useLocalSearchParams();
   const isDark = useDarkMode();
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const [verificationCode, setVerificationCode] = useState<string>("");
   const dispatch = useDispatch();
   const [isErrorActive, setIsErrorActive] = useState<boolean>(false);

   //handel verify code submit
   const handelSignup = async() => {
      setIsLoading(true);
      const formData ={
         email:email,
         verificationCode:verificationCode
      }
      try {
         const res = await axios.post("https://fashion-fusion-suneel.vercel.app/api/user/verify",formData);
         if (res.status === 200) {
            router.replace('../../Home')
            dispatch(loginSuccess(res.data.user))
            setIsLoading(false);
         }
      } catch (error) {
         setIsErrorActive(true)
         setIsLoading(false)
      }
   };

   useEffect(() => {
      const timer = setTimeout(() => {
         setIsErrorActive(false);
      }, 2000); 
   
      return () => clearTimeout(timer);
   }, [isErrorActive]);
   
   return (
      <GestureHandlerRootView>
         <StatusBar />
         <View style={styles(isDark).container}>
            {isErrorActive && <Text style={{fontSize:15,fontWeight:300,color:'red'}}>verification error</Text>}
            <Text style={styles(isDark).text}>
               We have sent otp code to{" "}
               <Text style={{ fontWeight: "bold" }}>{email}</Text>
            </Text>
            <Text style={styles(isDark).text}>
               Please Verify your email to start shopping
            </Text>
            <View >
               <TextInput 
               style={styles(isDark).input}
               value={verificationCode}
               onChangeText={(text)=>setVerificationCode(text)}
               placeholderTextColor={isDark?Colors.dark.placeholdercolor:Colors.light.text}
               placeholder="Enter code" />
            </View>
            <View>
               <TouchableOpacity onPress={handelSignup}>
                  <View style={styles(isDark).button}>
                     {isLoading ? (
                        <ActivityIndicator
                           size={"small"}
                           color={Colors.dark.background}
                        />
                     ) : (
                        <Text style={styles(isDark).buttonText}>Verify</Text>
                     )}
                  </View>
               </TouchableOpacity>
            </View>
         </View>
      </GestureHandlerRootView>
   );
}

const styles = (isDark: any) =>
   StyleSheet.create({
      container: {
         flex: 1,
         justifyContent: "center",
         alignItems: "center",
         backgroundColor: isDark
            ? Colors.dark.background
            : Colors.light.background,
      },
      input: {
         fontSize: 25,
         color: isDark ? Colors.dark.text : Colors.light.text,
         borderColor: isDark ? Colors.dark.placeholdercolor : Colors.light.text,
         paddingVertical: 7,
         paddingHorizontal: 10,
         backgroundColor: isDark ? "#353535" : Colors.light.background,
         borderRadius: 5,
         borderWidth: 1,
         width: "40%",
         display: "flex",
         justifyContent: "center",
         alignItems: "center",
         marginTop: 20,
      },
      text: {
         fontSize: 15,
         color: isDark ? Colors.dark.text : Colors.light.text,
         marginBottom: 5,
      },
      button: {
         marginTop: 15,
         backgroundColor: '#FF8C00',
         paddingVertical: 13,
         paddingHorizontal: 100,
         borderRadius: 10,
      },
      buttonText: {
         color: Colors.light.text,
         fontSize: 15,
         fontWeight: 'bold',
         textAlign: 'center',
      },
   });
