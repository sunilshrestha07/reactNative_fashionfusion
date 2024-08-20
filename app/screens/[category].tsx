import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "@/constants/Colors";
import useDarkMode from "@/hooks/useDarkMode";
import { getDressInterface } from "@/interface";
import axios from "axios";
import { Image } from "expo-image";
import { FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";

export default function Category() {
  const {category}=useLocalSearchParams()
   const isDark = useDarkMode();
   const [data, setData] = useState<getDressInterface[]>([]);
   const numColumns = 2;
  //  const [key, setKey] = useState<string>(`numColumns-${numColumns}`);
   const router = useRouter()
   const navigation = useNavigation()

   //fetch data
   const fetchData = async () => {
      try {
         const res = await axios.get(
            "https://fashion-fusion-suneel.vercel.app/api/dress"
         );
         if (res.status === 200) {
          const filteredData = res.data.dress.filter(
             (item: any) => item.category === category
          );
          setData(filteredData);
       }
      } catch (error) {
         console.log("Error fetching data", error);
      }
   };

   useEffect(() => {
      fetchData();
   }, []);

  //  showing the headings
  useEffect(() => {
    navigation.setOptions({
       headerShown: true,
       headerTitle: category === "male" ? "Male" : "Female",
       headerStyle: {
          backgroundColor: isDark ? Colors.dark.background : Colors.light.background, 

       },
       headerTintColor: isDark ? Colors.dark.text : Colors.light.text,
    });
 });

   //even numbers
   const evenData = data.slice(0, data.length - (data.length % 2));

   //render item
   const renderItem = ({ item }: { item: getDressInterface }) => (
      <View style={{ flex: 1,marginRight:10, marginBottom: 10 }}>
         <View style={{ backgroundColor: "#EEF0F2", width: "100%" ,overflow:'hidden', borderRadius:10,padding:5}}>
            <TouchableOpacity onPress={()=>router.push(`../screens/Product/${item._id}`)}>             
               <View style={styles(isDark).imageBox}>
                <Image
                    source={{ uri: item.image }}
                    style={[styles(isDark).image, { resizeMode: "cover" }]}
                />
              </View>
            </TouchableOpacity>
            <Text style={[styles(isDark).ProductText,{fontWeight:'bold'}]} numberOfLines={1} ellipsizeMode="tail">{item.name}</Text>
            <View style={{ flexDirection: "row",justifyContent:'space-between', alignItems: "center" }}>
            <View style={{ flexDirection: "row", alignItems: "center" ,gap:5}}>
                <Text >{item.price}</Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" ,gap:5}}>
                <Text >{item.rating}</Text>
                <FontAwesome name="star" size={15} color="black" />
              </View>
            </View>
         </View>
      </View>
   );
   return (
      <View style={{paddingHorizontal:10,paddingTop:10,backgroundColor:isDark?Colors.dark.background:Colors.light.background}}>
         <FlatList
            // key={key}
            data={evenData}
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            numColumns={numColumns}
         />
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
