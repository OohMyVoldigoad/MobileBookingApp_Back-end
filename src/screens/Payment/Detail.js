import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Modal,
    Button
} from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import React, { useState, useEffect } from "react";
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native';
import DatePicker, { getFormatedDate } from "react-native-modern-datepicker";
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';
import AsyncStorage from '@react-native-async-storage/async-storage';

{/* dev */} 
import { FONTS, COLORS, images, Api, Storage } from "../../constans";
import LottieView from "lottie-react-native";

const ios = Platform.OS == 'ios';
const topMargin = ios? '': 'mt-10';

const Detail = (props) => {
    const { title, Nomor, image, price, status, inibenar, tanggal, prosesBerhasil, type, notifikasi } = props.route.params;
    const paycheck = { title, Nomor, image, price, status, inibenar, tanggal, prosesBerhasil, type, notifikasi };
    const navigation = useNavigation();

    const [minutes, setMinutes] = useState(15);
    const [seconds, setSeconds] = useState(0);

    const [selectedDay, setSelectedDay] = useState("Day");
    const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
    const today = new Date();
    const startDate = getFormatedDate(
        today.setDate(today.getDate() + 1),
        "YYYYY/MM/DD"
    );
    const [selectedStartDate, setSelectedStartDate] = useState("Pilih tanggal pembayaran");
    const [startedDate, setStartedDate] = useState("");
    const handleChangeStartDate = (propDate) => {
        setStartedDate(propDate);
        // Mengambil hari dari tanggal yang dipilih
        const date = new Date(propDate);
        const options = { weekday: 'long' };
        const day = new Intl.DateTimeFormat('id-ID', options).format(date); // Sesuaikan dengan locale yang Anda inginkan
        setSelectedDay(day);
    };

    const handleOnPressStartDate = () => {
        setOpenStartDatePicker(!openStartDatePicker);
    };

    function renderDatePicker() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={openStartDatePicker}
            >
                <View
                style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                }}
                >
                <View
                    style={{
                    margin: 20,
                    backgroundColor: COLORS.primary,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 20,
                    padding: 35,
                    width: "90%",
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 4,
                    elevation: 5,
                    }}
                >
                    <DatePicker
                        mode="calendar"
                        minimumDate={startDate}
                        selected={startedDate}
                        onDateChanged={handleChangeStartDate}
                        onSelectedChange={(date) => setSelectedStartDate(date)}
                        options={{
                            backgroundColor: COLORS.primary,
                            textHeaderColor: "#469ab6",
                            textDefaultColor: COLORS.white,
                            selectedTextColor: COLORS.white,
                            mainColor: "#469ab6",
                            textSecondaryColor: COLORS.white,
                            borderColor: "rgba(122,146,165,0.1)",
                        }}
                    />
    
                    <TouchableOpacity onPress={handleOnPressStartDate}>
                        <Text style={{ ...FONTS.body3, color: COLORS.white }}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </Modal>
        );
        }
    
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
            // Navigasi ke halaman 'Methode'
            navigation.goBack();
        }
        
        return () => clearInterval(interval);
    }, [minutes, seconds]);
    
    useEffect(() => {
        if (paycheck?.prosesBerhasil) {
            const alertType = paycheck.type.toUpperCase();
            const type = ALERT_TYPE[alertType] || ALERT_TYPE.SUCCESS;
            Toast.show({
                type: type,
                title: paycheck.type,
                textBody: paycheck.notifikasi,
                autoClose: 1500,
            })
            navigation.setParams({ prosesBerhasil: false });    
        }
    }, [paycheck?.prosesBerhasil]);
    
    const [selectedImage, setSelectedImage] = useState("Upload bukti pembayaran");
    const [selectedImageName, setSelectedImageName] = useState("Upload bukti pembayaran");
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
            let uriSegments = result.assets[0].uri.split('/');
            let fileName = uriSegments.pop();
            setSelectedImageName(fileName);
        }
    };

    const uploadImage = async () => {
        const formData = new FormData();
    
        // Menambahkan id pemesanan ke form data
        inibenar.map(item => {
            return formData.append('id_pemesanan[]', item.id);
        });
    
        // Menambahkan tanggal_pembayaran ke form data
        formData.append('tanggal_pembayaran', selectedStartDate);
    
        // Menambahkan gambar ke form data
        formData.append('bukti_pembayaran', {
            uri: selectedImage,
            type: 'image/jpeg', // asumsi gambar adalah jpeg, ubah sesuai kebutuhan
            name: 'bukti_pembayaran.jpeg'
        });
    
        try {
            const token = await AsyncStorage.getItem('userToken');
            if(token){
                const response = await Api.post('/pembayaran/proses', formData, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    },
                });
                console.log(response.data?.notifikasi);
                navigation.navigate('Riwayat',{
                    //notifikasi
                    prosesBerhasil:true,
                    notifikasi: response.data.notifikasi,
                    type: response.data.type
                });
            }
            throw new Error('Token not found');
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
                        <Image source={{ uri: Storage.Storage + paycheck.image }} style={{ width: wp(70), height: hp(30), borderRadius: 10, marginTop: 10}} />
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
                        <View style={styles.timePriceSection1}>
                            <TouchableOpacity
                                onPress={handleOnPressStartDate}
                                style={{
                                    height: 50,
                                    width: 250,
                                    borderRadius: 9,
                                    borderWidth: 2,
                                    borderColor: COLORS.black,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginBottom: 10
                                }}
                            >
                                <Text style={styles.time}>{selectedStartDate}</Text>
                            </TouchableOpacity>
                                {renderDatePicker()}
                            <TouchableOpacity
                                onPress={handleImageSelection}
                                style={{
                                    height: 50,
                                    width: 345,
                                    borderRadius: 9,
                                    borderWidth: 2,
                                    borderColor: COLORS.black,
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <Text style={styles.time}>{selectedImageName}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={uploadImage}
                                style={{
                                    height: 50,
                                    width: 70,
                                    borderRadius: 9,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    paddingBottom: 16,
                                    paddingVertical: 10,
                                    borderColor: COLORS.primary,
                                    borderRadius: 12,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: COLORS.button,
                                    marginTop: 10
                                }}
                            >
                                <Text style={{color: COLORS.white}}>Kirim</Text>
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

const styles = StyleSheet.create({
    timePriceSection: {
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: '#000',
    },
    timePriceSection1: {
        padding: 20,
        flexDirection: 'wrap',
        alignItems: 'center',
        borderColor: '#000',
    },
    time: {
        fontSize: 18,
    }
});