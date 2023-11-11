import { View, Text, TouchableOpacity, ScrollView, Image, TextInput, Platform, StyleSheet, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native';

{/* categories */}
import { categoriesData } from '../../constans';
import { theme } from '../../theme';

const ios = Platform.OS=='ios';
const topMargin = ios? 'mt-3': 'mt-2';


const Search = () => {
    const navigation = useNavigation();
    return (
        <SafeAreaView className="flex-1 bg-white">
          <ScrollView showsVerticalScrollIndicator={false} className={"space-y-1 "+topMargin}>

                {/* seacrh bar */}
                <ImageBackground
                  className="space-y-2 mx-1 mb-4 bg-[#BCD8A6] rounded-3xl p-3 pl-1"
                >
                <TouchableOpacity
                    onPress={()=> navigation.goBack()}
                    className="flex p-2 rounded-full ml-4 mb-4"
                    style={{backgroundColor: 'rgba(255,255,255,0.5)'}}
                >
                    <ChevronLeftIcon size={wp(7)} strokeWidth={4} color="white" />
                </TouchableOpacity>
                <View className="mx-5 mb-4">
                    <View className="flex-row items-center bg-neutral-100 rounded-full p-4 space-x-2 pl-6">
                        <MagnifyingGlassIcon size={20} strokeWidth={3} color="gray" />
                        <TextInput
                        placeholder='Search destination'
                        placeholderTextColor={'gray'}
                        className="flex-1 text-base mb-1 pl-1 tracking-wider"
                        />
                    </View>
                </View>
                </ImageBackground>

                {/* Sort */}
                <View className="space-y-2 mx-1 mb-4 bg-white rounded-3xl p-3 pl-1">
                  <View className="mx-2 flex-row justify-between items-center">
                    <Text style={{fontSize: wp(4)}} className="font-semibold text-neutral-700">Rekomendasi lapangan terdekat</Text>
                    <TouchableOpacity>
                        <Text style={{fontSize: wp(4), color: theme.text}}>Lihat Semua</Text>
                    </TouchableOpacity>
                  </View>
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

export default Search
