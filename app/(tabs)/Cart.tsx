import {
   ActivityIndicator,
   Alert,
   StatusBar,
   StyleSheet,
   Text,
   TouchableOpacity,
   View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import useDarkMode from "@/hooks/useDarkMode";
import { Colors } from "@/constants/Colors";
import { AntDesign, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { AddToCart } from "@/interface";
import { Image } from "expo-image";
import {
   addItemToCart,
   emptyCart,
   removeItemFromCart,
} from "@/redux/cartSlice";
import axios from "axios";

export default function Cart() {
   const isDark = useDarkMode();
   const dispatch = useDispatch();
   const currentUser = useSelector((state: RootState) => state.user.currentUser);
   const [isUploading,setIsUploading]=useState<boolean>(false)
   const [isMessageActive,setIsMessageActive]=useState<boolean>(false)

   //items in the cart
   const cartItems = useSelector((state: RootState) => state.cart.items);

   //total amount
   const grandTotal = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
   );
   //handel plus
   const handelPlus = (id: string) => {
      dispatch(addItemToCart(cartItems.find((item) => item._id === id)!));
   };

   //handel minus
   const handelMinus = (id: string) => {
      dispatch(removeItemFromCart(id));
   };

   //handel empty cart
   const handelEmptyCart = () => {
      dispatch(emptyCart());
   };

   //handel checkout
   const handelCheckout = async() => {
      setIsUploading(true)
      const formdata ={
         userId: currentUser?._id,
         dressName : cartItems.map((item) => item.name).join(", "),
         totalPrice : grandTotal,
         quantity : cartItems.reduce((total, item) => total + item.quantity, 0),
         userName : currentUser?.userName,
         userEmail : currentUser?.email,
      }
      try {
         const res = await axios.post("https://fashion-fusion-suneel.vercel.app/api/order",formdata)
         if(res.status === 200) {
            setIsUploading(false)
            setIsMessageActive(true)
            handelEmptyCart()  
         }
      } catch (error) {
         setIsUploading(false)
         console.log("error ordering ",error)
      }
   }

   // render message for order placed
   useEffect(() => {
      const timer = setTimeout(() => {
         setIsMessageActive(false);
      }, 700);

      return () => clearTimeout(timer);
   }, [isMessageActive]);

   //render item
   const renderItem = ({ item }: { item: AddToCart }) => (
      <View>
         <View style={styles(isDark).cartContainer}>
            <View>
               <Image
                  source={{ uri: item.image }}
                  style={styles(isDark).image}
               />
            </View>
            <View>
               <View>
                  <Text style={styles(isDark).cartText}>{item.name}</Text>
                  <Text
                     style={[
                        styles(isDark).cartText,
                        { fontWeight: "500", fontSize: 14 },
                     ]}
                  >
                     Rs:{item.price}
                  </Text>
               </View>
               <View
                  style={{
                     flexDirection: "row",
                     justifyContent: "space-between",
                     width: "83%",
                     alignItems: "baseline",
                  }}
               >
                  <View style={styles(isDark).touchContainer}>
                     <View>
                        <TouchableOpacity
                           style={[styles(isDark).touch]}
                           onPress={() => {
                              handelMinus(item._id);
                           }}
                        >
                           <Text style={styles(isDark).touchText}>-</Text>
                        </TouchableOpacity>
                     </View>
                     <View>
                        <View style={[styles(isDark).touch]}>
                           <Text
                              style={[
                                 styles(isDark).touchText,
                                 { fontSize: 14, fontWeight: "500" },
                              ]}
                           >
                              {item.quantity}
                           </Text>
                        </View>
                     </View>
                     <View>
                        <TouchableOpacity
                           style={[styles(isDark).touch]}
                           onPress={() => {
                              handelPlus(item._id);
                           }}
                        >
                           <Text
                              style={[
                                 styles(isDark).touchText,
                                 { fontSize: 15 },
                              ]}
                           >
                              +
                           </Text>
                        </TouchableOpacity>
                     </View>
                  </View>
                  <View>
                     <TouchableOpacity
                        onPress={() => {
                           dispatch(removeItemFromCart(item._id));
                        }}
                     >
                        <View>
                           <MaterialIcons
                              name="delete"
                              size={24}
                              color={isDark ? "#BB4430" : "red"}
                           />
                        </View>
                     </TouchableOpacity>
                  </View>
               </View>
            </View>
         </View>
      </View>
   );

   return (
      <ScrollView style={[styles(isDark).container, { position: "relative" }]}>
         <StatusBar
            backgroundColor={
               isDark ? Colors.dark.background : Colors.light.background
            }
         />

         {/* Sale Items */}
         <View>
            <View style={styles(isDark).header}>
               <Text style={styles(isDark).text}>My Cart</Text>
               <TouchableOpacity onPress={handelEmptyCart}>
                  <MaterialIcons
                     name="delete-outline"
                     size={30}
                     color={isDark ? "white" : "black"}
                  />
               </TouchableOpacity>
            </View>
         </View>
         {cartItems.length > 0 ? (
            <View>
               {/* flatlist */}
               <FlatList
                  data={cartItems}
                  renderItem={renderItem}
                  keyExtractor={(item) => item._id}
                  showsVerticalScrollIndicator={false}
               />

               {/* Checkout */}

               <View
                  style={{
                     flexDirection: "row",
                     justifyContent: "space-between",
                     alignItems: "center",
                     marginTop: 15,
                  }}
               >
                  <View>
                     <Text style={styles(isDark).cartText}>
                        Subtotal:{grandTotal}
                     </Text>
                  </View>
                  <TouchableOpacity
                     style={[{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                     }, styles(isDark).button]}
                     onPress={handelCheckout}
                  >
                     {isUploading? (
                        <ActivityIndicator style={{ paddingHorizontal: 15 }} size="small" color="black" />
                     ):(
                        <Text >Checkout</Text>
                     )}
                  </TouchableOpacity>
               </View>
            </View>
         ) : (
            <View
               style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 70,
               }}
            >
               <Text style={styles(isDark).text}>No items in the cart</Text>
            </View>
         )}

          {/* order message */}
          {isMessageActive && (
                  <View style={styles(isDark).alertMain}>
                     <View style={styles(isDark).alert}>
                        <FontAwesome
                           name="check-circle"
                           size={24}
                           color="green"
                        />
                        <Text style={{ fontWeight: "bold" }}>
                           Order placed successfully
                        </Text>
                     </View>
                  </View>
               )}
      </ScrollView>
   );
}

