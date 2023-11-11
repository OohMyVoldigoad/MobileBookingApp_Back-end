import { View, Text, Image, TouchableOpacity, ScrollView, TextInput, Platform } from 'react-native'
import React, { useState, useEffect } from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

{/* dev */}
import { COLORS, Storage, Api } from '../../constans';

const ios = Platform.OS == 'ios';
const topMargin = ios? '': 'mt-10';

export default function CabangOlahraga(props) {
const item = props.route.params;
const navigation = useNavigation();
const [Lapangan, setLapangan] = useState([])

useEffect(() => {
    const fetchData = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            const jenis = item?.title
            if (token){
                const response = await Api.get('/lapangan/jenis/' + jenis, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setLapangan(response.data.dataLapangan);
                console.log(response.data.notifikasi)
            }
        } catch (error) {
            console.error("Terjadi kesalahan saat mengambil data:", error);
        }
    };

    fetchData();
}, []);

return (
<View className="bg-white flex-1">
    {/* destination image */}
    <Image source={item.image} style={{width: wp(100), height: hp(30), justifyContent: "center"}} />
    <StatusBar style={'dark'} />

    {/* back button */}
    <SafeAreaView className={"flex-row justify-between items-center w-full absolute " + topMargin}>
        <TouchableOpacity
            onPress={()=> navigation.goBack()}
            className="p-2 rounded-full ml-4 mb-4"
            style={{backgroundColor: 'rgba(255,255,255,0.5)'}}
        >
            <ChevronLeftIcon size={wp(7)} strokeWidth={4} color="white" />
        </TouchableOpacity>
        <Text style={{fontSize: wp(7), color: COLORS.white}} className="font-bold mr-4 mb-4 text-neutral-700">
            {item?.title}
        </Text>
    </SafeAreaView>

    {/* title & descritpion & booking button */}
    <View style={{borderTopLeftRadius: 40, borderTopRightRadius: 40}} className="px-5 flex flex-1 justify-between bg-[#FFF9E8] pt-8 -mt-14">
        <ScrollView showsVerticalScrollIndicator={false} className="space-y-5">
            <View className="mx-25">
                <View className="flex-row items-center bg-neutral-100 rounded-full bg-white p-4 space-x-2 pl-8">
                    <MagnifyingGlassIcon size={20} strokeWidth={3} color="gray" />
                        <TextInput
                        placeholder='Search destination  '
                        placeholderTextColor={'gray'}
                        className="text-base mb-1 pl-1 tracking-wider"
                    />
                </View>
            </View>

            {/* Lapangan */}
            <View className="items-center space-y-5 mx-1 mb-4 rounded-3xl p-3 pl-1">
            <ScrollView
                vertical
                contentContainerStyle={{paddingVertical: 2}}
                className="space-y-2"
                showsHorizontalScrollIndicator={false}
            >
                <View className="items-center">
                {
                    Lapangan && Lapangan.map((cat,index) => {
                        return (
                            <TouchableOpacity
                                key={index}
                                onPress={()=> navigation.navigate('Lapangan', {...cat})}
                                style={{width: wp(82), height: wp(40)}}
                                className="flex justify-end relative p-4 py-6 space-y-2 mb-1">
                                    <Image
                                        source={{ uri: Storage.Storage + cat.foto_lapangan }}
                                        style={{width: wp(82), height: wp(40), borderRadius: 25}}
                                        className="absolute"
                                    />
                    
                                <LinearGradient
                                    colors={['transparent', 'rgba(0,0,0,0.8)']}
                                    style={{width: wp(82), height: hp(10), borderBottomLeftRadius: 25, borderBottomRightRadius: 25}}
                                    start={{x: 0.5, y: 0}}
                                    end={{x: 0.5, y: 1}}
                                    className="absolute bottom-0"
                                />
                    
                                <Text style={{fontSize: wp(4)}} className="text-white font-semibold">{cat.nama_lapangan}</Text>
                                <View className="flex-row justify-between">
                                <Text style={{fontSize: wp(3)}} className="text-white font-semibold">{cat.penyedia.nama_bisnis}, {cat.penyedia.alamat}</Text>
                                <Text style={{fontSize: wp(3)}} className="text-white font-semibold">{cat.penyedia.jam_buka} - {cat.penyedia.jam_tutup}</Text>
                                </View>
                    
                            </TouchableOpacity>
                        )
                    })
                }
                </View>
                </ScrollView>
            </View>
        </ScrollView>
    </View>
</View>
)
}