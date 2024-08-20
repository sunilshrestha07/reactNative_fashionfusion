import React, { useRef, useState, useEffect } from "react";
import { FlatList, View, Image, Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

const data = [
   { id: '1', image: require("../assets/images/native1.png") },
   { id: '2', image: require("../assets/images/native2.png") },
   { id: '3', image: require("../assets/images/native3.png") },
   { id: '4', image: require("../assets/images/native4.png") },
];

export default function Carousel() {
   const flatListRef = useRef<FlatList<any>>(null);
   const [currentIndex, setCurrentIndex] = useState(0);

   useEffect(() => {
      const interval = setInterval(() => {
         const nextIndex = (currentIndex + 1) % data.length;
         setCurrentIndex(nextIndex);
         flatListRef.current?.scrollToIndex({
            index: nextIndex,
            animated: true,
         });
      }, 4000);

      return () => clearInterval(interval);
   }, [currentIndex]);

   const renderItem = ({ item }: any) => (
      <View style={styles.imageContainer}>
         <Image source={item.image} style={styles.image} />
      </View>
   );

   return (
      <FlatList
         ref={flatListRef}
         data={data}
         renderItem={renderItem}
         keyExtractor={(item) => item.id}
         horizontal
         showsHorizontalScrollIndicator={false}
         pagingEnabled
         snapToAlignment="center"
         decelerationRate="fast"
         snapToInterval={width}
         onScrollToIndexFailed={(info) => {
            flatListRef.current?.scrollToOffset({ offset: info.averageItemLength * info.index, animated: true });
         }}
      />
   );
}

const styles = StyleSheet.create({
   imageContainer: {
      width,
      justifyContent: "center",
      alignItems: "center",
      marginVertical: 10,
      marginLeft: -19.5,
   },
   image: {
      width: "90%",
      height: 120,
      borderRadius: 10,
      objectFit: "fill",
   },
});
