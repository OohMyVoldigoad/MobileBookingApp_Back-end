import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import React, { useState, useEffect } from "react";
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';

{/* dev */} 
import { COLORS, images, jenisRiwayat,Api } from "../../constans";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ios = Platform.OS == 'ios';
const topMargin = ios? '': 'mt-10';

const Riwayat = (props) => {
    const navigation = useNavigation();
    const [activeSort, setActiveSort] = useState('Draft');
    const [idPelanggan, setidPelanggan] = useState('');
    const [dataDraft, setDataDraft] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedIdPelanggan = await AsyncStorage.getItem('idPelanggan');
                if (fetchedIdPelanggan) {
                    const response = await Api.get('/pemesanan/'+ fetchedIdPelanggan +'/riwayat');
    
                    // Cek kode status
                    if (response.status === 200) {
                        setDataDraft(response.data.dataDraft);
                        console.log(response.data.notifikasi);
                    } else {
                        console.error("API mengembalikan status:", response.status);
                    }
                }
            } catch (error) {
                console.error("Terjadi kesalahan saat mengambil data:", error);
            }
        };
  
        fetchData();
    }, [idPelanggan]);

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
                <View style={{ borderRadius: 10 }} className="bg-[#BCD8A6] items-center">
                    <Text style={{ fontSize: wp(5), marginVertical: 7 }} className="font-bold text-neutral-700">
                        Info Lapangan Yang Dipesan 
                    </Text>
                </View>
                <View style={{ borderRadius: 10 }} className="bg-[#BCD8A6]">
                    <View className="flex-row justify-around items-center mx-1 rounded-full p-2 px-4 space-x-2">
                        {
                            jenisRiwayat.map((sort, index)=>{
                                let isActive = sort==activeSort;
                                let activeButtonClass = isActive? 'bg-[#FFF9E8] shadow': '';
                                return (
                                    <TouchableOpacity onPress={()=> setActiveSort(sort)} key={index} className={`p-3 px-4 rounded-full flex ${activeButtonClass}`}>
                                        <Text className="font-semibold" style={{fontSize: wp(4), color: isActive? 'black': 'rgba(0,0,0,0.6)'}}>{sort}</Text>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                    {Object.values(dataDraft).map((itemsArray, index) => (
        <View className="flex-row items-center mx-1 rounded-full p-2 px-4 space-x-2" key={index}>
            <TouchableOpacity
                style={{ width: wp(80), height: wp(35) }}
                className={"bg-[#FFF9E8] flex justify-end p-1 py-5 space-y-1 mb-10 rounded-3xl"}
                //onPress={() => handleItemPress(item, index)}
            >
                {itemsArray.length > 1 ? (
                    <View>
                        <Text style={{ fontSize: wp(4) }} className="ml-2 text-black font-semibold">
                            Multiple Bookings
                        </Text>
                        <Text style={{ fontSize: wp(3) }} className="ml-2 text-black">
                            {itemsArray.length} bookings on {itemsArray[0].created_at}
                        </Text>
                        {/* Anda dapat menambahkan informasi lain yang Anda inginkan dari array tersebut di sini */}
                    </View>
                ) : (
                    <View>
                        <Text style={{ fontSize: wp(4) }} className="ml-2 text-black font-semibold">
                            {itemsArray[0].id_lapangan}
                        </Text>
                        <Text style={{ fontSize: wp(3) }} className="ml-2 text-black">
                            {itemsArray[0].tanggal_pemesanan}
                        </Text>
                        <Text style={{ fontSize: wp(3) }} className="ml-2 text-black">
                            {itemsArray[0].status}
                        </Text>
                        <View className="justify-end">
                            <Text style={{ fontSize: wp(3) }} className="ml-2 text-black">
                                {itemsArray[0].created_at}
                            </Text>
                            <Text style={{ fontSize: wp(3) }} className="ml-2 text-black">
                                {itemsArray[0].total_harga}
                            </Text>
                        </View>
                    </View>
                )}
            </TouchableOpacity>
        </View>
    ))}
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

export default Riwayat;