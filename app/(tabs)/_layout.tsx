import { StyleSheet, Text, useColorScheme, View } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import useDarkMode from "@/hooks/useDarkMode";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function Tablayout() {
   const CartItems = useSelector((state: RootState) => state.cart.totalQuantity);
   const isDark = useDarkMode();
   return (
      <GestureHandlerRootView >
         <Tabs
            screenOptions={{
               headerShown: false,
               tabBarActiveTintColor: "orange",
               tabBarInactiveTintColor: "gray",
               tabBarShowLabel: false,
               // tabBarHideOnScroll: true,
               tabBarStyle: {
                  backgroundColor: isDark ? "black" : "white",
                  borderTopColor: isDark ? "black" : "white",
                  marginHorizontal: 20,
                  marginVertical: 15,
                  position: "absolute",
                  borderRadius: 20,
               },
            }}
         >
            <Tabs.Screen
               name="Home"
               options={{
                  title: "Home",
                  tabBarIcon: ({ color }) => (
                     <FontAwesome name="home" size={24} color={color} />
                  ),
               }}
            />
            <Tabs.Screen
               name="Sale"
               options={{
                  title: "Sale",
                  tabBarIcon: ({ color }) => (
                     <FontAwesome name="tags" size={24} color={color} />
                  ),
               }}
            />
            <Tabs.Screen
               name="Cart"
               options={{
                  title: "Cart",
                  tabBarIcon: ({ color }) => (
                     <FontAwesome
                        name="shopping-cart"
                        size={24}
                        color={color}
                     />
                  ),
                  tabBarBadge: CartItems,
               }}
            />
            <Tabs.Screen
               name="Profile"
               options={{
                  title: "Profile",
                  tabBarIcon: ({ color }) => (
                     <FontAwesome name="user" size={24} color={color} />
                  ),
               }}
            />
         </Tabs>
      </GestureHandlerRootView>
   );
}

const styles = StyleSheet.create({});
