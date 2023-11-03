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
import { useNavigation } from '@react-navigation/native';
import axios from "axios";

{/* dev */} 
import { COLORS, images, Api } from "../../constans";

const ios = Platform.OS == 'ios';
const topMargin = ios? '': 'mt-10';

const Detail = (props) => {
    const { title, Nomor, image, price, status, inibenar, tanggal } = props.route.params;
    const paycheck = { title, Nomor, image, price, status, inibenar, tanggal };
    const navigation = useNavigation();

    const [minutes, setMinutes] = useState(15);
    const [seconds, setSeconds] = useState(0);
    
    useEffect(() => {
        let interval = null;
        
        if (seconds > 0) {
            interval = setInterval(() => {
                setSeconds(seconds - 1);
            }, 1000);
        } else if (seconds === 0 && minutes !== 0) {
            setMinutes(minutes - 1);
            setSeconds(59);
        } else if (minutes === 0 && seconds === 0) {
            // Waktu habis, lakukan aksi berikut
            // Update status pembayaran
            updatePaymentStatus();
            
            // Navigasi ke halaman 'Methode'
            navigation.goBack();
        }
        
        return () => clearInterval(interval);
    }, [minutes, seconds]);
    
    const updatePaymentStatus = () => {
        // Logic untuk mengupdate status pembayaran menjadi "dibatalkan"
    };
    
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageSelection = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [9, 16],
            quality: 1,
        });
        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
        }
    };

    const uploadImage = async () => {
        const formData = new FormData();
    
        // Menambahkan id pemesanan ke form data
        inibenar.map(item => {
            return formData.append('id_pemesanan[]', item.id);
        });
    
        // Menambahkan tanggal_pembayaran ke form data
        formData.append('tanggal_pembayaran', paycheck.tanggal);
    
        // Menambahkan gambar ke form data
        formData.append('bukti_pembayaran', {
            uri: selectedImage,
            type: 'image/jpeg', // asumsi gambar adalah jpeg, ubah sesuai kebutuhan
            name: 'bukti_pembayaran.jpeg'
        });
    
        try {
            const response = await Api.post('pembayaran/proses', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data.notifikasi);
        } catch (error) {
            console.error('Gagal:', error);
        }
    };    

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
                        Detail Pembayaran
                    </Text>
                    <Text style={{ fontSize: wp(5) }} className="font-bold text-neutral-700">
                        Rp. {paycheck.price}
                    </Text>
                    <Text>{`${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`}</Text>
                </View>
        
                <View className="bg-[#BCD8A6] rounded-3xl items-center">
                    <View style={{ borderBottomWidth: 2 }} className="flex-wrap items-center ml-2 p-1">
                        <Image source={paycheck.image} style={{ width: wp(70), height: hp(30), borderRadius: 10, marginTop: 10}} />
                        <Text style={{ fontSize: wp(5) }} className="font-bold mb-2 text-neutral-700">
                            {paycheck.title}
                        </Text>
                        <Text style={{ fontSize: wp(5) }} className="font-bold mb-2 text-neutral-700">
                            {paycheck.Nomor}
                        </Text>
                    </View>
                    <View className="flex-wrap justify-start items-center p-1 py-1 mb-1">
                        <Text style={{fontSize: wp(4)}} className="text-black font-semibold">{paycheck.status}</Text>
                    </View>
                </View>

                <View className="bg-[#BCD8A6] rounded-3xl items-center">
                    <View
                        style={{
                        alignItems: "center",
                        marginVertical: 22,
                        }}
                    >
                        <TouchableOpacity onPress={handleImageSelection}>
                            <View
                                style={{
                                    height: 200,
                                    width: 200,
                                    borderRadius: 1,
                                    borderWidth: 2,
                                    borderColor: COLORS.white,
                                }}
                            >
                                {selectedImage && <Image source={{ uri: selectedImage }} style={{ width: 200, height: 200 }} />}
                            </View>
                        </TouchableOpacity>
                        <View className="flex-row justify-between items-center p-1 py-1 mt-4">
                            <TouchableOpacity onPress={uploadImage} 
                            style={{backgroundColor: COLORS.white, height: wp(10), width: wp(40), marginTop: 2, marginBottom: 2}} className="flex justify-center items-center rounded-full">
                                <Text className="text-black font-bold" style={{fontSize: wp(5.5)}}>Kirim</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
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

export default Detail;