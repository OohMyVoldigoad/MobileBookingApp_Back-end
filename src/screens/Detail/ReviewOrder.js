import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    FlatList
} from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import React, { useState, useEffect } from "react";
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeftIcon, BanknotesIcon } from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native';

{/* dev */} 
import { COLORS, Api, Storage } from "../../constans";

const ios = Platform.OS == 'ios';
const topMargin = ios? '': 'mt-10';

const ReviewOrder = (props) => {
    const item = props.route.params;
    const price = props.route.params.selectedItems;
    const date = props.route.params.selectedStartDate;
    const [biayaSewa, setBiayaSewa] = useState("");
    const [totalPrice, setTotalPrice] = useState(0);
    useEffect(() => {
        const calculateTotalPrice = () => {
            const total = price.reduce((acc, item) => acc + item.harga, 0);
            const biayasewa = price.reduce((acc, item) => acc + item.harga, 0);
            setTotalPrice(total+2500);
            setBiayaSewa(biayasewa);
        };
    
        calculateTotalPrice();
        }, [price]);
    const navigation = useNavigation();

    return (
        <View className="bg-white flex-1">
            {/* destination image */}
            <Image source={{ uri: Storage.Storage + item.foto_lapangan }} style={{width: wp(100), height: hp(25)}} />
            <StatusBar style={'light'} />

            {/* back button */}
            <SafeAreaView className={"flex-row justify-between items-center w-full absolute " + topMargin}>
                <TouchableOpacity
                    onPress={()=> navigation.goBack()}
                    className="p-2 rounded-full ml-4"
                    style={{backgroundColor: COLORS.primary}}
                >
                    <ChevronLeftIcon size={wp(7)} strokeWidth={4} color="black" />
                </TouchableOpacity>
                <Text style={{fontSize: wp(7)}} className="font-bold mr-4 text-neutral-700">
                    {item?.penyedia.nama_bisnis}
                </Text>
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
                                Review Pesanan
                            </Text>
                            <Text style={{fontSize: wp(5)}} className="font-bold text-neutral-700">
                                {item?.penyedia.nama_bisnis}
                            </Text>
                        </View>
                    </View>
                    
                    <View
                        className="bg-[#BCD8A6] rounded-3xl"
                    >
                        <View style={{borderBottomWidth: 2}} className="flex-wrap justify-start items-center p-1 py-1 mb-1">
                            <Text style={{fontSize: wp(7)}} className="font-bold mr-4 text-neutral-700">
                                Jadwal Pesanan
                            </Text>
                        </View>
                        <View className="flex-wrap justify-start items-center p-1 mt-4">
                            <Text style={{fontSize: wp(5)}} className="font-bold mr-4 text-neutral-700">
                                {item?.penyedia.nama_bisnis}
                            </Text>
                        </View>
                        <View className="flex-wrap justify-start items-center p-1 py-1 mb-1">
                            <Text style={{fontSize: wp(5)}} className="font mr-4 text-neutral-700">
                                {date}
                            </Text>
                        </View>
                        {price.map((item, index) => {
                            return (
                                <View key={index} className="bg-[#FFF9E8] rounded-3xl mb-4 mr-2 ml-2">
                                    <View className="flex-row justify-between items-center p-1 py-1 mb-1">
                                        <Text style={{fontSize: wp(5)}} className="font mr-4 text-neutral-700">
                                            {item.jam_mulai} - {item.jam_selesai}
                                        </Text>
                                        <Text style={{fontSize: wp(5)}} className="font mr-4 text-neutral-700">
                                            Rp. {item.harga}
                                        </Text>
                                    </View>
                                </View>
                            )
                        })}
                        <View className="rounded-3xl mb-4 mr-2 ml-2">
                            <View className="flex-row justify-between items-center p-1 py-1 mb-1">
                                <TouchableOpacity style={{backgroundColor: COLORS.white, height: wp(10), width: wp(40), marginTop: 2, marginBottom: 2}} className="flex justify-center items-center rounded-full">
                                    <Text className="text-black font-bold" style={{fontSize: wp(5.5)}}>hapus</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=> navigation.goBack()} style={{backgroundColor: COLORS.white, height: wp(10), width: wp(40), marginTop: 2, marginBottom: 2}} className="flex justify-center items-center rounded-full">
                                    <Text className="text-black font-bold" style={{fontSize: wp(5.5)}}>Tambah</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    <View className="bg-[#BCD8A6] rounded-3xl">
                        <View className="flex-row justify-between items-center p-1 py-1 mx-2">
                            <TouchableOpacity>
                                <Text className="font-bold" style={{fontSize: wp(5), marginLeft: 2}}>Gunakan Voucher</Text>
                            </TouchableOpacity>
                            <BanknotesIcon size={wp(7)} color="white" />
                        </View>
                    </View>

                    <View
                        className="bg-[#BCD8A6] rounded-3xl"
                    >
                        <View className="flex-wrap justify-start items-center p-1 py-1 mb-1">
                            <Text style={{fontSize: wp(6)}} className="font-bold mr-4 text-neutral-700">
                                Rincian
                            </Text>
                        </View>
                        <View style={{borderTopWidth: 2}} className="bg-[#FFF9E8]">
                            <View className="flex-row justify-between items-center p-1 py-1 ml-2 mb-1 mr-2">
                                <Text style={{fontSize: wp(5)}} className="font mr-4 text-neutral-700">
                                    Biaya sewa
                                </Text>
                                <Text style={{fontSize: wp(5)}} className="font mr-4 text-neutral-700">
                                    Rp. {biayaSewa} {/* Menampilkan total harga */}
                                </Text>
                            </View>
                        </View>
                        <View style={{borderBottomWidth: 2}} className="bg-[#FFF9E8]">
                            <View className="flex-row justify-between items-center p-1 py-1 ml-2 mb-1 mr-2">
                                <Text style={{fontSize: wp(5)}} className="font mr-4 text-neutral-700">
                                    Biaya tambahan
                                </Text>
                                <Text style={{fontSize: wp(5)}} className="font mr-4 text-neutral-700">
                                    Rp. 2500
                                </Text>
                            </View>
                        </View>
                            <View className="flex-row justify-between items-center p-1 py-1 ml-2 mb-1 mr-2">
                                <Text style={{fontSize: wp(5)}} className="font mr-4 text-neutral-700">
                                    Total
                                </Text>
                                <Text style={{fontSize: wp(5)}} className="font mr-4 text-neutral-700">
                                    Rp. {totalPrice} {/* Menampilkan total harga */}
                                </Text>
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
            <View
                className="bg-[#BCD8A6] flex-row justify-between items-center p-1 py-1 "
            >
                <View className="space-y-20">
                    <View className="mx-3 items-center">
                        <Text style={{fontSize: wp(5),color: COLORS.white}} className="font-semibold">Total: Rp. {totalPrice} {/* Menampilkan total harga */}</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={()=> navigation.navigate('Methode', {...item, totalPrice, price, date})} style={{backgroundColor: COLORS.white, height: wp(10), width: wp(50), marginTop: 2, marginBottom: 2}} className="mb-2 mx-3 flex justify-center items-center rounded-full">
                    <Text className="text-black font-bold" style={{fontSize: wp(5.5)}}>Pilih pembayaran</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
};

export default ReviewOrder;