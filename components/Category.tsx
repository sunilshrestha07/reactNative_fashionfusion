import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { router, useRouter } from 'expo-router'
import useDarkMode from '@/hooks/useDarkMode'

export default function Category() {
   //  const router = useRouter()
    const isDark = useDarkMode()
  return (
    <View>
      <View>
               <Text
                  style={[styles(isDark).text, { marginTop: 15, fontSize: 17 }]} >Category</Text>
               <View style={styles(isDark).cateogryHeader}>
                  <View style={{width:'48%'}}>
                     <TouchableOpacity onPress={()=>router.push('../screens/male')}>
                        <View  style={styles(isDark).category}>
                           <Text style={{ fontSize: 17 }}>Male</Text>
                        </View>
                     </TouchableOpacity>
                  </View>
                  <View style={{width:'48%'}}>
                     <TouchableOpacity onPress={()=>router.push('../screens/female')}>
                        <View style={styles(isDark).category}>
                           <Text style={{ fontSize: 17 }}>Female</Text>
                        </View>
                     </TouchableOpacity>
                  </View>
               </View>
            </View>
    </View>
  )
}

const styles= (isDark:any) => StyleSheet.create({
     text: {
        color: isDark ? Colors.dark.text : Colors.light.text,
        fontWeight: "bold",
        fontFamily: "sans-serif",
     },
     cateogryHeader: {
        width:'100%',
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems:'center',
        gap: 8,
        marginVertical: 10,
     },
     category: {
        backgroundColor: "orange",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 7,
        borderRadius: 5,
     },
})