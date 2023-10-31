import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import React from "react";
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeftIcon} from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native';

{/* dev */} 
import { COLORS, images, Ddigital } from "../../constans";

const ios = Platform.OS == 'ios';
const topMargin = ios? '': 'mt-10';

const MethodePay = (props) => {
    const price = props.route.params.totalPrice;
    const navigation = useNavigation();

    return (
        <View className="flex-1">
            {/* destination image */}
            <Image style={{backgroundColor: COLORS.primary, width: wp(100), height: hp(25)}} />
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
                <View className="flex-row justify-end w-full absolute">
                    <Image source={images.logo_w} style={{width: wp(20), height: hp(10)}}/>
                    <Text style={{fontSize: wp(6)}} className="font-bold mr-4 text-neutral-700">
                        Sports Camp
                    </Text>
                </View>
            </SafeAreaView>

            {/* title & descritpion & booking button */}
            <View style={{borderTopLeftRadius: 40, borderTopRightRadius: 40}} className="px-5 flex flex-1 bg-[#FFF9E8] pt-8 -mt-14">
                <ScrollView showsVerticalScrollIndicator={false} className="space-y-5">
                    <View
                        style={{
                            alignItems: "center",
                            justifyContent: "center", // Center vertically and horizontally
                            marginVertical: 5,
                        }}
                        className="bg-[#BCD8A6] rounded-3xl"
                    >
                        <View className="flex-wrap justify-between items-center p-1 py-1 mb-1">
                            <Text style={{fontSize: wp(7)}} className="font-bold mr-4 text-neutral-700">
                                Total pembayaran
                            </Text>
                            <Text style={{fontSize: wp(5)}} className="font-bold text-neutral-700">
                                Rp. {price}
                            </Text>
                        </View>
                    </View>
                    
                    <View
                        className="bg-[#BCD8A6]" style={{borderRadius: 10, alignItems: "center",
                        justifyContent: "center", // Center vertically and horizontally
                        marginVertical: 5,}}
                    >
                        <View className="flex-wrap items-center p-1 py-1 mb-1">
                            <Text style={{fontSize: wp(7)}} className="font-bold mr-4 text-neutral-700">
                                Metode pembayaran
                            </Text>
                        </View>
                    </View>

                    
                    <View
                        className="bg-[#BCD8A6] rounded-3xl"
                    >
                        <View style={{borderBottomWidth: 2}} className="flex-wrap justify-start items-center p-1 mt-4">
                            <Text style={{fontSize: wp(5)}} className="font-bold mr-4 mb-2 text-neutral-700">
                                Dompet Digital
                            </Text>
                        </View>
                        {
                            Ddigital.map((dana, index) => {
                                return (
                                <View key={index} className="flex-row justify-between items-center p-1 py-1 mb-1">
                                    <TouchableOpacity onPress={() => navigation.navigate('Detail', { price, title: dana.title, Nomor: dana.Nomor, image: dana.image })}>
                                        <Image source={dana.image} style={{ width: wp(10), height: hp(5), borderRadius: 10 }} />
                                    </TouchableOpacity>
                                    <Text style={{ fontSize: wp(5) }} className="font mr-4 text-neutral-700">
                                        {dana.title}
                                    </Text>
                                </View>
                                );
                            })
                        }
                    </View>
                    
                    <View
                        className="bg-[#BCD8A6] rounded-3xl"
                    >
                        <View style={{borderBottomWidth: 2}} className="flex-wrap justify-start items-center p-1 mt-4">
                            <Text style={{fontSize: wp(5)}} className="font-bold mr-4 mb-2 text-neutral-700">
                                Transfer Bank
                            </Text>
                        </View>
                        <View className="flex-row justify-between items-center p-1 py-1 mb-1">
                            <TouchableOpacity className="mr-4 flex-row justify-between items-center" onPress={()=> navigation.navigate('Detail',)}>
                                <Image source={require('../../../assets/imp/PayMethode/mandiri.png')} style={{width: wp(10), height: hp(5), borderRadius: 10}} />
                                <Text style={{fontSize: wp(5)}} className="font mr-4 text-neutral-700">
                                Mandiri
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View className="flex-row justify-between items-center p-1 py-1 mb-1">
                            <TouchableOpacity className="mr-4 flex-row justify-between items-center" onPress={()=> navigation.navigate('Detail',)}>
                                <Image source={require('../../../assets/imp/PayMethode/Bni.jpg')} style={{width: wp(10), height: hp(5), borderRadius: 10}} />
                                <Text style={{fontSize: wp(5)}} className="font mr-4 text-neutral-700">
                                Bni
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View className="flex-row justify-between items-center p-1 py-1 mb-1">
                            <TouchableOpacity className="mr-4 flex-row justify-between items-center" onPress={()=> navigation.navigate('Detail',)}>
                                <Image source={require('../../../assets/imp/PayMethode/bri.png')} style={{width: wp(10), height: hp(5), borderRadius: 10}} />
                                <Text style={{fontSize: wp(5)}} className="font mr-4 text-neutral-700">
                                Bri
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    
                    {/* footer */}
                    <View className="space-y-20">
                        <View className="mx-25 items-center">
                            <Text style={{fontSize: wp(1),color: COLORS.white}} className="font-semibold">Akhir halaman</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>
    )
};

export default MethodePay;