import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { persistor, store } from "../redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
   const [currentUser, setCurrentUser] = useState(null);
   return (
      <GestureHandlerRootView>
         <PersistGate persistor={persistor}>
            <Provider store={store}>
               <Stack screenOptions={{ headerShown: false }}>
                  {currentUser ? (
                     <Stack.Screen
                        name="(tabs)"
                        options={{ headerShown: false }}
                     />
                  ) : (
                     <Stack.Screen
                        name="(auth)"
                        options={{ headerShown: false }}
                     />
                  )}
                  <Stack.Screen name="index" options={{ headerShown: false }} />
               </Stack>
            </Provider>
         </PersistGate>
      </GestureHandlerRootView>
   );
}

const styles = StyleSheet.create({});
