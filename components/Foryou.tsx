import {
   ActivityIndicator,
   FlatList,
   StyleSheet,
   Text,
   View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "@/constants/Colors";
import useDarkMode from "@/hooks/useDarkMode";
import { getDressInterface } from "@/interface";
import axios from "axios";
import { Image } from "expo-image";
import { FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRouter } from "expo-router";

export default function Foryou() {
   const isDark = useDarkMode();
   const [data, setData] = useState<getDressInterface[]>([]);
   const numColumns = 2;
   const [key, setKey] = useState<string>(`numColumns-${numColumns}`);
   const router = useRouter();
   const [isLoading, setIsLoading] = useState<boolean>(false);

   //fetch data
   const fetchData = async () => {
      setIsLoading(true);
      try {
         const res = await axios.get(
            "https://fashion-fusion-suneel.vercel.app/api/dress"
         );
         if (res.status === 200) {
            const saleItems = res.data.dress;
            for (let i = saleItems.length - 1; i > 0; i--) {
               const j = Math.floor(Math.random() * (i + 1));
               [saleItems[i], saleItems[j]] = [saleItems[j], saleItems[i]];
            }
            setData(saleItems);
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

   // Filter only even-indexed items
   const filteredData = data.filter((_, index) => index % 2 === 1);

   //render item
   const renderItem = ({ item }: { item: getDressInterface }) => (
      <View style={{ flex: 1, marginRight: 10, marginBottom: 10 }}>
         <View
            style={{
               backgroundColor: "#EEF0F2",
               width: "100%",
               overflow: "hidden",
               borderRadius: 10,
               padding: 5,
            }}
         >
            <TouchableOpacity
               onPress={() => router.push(`../screens/Product/${item._id}`)}
            >
               <View style={styles(isDark).imageBox}>
                  <Image
                     source={{ uri: item.image }}
                     style={[styles(isDark).image, { resizeMode: "cover" }]}
                  />
               </View>
            </TouchableOpacity>
            <Text
               style={[styles(isDark).ProductText, { fontWeight: "bold" }]}
               numberOfLines={1}
               ellipsizeMode="tail"
            >
               {item.name}
            </Text>
            <View
               style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
               }}
            >
               <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
               >
                  <Text>{item.price}</Text>
               </View>
               <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
               >
                  <Text>{item.rating}</Text>
                  <FontAwesome name="star" size={15} color="black" />
               </View>
            </View>
         </View>
      </View>
   );
   return (
      <View >
         <View>
            <Text
               style={[
                  styles(isDark).text,
                  { marginVertical: 5, marginBottom: 10 },
               ]}
            >
               Foryou
            </Text>
            {isLoading ? (
               <View
                  style={{
                     flex: 1,
                     justifyContent: "center",
                     alignItems: "center",
                     marginTop: 100,
                  }}
               >
                  <ActivityIndicator
                     size="large"
                     animating={isLoading}
                     color="orange"
                  />
               </View>
            ) : (
               <View>
                  <FlatList
                     // key={key}
                     data={filteredData}
                     showsVerticalScrollIndicator={false}
                     renderItem={renderItem}
                     keyExtractor={(item) => item._id}
                     numColumns={numColumns}
                  />
               </View>
            )}
         </View>
      </View>
   );
}

const styles = (isDark: any) =>
   StyleSheet.create({
      text: {
         color: isDark ? Colors.dark.text : Colors.light.text,
         fontWeight: "bold",
         fontFamily: "sans-serif",
         fontSize: 17,
         marginBottom: 5,
      },
      ProductText: {
         fontWeight: "300",
         fontFamily: "sans-serif",
         fontSize: 14,
         marginBottom: 5,
      },
      image: {
         width: "100%",
         aspectRatio: "1/1",
      },
      imageBox: {
         width: "100%",
         aspectRatio: "1/1",
         flex: 1,
         objectFit: "cover",
         borderColor: isDark ? Colors.light.background : Colors.dark.background,
         overflow: "hidden",
         borderRadius: 10,
      },
   });