const styles = (isDark: any) =>
   StyleSheet.create({
      container: {
         flex: 1,
         backgroundColor: isDark
            ? Colors.dark.background
            : Colors.light.background,
         paddingTop: StatusBar.currentHeight,
         paddingHorizontal: 20,
      },
      header: {
         display: "flex",
         flexDirection: "row",
         justifyContent: "space-between",
         alignItems: "center",
         paddingVertical: 10,
      },
      text: {
         color: isDark ? Colors.dark.text : Colors.light.text,
         fontSize: 25,
         fontWeight: "500",
      },
      cartContainer: {
         backgroundColor: isDark ? "#363537" : "#D4D2D5",
         display: "flex",
         flexDirection: "row",
         borderRadius: 10,
         overflow: "hidden",
         marginTop: 15,
      },
      image: {
         width: 100,
         height: 100,
         objectFit: "cover",
      },
      cartText: {
         color: isDark ? Colors.dark.text : Colors.light.text,
         fontSize: 15,
         fontWeight: "bold",
         marginTop: 5,
         marginLeft: 10,
      },
      touch: {
         borderRadius: 5,
         display: "flex",
         flexDirection: "row",
         justifyContent: "center",
         alignItems: "center",
         width: 23,
         aspectRatio: 1,
         borderWidth: 1,
         borderColor: isDark ? Colors.dark.text : Colors.light.text,
      },
      touchText: {
         color: isDark ? Colors.dark.text : Colors.light.text,
         fontSize: 20,
         fontWeight: "bold",
      },
      touchContainer: {
         display: "flex",
         flexDirection: "row",
         marginLeft: 10,
         marginTop: 15,
         alignItems: "center",
         gap: 5,
      },
      button: {
         backgroundColor: "orange",
         borderRadius: 5,
         paddingHorizontal: 10,
         paddingVertical: 5,
         display: "flex",
         flexDirection: "row",
         justifyContent: "center",
         alignItems: "center",
      },
      alert: {
         backgroundColor: "#969A97",
         justifyContent: "center",
         alignItems: "center",
         paddingVertical: 7,
         borderRadius: 5,
         width: "60%",
         paddingTop: 10,
         paddingBottom: 10,
      },
      alertMain: {
         display: "flex",
         flexDirection: "row",
         gap: 10,
         justifyContent: "center",
         alignItems: "center",
         marginTop: 50,
         zIndex: 1,
      },
   });
