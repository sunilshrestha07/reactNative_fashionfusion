import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import useDarkMode from "@/hooks/useDarkMode";
import { Colors } from "@/constants/Colors";
import { getReviewInterface } from "@/interface";
import axios from "axios";
import { Image } from "expo-image";
import moment from "moment";
import { FontAwesome } from "@expo/vector-icons";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function Review({ id }: { id: any }) {
   const isDark = useDarkMode();
   const [reviews, setReviews] = useState<getReviewInterface[]>([]);
   const [userRating, setUserRating] = useState(0);
   const [comment, setComment] = useState<string>("");
   const [isSubmitting, setIsSubmitting] = useState(false);
   const currentUser = useSelector(
      (state: RootState) => state.user.currentUser
   );

   //fetching reviews
   const fetchReviews = async () => {
      try {
         const res = await axios.get(
            `https://fashion-fusion-suneel.vercel.app/api/review/${id}`
         );
         if (res.status === 200) {
            setReviews(res.data.reviews);
         }
      } catch (error) {
         console.log("Error fetching the reviews", error);
      }
   };

   useEffect(() => {
      fetchReviews();
   }, []);

   //generate rating stars
   const generateStars = (
      rating: number,
      onPress?: (index: number) => void
   ) => {
      const stars = [];
      for (let i = 0; i < 5; i++) {
         stars.push(
            <TouchableOpacity key={i} onPress={() => onPress && onPress(i + 1)}>
               <FontAwesome
                  name={i < rating ? "star" : "star-o"}
                  size={22}
                  color="orange"
               />
            </TouchableOpacity>
         );
      }
      return stars;
   };

   //handel review submit
   const handelReviewSubmit = async () => {
      setIsSubmitting(true);
      const formData = {
         comment,
         userImage:currentUser?.avatar,
         rating: userRating,
         userId: currentUser?._id,
         userName: currentUser?.userName,
         postId: id,
      };
      try {
         const res = await axios.post("https://fashion-fusion-suneel.vercel.app/api/review",formData);
         if (res.status === 200) {
            setIsSubmitting(false);
            fetchReviews();
            setComment("")
            setUserRating(0)
         }
      } catch (error) {
         setIsSubmitting(false);
         console.log("Error fetching the reviews", error);
      }
   };

   //handel delete review
   const handelReviewDelete = async (id: string) => {
      try {
         const res = await axios.delete(
            `https://fashion-fusion-suneel.vercel.app/api/review/${id}`
         );
         if (res.status === 200) {
            fetchReviews();
         }
      } catch (error) {
         console.log("Error fetching the reviews", error);
      }
   };

   return (
      <View>
         {/* submit reviews */}
         <View style={styles(isDark).reviewSubmitContainer}>
            <Text style={styles(isDark).reviewHeader}>Give review</Text>
            <View style={styles(isDark).star}>
               {generateStars(userRating, setUserRating)}
            </View>
            <View>
               <TextInput
                  style={styles(isDark).input}
                  placeholder="Write a review"
                  value={comment}
                  onChangeText={(text) => setComment(text)}
               />
            </View>
            <View style={{width:'35%'}}>
               <TouchableOpacity onPress={handelReviewSubmit} >
                  <Text>
                     <View style={styles(isDark).submit} >
                        {isSubmitting ? (
                           <ActivityIndicator size="small" color="black" />
                        ):(

                           <Text style={styles(isDark).submitText}>Submit</Text>
                        )}
                     </View>
                  </Text>
               </TouchableOpacity>
            </View>
         </View>

         {/* reviews */}
         <Text style={styles(isDark).reviewHeader}>Reviews</Text>
         <View>
            {reviews.map((review) => (
               <View style={styles(isDark).container} key={review._id}>
                  <View style={styles(isDark).profileBox}>
                     <View style={styles(isDark).image}>
                        {review.userImage ? (
                           <Image
                           style={styles(isDark).image}
                           source={{ uri: review.userImage }}
                        />
                        ):(
                           <View style={[styles(isDark).image,styles(isDark).imageALt]}>
                              <Text style={{fontSize:30}}>{review.userName.slice(0,2)}</Text>
                           </View>
                        )}
                     </View>
                     <View>
                        <Text
                           style={[styles(isDark).text, styles(isDark).name]}
                        >
                           {review.userName}
                        </Text>
                        <Text
                           style={[styles(isDark).text, styles(isDark).date]}
                        >
                           {moment(review.createdAt).format("MMM Do YY")}
                        </Text>
                     </View>
                  </View>
                  <View style={styles(isDark).star}>
                     {generateStars(review.rating)}
                  </View>
                  <Text
                     style={[styles(isDark).text, styles(isDark).reviewText]}
                  >
                     {review.comment}
                  </Text>
                  <View style={{width:'30%'}}>
                     {review.userId === currentUser?._id && (
                        <TouchableOpacity onPress={()=>handelReviewDelete(review._id)}>
                        <Text>
                           <View >
                              <Text style={[styles(isDark).text,{color:'red',marginBottom:10,fontSize:16}]}>Delete</Text>
                           </View>
                        </Text>
                     </TouchableOpacity>
                     )}
                  </View>
               </View>
            ))}
         </View>
      </View>
   );
}

const styles = (isDark: any) =>
   StyleSheet.create({
      container: {
         marginVertical: 5,
         borderRadius: 10,
         backgroundColor: isDark ? "#363537" : "#D4D2D5",
         paddingHorizontal: 10,
      },
      reviewHeader: {
         fontSize: 20,
         fontWeight: "bold",
         color: isDark ? Colors.dark.text : Colors.light.text,
         marginTop: 10,
      },
      text: {
         color: isDark ? Colors.dark.text : Colors.light.text,
      },
      name: {
         fontWeight: "600",
         fontSize: 16,
      },
      profileBox: {
         display: "flex",
         flexDirection: "row",
         alignItems: "center",
         gap: 15,
         marginVertical: 10,
      },
      image: {
         width: 50,
         height: 50,
         borderRadius: 50,
         overflow: "hidden",
      },
      date: {
         fontSize: 12,
      },
      star: {
         display: "flex",
         flexDirection: "row",
         alignItems: "center",
         gap: 5,
         marginTop: 10,
      },
      reviewText: {
         marginVertical: 10,
      },
      input: {
         width: "100%",
         height: 150,
         paddingHorizontal: 10,
         paddingVertical: 10,
         textAlignVertical: "top",
         color: isDark ? Colors.dark.text : Colors.light.text,
         borderRadius: 5,
         borderWidth: 1,
         borderColor: isDark ? "gray" : "black",
         marginVertical: 10,
      },
      submit: {
         color: isDark ? Colors.dark.text : Colors.light.text,
         backgroundColor: "orange",
         paddingVertical: 8,
         paddingHorizontal: 35,
      },
      submitText: {
         fontWeight: "600",
      },
      reviewSubmitContainer: {
         marginVertical: 10,
      },
      imageALt:{
         backgroundColor:"#42CAFD",
         overflow:'hidden',
         display:'flex',
         justifyContent:'center',
         alignItems:'center',
         borderRadius:50
      }
   });
