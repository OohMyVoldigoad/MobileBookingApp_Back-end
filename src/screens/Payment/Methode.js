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
import { ChevronLeftIcon} from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';

{/* dev */} 
import { COLORS, images, Ddigital, TransferBank, Api, Storage } from "../../constans";

const ios = Platform.OS == 'ios';
const topMargin = ios? '': 'mt-10';

const MethodePay = (props) => {
    const select = props.route.params.price;
    const date = props.route.params.date;
    const price = props.route.params.totalPrice;
    const navigation = useNavigation();
    const [Id, setUserID] = useState("");
    const [metodeDigital, setMetodeDigital] = useState([]);
    const [metodeBank, setMetodeBank] = useState([]);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const token = await AsyncStorage.getItem('userToken');
                const response = await Api.get('/metode-pembayaran',{
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setUserID(await AsyncStorage.getItem('idPelanggan'))
                setMetodeDigital(response.data.dataDigital);
                setMetodeBank(response.data.dataBank);
            } catch (error) {
                console.error("Terjadi kesalahan saat mengambil data:", error);
            }
        };

        fetchData();
    }, []);

    const [tanggal] = useState(date)
    const [total] = useState(price)
    
    {/* API */}
    const pemesananHandler = async (title,nomor,image,id_metode) => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            const response = await Api.post('/pemesanan/'+ Id +'/proses', {
                id_lapangan: select.map((item) => item.id_lapangan),
                id_jadwal_lapangan: select.map((item) => item.id),
                id_metode_pembayaran: id_metode,
                tanggal_pemesanan: tanggal,
                total_harga: total
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            var inibenar = response.data.dataPemesanan
            console.log(response.data.notifikasi);
            navigation.navigate('Detail', {
                select, 
                price, 
                title: title, 
                Nomor: nomor, 
                image: image,
                status: "Menunggu Pembayaran",
                inibenar,
                tanggal,
                //notifikasi
                prosesBerhasil:true,
                notifikasi: response.data.notifikasi,
                type: response.data.type
            });
        } catch (error) {
            const alertType = error.response.data.type.toUpperCase();
            const type = ALERT_TYPE[alertType] || ALERT_TYPE.ERROR; // Default ke ERROR jika tidak ditemukan

            Toast.show({
                type: type,
                title: error.response.data.type,
                textBody: error.response.data.notifikasi,
                autoClose: 1500,
            });
            
            console.error('Gagal:', error);
        }
    };

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
                                Metode Pembayaran
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
                            metodeDigital.map((metode, index) => {
                                return (
                                <View key={metode.id} className="p-1 py-1 mb-1">
                                    <TouchableOpacity className="flex-row justify-between items-center p-1 py-1 mb-1" 
                                    onPress={() => {
                                        pemesananHandler(
                                            title = metode.nama_metode, 
                                            nomor = metode.no_rekening, 
                                            image = metode.foto,
                                            id_metode = metode.id
                                        );
                                    }}>
                                        <Image source={{ uri: Storage.Storage + metode.foto }} style={{ width: wp(10), height: hp(5), borderRadius: 10 }} />
                                        <Text style={{ fontSize: wp(5) }} className="font mr-4 text-neutral-700">
                                            {metode.no_rekening}
                                        </Text>
                                    </TouchableOpacity>
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
                        {
                            metodeBank.map((metode, index) => {
                                return (
                                <View key={metode.id} className="p-1 py-1 mb-1">
                                    <TouchableOpacity className="flex-row justify-between items-center p-1 py-1 mb-1" 
                                    onPress={() => {
                                        pemesananHandler(
                                            title = metode.nama_metode, 
                                            nomor = metode.no_rekening, 
                                            image = metode.foto,
                                            id_metode = metode.id
                                        );
                                    }}>
                                        <Image source={{ uri: Storage.Storage + metode.foto }} style={{ width: wp(10), height: hp(5), borderRadius: 10 }} />
                                        <Text style={{ fontSize: wp(5) }} className="font mr-4 text-neutral-700">
                                            {metode.no_rekening}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                );
                            })
                        }
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