import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    TextInput
} from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import React, { useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native';

{/* dev */} 
import { COLORS, images, imagesDataURL } from "../../constans";

const ios = Platform.OS == 'ios';
const topMargin = ios? '': 'mt-10';

const Detail = (props) => {
    const { title, Nomor, image, price } = props.route.params;
    const paycheck = { title, Nomor, image, price }; 
    const navigation = useNavigation();
    const [selectedImage, setSelectedImage] = useState("Upload bukti pembayaran");

    const handleImageSelection = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        });

        if (!result.canceled) {
            setSelectedImage("Belum Upload");
        } else {
            alert('You did not select any image.');
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
                    <Text style={{ fontSize: wp(6) }} className="font-bold text-neutral-700">
                        Rp. {paycheck.price}
                    </Text>
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
                        <Text style={{ fontSize: wp(5) }} className="font mr-4 text-neutral-700">
                            Keterangan
                        </Text>
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
                                    height: 45,
                                    width: 350,
                                    borderRadius: 85,
                                    borderWidth: 2,
                                    borderColor: COLORS.white,
                                }}
                            >
                                <Text style={{ fontSize: wp(4) }} className="font-bold ml-20 mt-2 text-neutral-700">
                                    {selectedImage}
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <View className="flex-row justify-between items-center p-1 py-1 mt-4">
                            <TouchableOpacity //onPress={()=> navigation.goBack()} 
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