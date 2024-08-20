import {
   StyleSheet,
   Text,
   View,
   SafeAreaView,
   StatusBar,
   ActivityIndicator,
   ScrollView,
   TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import axios from "axios";
import { AddToCart, getDressInterface, getReviewInterface } from "@/interface";
import { Image } from "expo-image";
import useDarkMode from "@/hooks/useDarkMode";
import { Colors } from "@/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { addItemToCart } from "@/redux/cartSlice";
import Review from "@/components/Review";

export default function Product() {
   const navigation = useNavigation();
   const { id } = useLocalSearchParams();
   const [dress, setDress] = useState<getDressInterface>();
   const isDark = useDarkMode();
   const [isLoading, setIsLoading] = useState<boolean>(true);
   const dispatch = useDispatch();
   const [isAlertActive, setIsAlertActive] = useState<boolean>(false);
   


   // Fetch data
   const fetchData = async () => {
      setIsLoading(true);
      try {
         const res = await axios.get(
            `https://fashion-fusion-suneel.vercel.app/api/dress/${id}`
         );
         if (res.status === 200) {
            setDress(res.data.dress);
            setIsLoading(false);
         }
      } catch (error) {
         setIsLoading(false);
         console.log("Error fetching data", error);
      }
   };


   useEffect(() => {
      fetchData();
   }, []);

   //handel add to cart
   const handelAddToCart = (dress: any) => {
      setIsAlertActive(true);
      dispatch(addItemToCart(dress));
   };

   //handel alert shown time
   useEffect(() => {
      const timer = setTimeout(() => {
         setIsAlertActive(false);
      }, 700);

      return () => clearTimeout(timer);
   }, [isAlertActive]);

   return (
      <SafeAreaView style={[styles(isDark).safeArea]}>
         <StatusBar
            barStyle="light-content"
            backgroundColor="transparent"
            translucent
         />
         {isLoading ? (
            <View style={styles(isDark).loadingContainer}>
               <ActivityIndicator size="large" color="orange" />
            </View>
         ) : (
            <ScrollView style={styles(isDark).container}>
               <View style={styles(isDark).imageBox}>
                  <Image
                     source={{ uri: dress?.image }}
                     style={styles(isDark).image}
                  />
               </View>
               <View style={styles(isDark).textBox}>
                  <Text style={[styles(isDark).name, styles(isDark).text]}>
                     {dress?.name}
                  </Text>
                  <View
                     style={{
                        display: "flex",
                        flexDirection: "row-reverse",
                        justifyContent: "space-between",
                        alignItems: "center",
                     }}
                  >
                     <Text style={[styles(isDark).price, styles(isDark).text]}>
                        Rs: {dress?.price}
                     </Text>
                     <View
                        style={{
                           display: "flex",
                           flexDirection: "row",
                           gap: 5,
                           alignItems: "center",
                        }}
                     >
                        <Text style={[styles(isDark).text, { fontSize: 20 }]}>
                           {dress?.rating}
                        </Text>
                        <FontAwesome name="star" size={20} color="orange" />
                     </View>
                  </View>
                  <Text
                     style={[styles(isDark).description, styles(isDark).text]}
                  >
                     {dress?.description}
                  </Text>

                  <View style={{ marginTop: 20 }}>
                     <View style={styles(isDark).cateogryHeader}>
                        <View style={{ width: "48%" }}>
                           <TouchableOpacity
                              onPress={() => handelAddToCart(dress)}
                           >
                              <View style={styles(isDark).category}>
                                 <Text style={{ fontSize: 17 }}>
                                    Add to cart
                                 </Text>
                              </View>
                           </TouchableOpacity>
                        </View>
                        <View style={{ width: "48%" }}>
                           <TouchableOpacity>
                              <View style={styles(isDark).category}>
                                 <Text style={{ fontSize: 17 }}>Buy now</Text>
                              </View>
                           </TouchableOpacity>
                        </View>
                     </View>
                  </View>

                  {/* review section */}
                  <View style={styles(isDark).reviewBox}>
                     <Review id={id} />
                  </View>
               </View>

               {/* added to cart alert */}
               {isAlertActive && (
                  <View style={styles(isDark).alertMain}>
                     <View style={styles(isDark).alert}>
                        <FontAwesome
                           name="check-circle"
                           size={24}
                           color="green"
                        />
                        <Text style={{ fontWeight: "bold" }}>
                           Added to cart
                        </Text>
                     </View>
                  </View>
               )}
            </ScrollView>
         )}
      </SafeAreaView>
   );
}

const styles = (isDark: any) =>
   StyleSheet.create({
      safeArea: {
         flex: 1,
         backgroundColor: isDark
            ? Colors.dark.background
            : Colors.light.background,
      },
      container: {
         flex: 1,
      },
      loadingContainer: {
         flex: 1,
         justifyContent: "center",
         alignItems: "center",
      },
      imageBox: {
         width: "100%",
         aspectRatio: 4 / 6,
      },
      image: {
         width: "100%",
         height: "100%",
         objectFit: "cover",
      },
      textBox: {
         backgroundColor: isDark
            ? Colors.dark.background
            : Colors.light.background,
         padding: 20,
         borderRadius: 30,
         marginTop: -40,
         overflow: "hidden",
      },
      name: {
         fontSize: 24,
         fontWeight: "bold",
         color: "white",
      },
      price: {
         fontSize: 20,
         color: "white",
         marginTop: 10,
      },
      description: {
         fontSize: 16,
         color: "white",
         marginTop: 10,
      },
      text: {
         color: isDark ? Colors.dark.text : Colors.light.text,
      },
      cateogryHeader: {
         width: "100%",
         display: "flex",
         flexDirection: "row",
         justifyContent: "space-between",
         alignItems: "center",
         gap: 8,
         // marginVertical: 10,
      },
      category: {
         backgroundColor: "orange",
         justifyContent: "center",
         alignItems: "center",
         paddingVertical: 7,
         borderRadius: 5,
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
         position: "absolute",
         top: 0,
         left: 0,
         right: 0,
         bottom: 0,
         zIndex: 1,
         backgroundColor: "rgba(0,0,0,0.5)",
      },
      reviewBox: {
         marginTop: 40,
      }
   });
