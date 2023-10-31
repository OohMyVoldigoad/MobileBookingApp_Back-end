import { View, Text, TouchableOpacity, ScrollView, Image, TextInput, Platform, StyleSheet, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

{/* categories */}
import { categoriesData } from '../constans';
import { sortCategoryData } from '../constans';

const ios = Platform.OS=='ios';
const topMargin = ios? 'mt-3': 'mt-2';


const Feed = () => {
  const [activeSort, setActiveSort] = useState('All');
    return (
        <SafeAreaView className="flex-1 bg-white">
          <ScrollView showsVerticalScrollIndicator={false} className={"space-y-1 "+topMargin}>
              
                {/* avatar */}
                <ImageBackground
                  className="space-y-2 mx-1 mb-2 bg-[#BCD8A6] rounded p-3 pl-1"
                >
                  <View className="mx-5 flex-row justify-between items-center mb-1">
                    <Text style={{ fontSize: wp(6) }} className="font-bold text-neutral-700">Promo</Text>
                  </View>
                </ImageBackground>

                {/* sort */}
                <View className="mx-1 flex-row items-center">
                <Text style={{fontSize: wp(4)}} className="font-semibold text-neutral-700">Pilih jenis coupon</Text>
                </View>
                <View className="flex-row justify-around items-center mx-1 bg-neutral-100 rounded-full p-2 px-4 space-x-2">
                    {
                        sortCategoryData.map((sort, index)=>{
                            let isActive = sort==activeSort;
                            let activeButtonClass = isActive? 'bg-[#BCD8A6] shadow': '';
                            return (
                                <TouchableOpacity onPress={()=> setActiveSort(sort)} key={index} className={`p-3 px-4 rounded-full flex ${activeButtonClass}`}>
                                    <Text className="font-semibold" style={{fontSize: wp(4), color: isActive? 'white': 'rgba(0,0,0,0.6)'}}>{sort}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>

                {/* coupon */}
                <View className="space-y-2 mx-1 mb-4 bg-white rounded-3xl p-3 pl-1">

                  <ScrollView
                    vertical
                    className="space-y-2"
                    showsHorizontalScrollIndicator={false}
                  >
                    {
                        categoriesData.map((cat,index)=>{
                            return (
                                <TouchableOpacity key={index} className="flex items-center space-y-2">
                                    <Image source={cat.image} className="rounded-3xl" style={{width: wp(90), height: wp(40)}} />
                                    <Text className="text-neutral-700 font-medium" style={{fontSize: wp(3)}}>{cat.title}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                  </ScrollView>
                </View>

                {/* footer */}
                <View className="space-y-20">
                  <View className="mx-25 items-center">
                    <Text style={{fontSize: wp(15),color: 'white'}} className="font-semibold">Akhir halaman</Text>
                  </View>
                </View>

          </ScrollView>
        </SafeAreaView>
      )
}

export default Feed
