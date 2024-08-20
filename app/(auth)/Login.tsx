import {
   ActivityIndicator,
   Alert,
   Button,
   Image,
   StatusBar,
   StyleSheet,
   Text,
   TouchableOpacity,
   useColorScheme,
   View,
} from "react-native";
import React, { useState } from "react";
import { Colors } from "@/constants/Colors";
import {
   GestureHandlerRootView,
   TextInput,
} from "react-native-gesture-handler";
import { Link, router } from "expo-router";
import { loginInterface } from "@/interface";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { loginSuccess } from "@/redux/userSlice";
import useDarkMode from "@/hooks/useDarkMode";

export default function Login() {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const dispatch = useDispatch();
   const isDark = useDarkMode()

   //handel login submit
   const handelSubmit = async () => {
      setIsLoading(true);
      const formdata = {
         email: email,
         password: password,
      };
      try {
         const res = await axios.post("https://fashion-fusion-suneel.vercel.app/api/user/login",formdata);
         if (res.status === 200) {
            dispatch(loginSuccess(res.data.user));
            setIsLoading(false);
            router.replace('../Home')
         }
      } catch (error) {
         setIsLoading(false);
         Alert.alert("Some thing went wrong");
      }
   };
   return (
      <GestureHandlerRootView>
         <View style={styles(isDark).containter}>
            <View style={{ marginTop: 80, paddingHorizontal: 20 }}>
               {/* logoandheader */}
               <View style={styles(isDark).header}>
                  <Image source={require("../../assets/images/logo.png")} />
                  <Text style={styles(isDark).text}>AORA</Text>
               </View>

               {/* signup */}
               <View>
                  <Text style={[styles(isDark).text, { marginVertical: 30 }]}>
                     Login
                  </Text>
                  <View style={styles(isDark).inputBox}>
                     <Text style={styles(isDark).label}>Email</Text>
                     <TextInput
                        placeholderTextColor={
                           isDark
                              ? Colors.dark.placeholdercolor
                              : Colors.light.placeholdercolor
                        }
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        style={styles(isDark).input}
                        placeholder="Enter your email"
                     />
                  </View>
                  <View style={styles(isDark).inputBox}>
                     <Text style={styles(isDark).label}>Password</Text>
                     <TextInput
                        placeholderTextColor={
                           isDark
                              ? Colors.dark.placeholdercolor
                              : Colors.light.placeholdercolor
                        }
                        onChangeText={(text) => setPassword(text)}
                        value={password}
                        secureTextEntry
                        style={styles(isDark).input}
                        placeholder="Enter your password"
                     />
                  </View>
               </View>

               {/* button */}
               <View>
                  <TouchableOpacity onPress={handelSubmit}>
                     <View style={styles(isDark).button}>
                        {isLoading ? (
                           <ActivityIndicator size={"small"} color={Colors.dark.background} />
                        ) : (
                           <Text style={styles(isDark).buttonText}>Login</Text>
                        )}
                        
                     </View>
                  </TouchableOpacity>

                  <Link style={styles(isDark).link} href={"/Signup"}>
                     Don't have an account?{" "}
                     <Text style={{ color: Colors.dark.buttonColor }}>
                        Sign up
                     </Text>
                  </Link>
               </View>
            </View>
         </View>
      </GestureHandlerRootView>
   );
}

const styles = (isDark: any) =>
   StyleSheet.create({
      containter: {
         flex: 1,
         backgroundColor: isDark
            ? Colors.dark.background
            : Colors.light.background,
         paddingTop: StatusBar.currentHeight,
      },
      header: {
         display: "flex",
         flexDirection: "row",
         gap: 10,
         alignItems: "center",
      },
      text: {
         fontSize: 27,
         color: isDark ? Colors.dark.text : Colors.light.text,
         fontFamily: "sans-serif",
         fontWeight: "bold",
      },
      label: {
         opacity: 0.7,
         fontSize: 17,
         fontWeight: "bold",
         color: isDark ? Colors.dark.text : Colors.light.text,
         marginBottom: 5,
      },
      input: {
         fontSize: 17,
         color: isDark ? Colors.dark.text : Colors.light.text,
         borderColor: isDark ? Colors.dark.placeholdercolor : Colors.light.text,
         padding: 10,
         backgroundColor: isDark ? "#353535" : Colors.light.background,
         borderRadius: 5,
         borderWidth: 1,
      },
      inputBox: {
         marginVertical: 7,
      },
      button: {
         marginTop: 25,
         backgroundColor: "#FF8C00",
         paddingVertical: 13,
         paddingHorizontal: 100,
         borderRadius: 10,
      },
      buttonText: {
         color: Colors.light.text,
         fontSize: 18,
         fontWeight: "bold",
         textAlign: "center",
      },
      link: {
         textAlign: "center",
         marginTop: 10,
         fontSize: 15,
         fontWeight: "600",
         opacity: 0.7,
         color: isDark ? Colors.dark.text : Colors.light.text,
      },
   });
