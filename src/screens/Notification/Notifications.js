import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import React, { useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';

{/* dev */} 
import { COLORS, images, imagesDataURL } from "../../constans";

const ios = Platform.OS == 'ios';
const topMargin = ios? '': 'mt-10';

const Notification = (props) => {
    const navigation = useNavigation();

        return (
            <View className="flex-1">
            {/* destination image */}
            <Image style={{ backgroundColor: COLORS.primary, width: wp(100), height: hp(25) }} />
            <StatusBar style={'light'} />
        
            {/* back button */}
            <SafeAreaView className={"flex-row justify-between items-center w-full absolute " + topMargin}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    className="p-2 rounded-full ml-4"
                    style={{ backgroundColor: 'rgba(255,255,255,0.5)' }}
                >
                    <ChevronLeftIcon size={wp(7)} strokeWidth={4} color="white" />
                </TouchableOpacity>
                <View className="flex-row justify-end w-full absolute">
                    <Image source={images.logo_w} style={{ width: wp(20), height: hp(10) }} />
                    <Text style={{ fontSize: wp(7) }} className="font-bold mr-4 text-neutral-700">
                        Sports Camp
                    </Text>
                </View>
            </SafeAreaView>
        
            {/* title & descritpion & booking button */}
            <View style={{ borderTopLeftRadius: 40, borderTopRightRadius: 40 }} className="px-5 flex flex-1 bg-[#FFF9E8] pt-8 -mt-14">
                <ScrollView showsVerticalScrollIndicator={false} className="space-y-4">
                <View className="bg-[#BCD8A6] rounded-3xl items-center">
                    <Text style={{ fontSize: wp(7) }} className="font-bold text-neutral-700">
                        Info Lapangan Yang Dipesan 
                    </Text>
                </View>
                <View className="bg-[#BCD8A6] rounded-3xl items-center">
                    <Text style={{ fontSize: wp(7) }} className="font-bold text-neutral-700">
                        Jam
                    </Text>
                    <Text style={{ fontSize: wp(7) }} className="font-bold text-neutral-700">
                        Lapangan
                    </Text>
                    <Text style={{ fontSize: wp(7) }} className="font-bold text-neutral-700">
                        Tempat
                    </Text>
                    <Text style={{ fontSize: wp(7) }} className="font-bold text-neutral-700">
                        CountDown
                    </Text>
                </View>
                {/* footer */}
                <View className="space-y-20">
                    <View className="mx-25 items-center">
                    <Text style={{ fontSize: wp(1), color: COLORS.white }} className="font-semibold">Akhir halaman</Text>
                    </View>
                </View>
                </ScrollView>
            </View>
            </View>
        );
        };

export default Notification;