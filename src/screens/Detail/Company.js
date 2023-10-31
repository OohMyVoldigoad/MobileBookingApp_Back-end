import { View, Text, Image, TouchableOpacity, ScrollView, TextInput, Platform, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon, ShareIcon, StarIcon, ClockIcon, Bars3Icon, MapPinIcon, PaperAirplaneIcon} from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import MapView from 'react-native-maps';

{/* dev */}
import { COLORS,FONTS } from '../../constans';
import DotsView from '../../components/DotsView';

const ios = Platform.OS == 'ios';
const topMargin = ios? '': 'mt-10';

export default function Company(props) {
    const item = props.route.params;
    const navigation = useNavigation();
    const [isFavourite, toggleFavourite] = useState(false);
    const hasTwoOperationalHours = item.operasional && item.operasional.includes('&&');
    const [starRating, setStarRating] = useState(null);
    
return (
    <View className="bg-white flex-1">
        {/* destination image */}
        <Image source={item?.image} style={{width: wp(100), height: hp(25)}} />
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
            <ScrollView showsVerticalScrollIndicator={false} className="space-y-1">
                <View
                    className="space-y-1 mx-1 mb-4 bg-[#BCD8A6] rounded-3xl p-1 pl-1"
                >
                    <Image source={item.image} style={{width: wp(84), height: hp(25)}} className="flex mx-1 mb-4 bg-[#BCD8A6] rounded-3xl p-1 pl-1"/>
                    <View
                        style={{
                            alignItems: 'center',
                        }}
                    >
                        <DotsView />
                    </View>
                    <View className="flex-row justify-between items-center p-1 py-1 mb-1">
                        <Text style={{fontSize: wp(5)}} className="font-bold text-neutral-700">
                            {item?.title}
                        </Text>
                        <View className="flex-row justify-end items-center p-1 py-1 mb-1">
                            <TouchableOpacity onPress={()=> toggleFavourite(!isFavourite)} style={{backgroundColor: 'rgba(255,255,255,0.4)'}} className="p-2 rounded-full ml-4">
                                <HeartIcon size={wp(5)} color={isFavourite? "red": "white"} />
                            </TouchableOpacity>
                            <TouchableOpacity style={{backgroundColor: 'rgba(255,255,255,0.4)'}} className="p-2 rounded-full ml-2">
                                <ShareIcon size={wp(5)} color={"white"} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View className="justify-start flex-row">
                        <StarIcon size={wp(5)} color={"yellow"} />
                        <Text style={{fontSize: wp(5)}} className="font-bold text-neutral-700">
                            {item?.rating}, {item?.place}
                        </Text>
                    </View>

                    <View className="justify-between items-baseliine">
                        <Text style={{fontSize: wp(5)}} className="font-bold text-sans">
                            Jenis lapangan :  {item?.jenis}
                        </Text>
                    </View>
                    
                    <View className="justify-between items-baseline" style={{ marginBottom: 7 }} >
                        <Text style={{fontSize: wp(4)}} className="text-sans-700">
                            Keterangan : {item?.longDescription}
                        </Text>
                    </View>
                </View>

                <View
                    className="space-y-1 mx-1 mb-4 bg-[#BCD8A6] rounded-3xl p-1 pl-1"
                >
                    <View
                        style={{
                            alignItems: 'center',
                        }}
                    >
                    </View>
                    <View className="flex-row justify-between items-center p-1 py-1 mb-1">
                        <Text style={{fontSize: wp(5)}} className="font-bold text-neutral-700">
                            Jam Operasional
                        </Text>
                        <View className="flex-row justify-end items-center p-1 py-1 mb-1">
                            <ClockIcon size={wp(5)} color={"white"} />
                        </View>
                    </View>
                    
                    <View>
                        {/* Informasi lainnya */}
                        {hasTwoOperationalHours ? (
                            <>
                                <View className="justify-between flex-row" style={{ marginBottom: 7 }}>
                                    <Text style={{ fontSize: wp(4) }} className="text-sans-700">
                                        Senin - Jum'at :
                                    </Text>
                                    <Text style={{ fontSize: wp(4) }} className="text-sans-700">
                                        {item.operasional.split('&&')[0]}
                                    </Text>
                                </View>
                                <View className="justify-between flex-row" style={{ marginBottom: 7 }}>
                                    <Text style={{ fontSize: wp(4) }} className="text-sans-700">
                                        Sabtu - Minggu :
                                    </Text>
                                    <Text style={{ fontSize: wp(4) }} className="text-sans-700">
                                        {item.operasional.split('&&')[1]}
                                    </Text>
                                </View>
                            </>
                        ) : (
                            <View className="justify-between flex-row" style={{ marginBottom: 7 }}>
                                <Text style={{ fontSize: wp(4) }} className="text-sans-700">
                                    Senin - Minggu :
                                </Text>
                                <Text style={{ fontSize: wp(4) }} className="text-sans-700">
                                    {item.operasional}
                                </Text>
                            </View>
                        )}
                    </View>
                </View>

                <View
                    className="space-y-1 mx-1 mb-4 bg-[#BCD8A6] rounded-3xl p-1 pl-1"
                >
                    <View
                        style={{
                            alignItems: 'center',
                        }}
                    >
                    </View>
                    <View className="flex-row justify-between items-center p-1 py-1 mb-1">
                        <Text style={{fontSize: wp(5)}} className="font-bold text-neutral-700">
                            Fasilitas
                        </Text>
                        <View className="flex-row justify-end items-center p-1 py-1 mb-1">
                            <Bars3Icon size={wp(5)} color={"white"} />
                        </View>
                    </View>
                    
                    <View className="flex-row" style={{ marginBottom: 7 }}>
                        <FontAwesome5
                            name=""
                            size={24}
                            color={"white"}
                        />
                        <Text style={{ fontSize: wp(4) }} className="text-sans-700">
                            : 
                        </Text>
                    </View>
                </View>

                <View
                    className="space-y-1 mx-1 mb-4 bg-[#BCD8A6] rounded-3xl p-1 pl-1"
                >
                    <View
                        style={{
                            alignItems: 'center',
                        }}
                    >
                    </View>
                    <View className="flex-row justify-between items-center p-1 py-1 mb-1">
                        <Text style={{fontSize: wp(5)}} className="font-bold text-neutral-700">
                            Lokasi
                        </Text>
                        <View className="flex-row justify-end items-center p-1 py-1 mb-1">
                            <MapPinIcon size={wp(5)} color={"white"} />
                        </View>
                    </View>
                    
                    <View className="flex-row" style={{ marginBottom: 7 }}>
                        <Text style={{ fontSize: wp(4) }} className="text-sans-700">
                            {item.jalan}
                        </Text>
                    </View>
                    <View className="flex-row" style={{ marginBottom: 7 }}>
                        <MapPinIcon size={wp(5)} color={"white"} />
                        <Text style={{ fontSize: wp(4) }} className="text-sans-700">
                            {item.jarak}
                        </Text>
                    </View>
                    <View className="flex-row items-center" style={{ marginBottom: 7}}>
                        <Text style={{ fontSize: wp(5) }} className="text-sans-700">
                            Petunjuk Jalan
                        </Text>
                    </View>
                    <View className="flex-row items-center rounded-3xl" style={{ marginBottom: 7}} >
                        <MapView style= {{width: 350,height: 250}}/>
                    </View>
                </View>

                <View
                    className="space-y-1 mx-1 mb-1 bg-[#BCD8A6] rounded-3xl p-1 pl-1"
                >
                    <View
                        style={{
                            alignItems: 'center',
                        }}
                    >
                    </View>
                    <View className="flex-row justify-between items-center p-1 py-1 mb-1">
                        <Text style={{fontSize: wp(5)}} className="font-bold text-neutral-700">
                            Penilaian
                        </Text>
                        <View className="flex-row justify-end items-center p-1 py-1 mb-1">
                            <StarIcon size={wp(5)} color={"white"} />
                        </View>
                    </View>
                    
                    <View className="mx-2 flex-wrap justify-between">
                        <View 
                            style={{width: wp(83), height: wp(15)}}
                            className="bg-[#FFF9E8] flex-row justify-between p-1 py-1 mb-11 rounded-3xl items-center"
                        >
                            <Text style={{fontSize: wp(5)}} className="font-bold text-neutral-700">{starRating ? `${starRating}*` : 'Tap to rate'}</Text>
                            <TouchableOpacity onPress={() => setStarRating(1)}>
                            <MaterialIcons
                                name={starRating >= 1 ? 'star' : 'star-border'}
                                size={32}
                                style={starRating >= 1 ? "red": "white"}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setStarRating(2)}>
                                <MaterialIcons
                                name={starRating >= 2 ? 'star' : 'star-border'}
                                size={32}
                                style={starRating >= 2 ? "red": "white"}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setStarRating(3)}>
                                <MaterialIcons
                                name={starRating >= 3 ? 'star' : 'star-border'}
                                size={32}
                                style={starRating >= 3 ? "red": "white"}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setStarRating(4)}>
                                <MaterialIcons
                                name={starRating >= 4 ? 'star' : 'star-border'}
                                size={32}
                                style={starRating >= 4 ? "red": "white"}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setStarRating(5)}>
                                <MaterialIcons
                                name={starRating >= 5 ? 'star' : 'star-border'}
                                size={32}
                                style={starRating >= 5 ? "red": "white"}
                                />
                            </TouchableOpacity>
                        </View>

                        <View className="flex-row justify-between items-center p-1 py-1 mb-1">
                            <View
                                style={{
                                flexDirection: "column",
                                marginBottom: 6,
                                }}
                            >
                                <View
                                style={{
                                    height: 44,
                                    width: 250,
                                    borderColor: COLORS.secondaryGray,
                                    borderWidth: 1,
                                    borderRadius: 4,
                                    marginVertical: 6,
                                    justifyContent: "center",
                                    paddingLeft: 8,
                                }}
                                >
                                <TextInput
                                    placeholder='Berikan komentar...'
                                    placeholderTextColor={'gray'}
                                    className="flex-1 text-base mb-1 pl-1 tracking-wider"
                                />
                                </View>
                            </View>
                            <TouchableOpacity className="bg-[#FFF9E8] flex-row justify-end items-center p-1 py-1 mb-1 rounded-3xl">
                                <PaperAirplaneIcon size={wp(8)} color={"black"} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
        <View
            className="bg-[#BCD8A6] flex-row justify-between items-center p-1 py-1 "
        >
            <Text style={{fontSize: wp(5)}} className="font-bold text-neutral-700">
                Mulai dari : {item.price}
            </Text>
            <TouchableOpacity style={{backgroundColor: COLORS.white, height: wp(10), width: wp(25), marginTop: 2, marginBottom: 2}} className="mb-2 mx-3 flex justify-center items-center rounded-full" onPress={()=> navigation.navigate('Lapangan', {...item})}>
                <Text className="text-black font-bold" style={{fontSize: wp(5.5)}}>Pesan</Text>
            </TouchableOpacity>
        </View>
    </View>
    )
}