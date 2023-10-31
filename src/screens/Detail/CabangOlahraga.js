import { View, Text, Image, TouchableOpacity, ScrollView, TextInput, Platform } from 'react-native'
import React, { useState } from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { ClockIcon, HeartIcon, MapPinIcon, SunIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';

{/* dev */}
import { theme } from '../../theme';
import { categoriesData } from '../../constans';

const ios = Platform.OS == 'ios';
const topMargin = ios? '': 'mt-10';

export default function CabangOlahraga(props) {
    const item = props.route.params;
    const navigation = useNavigation();
    const [isFavourite, toggleFavourite] = useState(false);

  return (
    <View className="bg-white flex-1">
        {/* destination image */}
        <Image source={item.image} style={{width: wp(100), height: hp(25)}} />
        <StatusBar style={'light'} />

        {/* back button */}
        <SafeAreaView className={"flex-row justify-between items-center w-full absolute " + topMargin}>
            <TouchableOpacity
                onPress={()=> navigation.goBack()}
                className="p-2 rounded-full ml-4"
                style={{backgroundColor: 'rgba(255,255,255,0.5)'}}
            >
                <ChevronLeftIcon size={wp(7)} strokeWidth={4} color="white" />
            </TouchableOpacity>
            <Text style={{fontSize: wp(7)}} className="font-bold mr-4 text-neutral-700">
                {item?.title}
            </Text>
        </SafeAreaView>

        {/* title & descritpion & booking button */}
        <View style={{borderTopLeftRadius: 40, borderTopRightRadius: 40}} className="px-5 flex flex-1 justify-between bg-[#FFF9E8] pt-8 -mt-14">
            <ScrollView showsVerticalScrollIndicator={false} className="space-y-5">
                <View className="mx-25 mb-4">
                    <View className="flex-row items-center bg-neutral-100 rounded-full bg-white p-4 space-x-2 pl-8">
                        <MagnifyingGlassIcon size={20} strokeWidth={3} color="gray" />
                            <TextInput
                            placeholder='Search destination  '
                            placeholderTextColor={'gray'}
                            className="text-base mb-1 pl-1 tracking-wider"
                        />
                    </View>
                </View>
                <View className="mx-2 flex-row justify-between items-center">
                    <TouchableOpacity>
                            <Text style={{fontSize: wp(4)}} className="bg-[#BCD8A6]">Urutkan</Text>
                    </TouchableOpacity>
                </View>

                {/* Lapangan */}
                <View className="items-center space-y-5 mx-1 mb-4 rounded-3xl p-3 pl-1">
                <ScrollView
                    vertical
                    contentContainerStyle={{paddingVertical: 2}}
                    className="space-x-1"
                    showsHorizontalScrollIndicator={false}
                >
                    {
                        categoriesData.map((cat,index)=>{
                            return (
                                <TouchableOpacity key={index} className="flex items-center space-y-2">
                                    <Image source={cat.image} className="rounded-3xl" style={{width: wp(80), height: wp(50)}} />
                                    <Text className="text-neutral-700 font-medium" style={{fontSize: wp(3)}}>{cat.title}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                  </ScrollView>
                </View>
            </ScrollView>
        </View>
    </View>
  )
}