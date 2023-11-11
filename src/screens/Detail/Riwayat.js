import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Dimensions,
    Modal
} from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import React, { useState, useEffect, useRef } from "react";
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from "react-native-safe-area-context";
import LottieView from "lottie-react-native";
import { useNavigation } from '@react-navigation/native';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import DatePicker, { getFormatedDate } from "react-native-modern-datepicker";
import { FontAwesome5 } from "@expo/vector-icons";
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';

{/* dev */} 
import { FONTS, COLORS, images, jenisRiwayat, Api, Storage } from "../../constans";

const ios = Platform.OS == 'ios';
const topMargin = ios? '': 'mt-10';
const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const Riwayat = (props) => {
    const paycheck = {
        prosesBerhasil: props.route.params?.prosesBerhasil || false,
        type: props.route.params?.type || '',
        notifikasi: props.route.params?.notifikasi || '',
    };
    const navigation = useNavigation();
    const [activeSort, setActiveSort] = useState('draft');
    const [idPelanggan, setidPelanggan] = useState('');
    const [dataDraft, setDataDraft] = useState({});

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
    };

    const getStatusStyle = (status) => {
    switch (status) {
        case 'draft':
        return { color: 'blue', fontSize: 18, fontWeight: 'bold' };
        case 'pending':
        return { color: '#f2dd3d', fontSize: 18, fontWeight: 'bold' };
        case 'berhasil':
        return { color: 'green', fontSize: 18, fontWeight: 'bold' };
        case 'gagal':
        return { color: 'red', fontSize: 18, fontWeight: 'bold' };
        default:
        return { fontSize: 18, fontWeight: 'bold' };
    }
    };

    const [selectedItem, setSelectedItem] = useState([]);

    const [isOpen, setIsOpen] = useState(false);

    const bottomSheetModalRef = useRef(null);

    const snapPoints = ["25%", "50%", "75%"];

    function handlePresentModal(itemsArray) {
        bottomSheetModalRef.current?.present();
        setIsOpen(true);
        setSelectedItem(itemsArray);
    }

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = await AsyncStorage.getItem('userToken');
                const fetchedIdPelanggan = await AsyncStorage.getItem('idPelanggan');
                if (token) {
                    const response = await Api.get('/pemesanan/'+ fetchedIdPelanggan +'/riwayat/'+ activeSort, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    setDataDraft(response.data.dataDraft);
                    console.log(response.data.notifikasi);
                }
            } catch (error) {
                console.error("Terjadi kesalahan saat mengambil data:", error);
            }
        };
  
        fetchData();
    }, [idPelanggan, activeSort]);

    const uploadImage = async (id_pemesanan) => {
        const formData = new FormData();
        // Menambahkan id pemesanan ke form data
        formData.append('id_pemesanan[]', id_pemesanan);
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
            const response = await Api.post('pembayaran/proses', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data.notifikasi);
            bottomSheetModalRef.current?.close()

            const alertType = response.data.type.toUpperCase();
            const type = ALERT_TYPE[alertType] || ALERT_TYPE.SUCCESS;
            Toast.show({
                type: type,
                title: response.data.type,
                textBody: response.data.notifikasi,
                autoClose: 1500,
            })    

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
        <GestureHandlerRootView style={{ flex: 1, backgroundColor: isOpen ? "gray" : "white" }}>
            <BottomSheetModalProvider>
                <View className="flex-1">
                    {/* destination image */}
                    <Image style={{ backgroundColor: COLORS.primary, width: wp(100), height: hp(25), borderWidth: 2, borderColor: COLORS.black }} />
                    <StatusBar style={'light'} />
                
                    {/* back button */}
                    <SafeAreaView className={"flex-row justify-between items-center w-full absolute " + topMargin}>
                            <Image className="flex-row justify-end w-full absolute" source={images.logo_w} style={{ width: wp(20), height: hp(10) }} />
                        <View className="flex-row justify-end w-full absolute">
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
                            {activeSort == "draft" ? (
                                <View style={{ borderRadius: 10 }} className="bg-[#BCD8A6] mx-6 flex-row">
                                    <FontAwesome5
                                        name="info-circle"
                                        size={24}
                                        style={{ fontSize: wp(5), marginVertical: 7, marginEnd: 5, color: "yellow" }}
                                        className="mt-2"
                                    />  
                                    <Text style={{ fontSize: wp(3), marginVertical: 5 }} className="font-bold text-neutral-700">
                                    Pemesanan yang belum dilunasi akan otomatis dibatalkan dalam waktu 10 menit. 
                                    </Text>
                                </View>
                            ):(
                                <Text>-</Text>
                            )}
                        </View>
                        
                        <View style={{ borderRadius: 10 }} className="bg-[#BCD8A6]">
                            <View className="flex-row justify-around items-center mx-1 rounded-full p-2 px-4 space-x-2" style={{ borderBottomColor: "white" }}>
                                {
                                    jenisRiwayat.map((sort, index)=>{
                                        let isActive = sort == activeSort;
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
                                        className={"bg-[#FFF9E8] flex-row p-1 py-5 space-y-1 mb-10 rounded-3xl"}
                                        onPress={() => handlePresentModal(itemsArray)}
                                    >
                                        {itemsArray.length > 1 ? (
                                            <View>
                                                <Text style={{ fontSize: wp(4) }} className="ml-2 text-black font-semibold">
                                                    {itemsArray[0].lapangan.penyedia.nama_bisnis}
                                                </Text>
                                                <Text style={{ fontSize: wp(3) }} className="ml-2 text-black">
                                                    {itemsArray[0].lapangan.nama_lapangan}
                                                </Text>
                                                <View className="justify-end">
                                                    <Text style={{ fontSize: wp(3) }} className="ml-2 text-black">
                                                        {itemsArray[0].lapangan.jenis_lapangan.jenis_lapangan}
                                                    </Text>
                                                    <Text style={{ fontSize: wp(3) }} className="ml-2 text-black">
                                                        {itemsArray[0].jadwal_lapangan.jam_mulai} - {itemsArray[itemsArray.length - 1].jadwal_lapangan.jam_selesai}
                                                    </Text>
                                                    <Text style={{ fontSize: wp(3) }} className="ml-2 text-black">
                                                        Rp. {itemsArray[0].total_harga}
                                                    </Text>
                                                </View>
                                            </View>
                                        ) : (
                                            <View>
                                                <Text style={{ fontSize: wp(4) }} className="ml-2 text-black font-semibold">
                                                    {itemsArray[0].lapangan.penyedia.nama_bisnis}
                                                </Text>
                                                <Text style={{ fontSize: wp(3) }} className="ml-2 text-black">
                                                    {itemsArray[0].lapangan.nama_lapangan}
                                                </Text>
                                                <View className="justify-end">
                                                    <Text style={{ fontSize: wp(3) }} className="ml-2 text-black">
                                                        {itemsArray[0].lapangan.jenis_lapangan.jenis_lapangan}
                                                    </Text>
                                                    <Text style={{ fontSize: wp(3) }} className="ml-2 text-black">
                                                        {itemsArray[0].jadwal_lapangan.jam_mulai} - {itemsArray[itemsArray.length - 1].jadwal_lapangan.jam_selesai}
                                                    </Text>
                                                    <Text style={{ fontSize: wp(3) }} className="ml-2 text-black">
                                                        Rp. {itemsArray[0].total_harga}
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
                    <BottomSheetModal
                        ref={bottomSheetModalRef}
                        index={1}
                        snapPoints={snapPoints}
                        backgroundStyle={{ borderRadius: 50 }}
                        // style={{ height: SCREEN_HEIGHT }}
                        onDismiss={() => {
                        setIsOpen(false);
                        setSelectedItem(null); // Clear the selected item when dismissing the sheet
                        }}
                    >
                        {/* Only show the details if there is a selected item */}
                        {selectedItem && Array.isArray(selectedItem) && (
                            selectedItem.length > 1 
                            ?
                            <View key={selectedItem[0].id} style={styles.contentContainer}>
                                <BottomSheetScrollView showsVerticalScrollIndicator={false}>
                                    <View style={styles.header}>
                                        <Text style={styles.headerText}>DETAIL PESANAN</Text>
                                    </View>
                                    <View style={styles.sectionTanggal}>
                                        <Text style={styles.tanggal}>{selectedItem[0].tanggal_pemesanan}</Text>
                                    </View>

                                    <View style={styles.section}>
                                        <Text style={styles.title}>{selectedItem[0].lapangan.penyedia.nama_bisnis}</Text>
                                        <Text style={styles.subtitle}>{selectedItem[0].lapangan.nama_lapangan}</Text>
                                    </View>

                                    <View style={styles.section}>
                                        <Text style={styles.sectionTitle}>Status Pemesanan</Text>
                                        <Text style={getStatusStyle(selectedItem[0].status)}>{selectedItem[0].status}</Text>
                                    </View>

                                    <View style={styles.section}>
                                        <Text style={styles.JenisLapanganText}>{selectedItem[0].lapangan.jenis_lapangan.jenis_lapangan}</Text>
                                    </View>

                                    <View style={styles.timePriceSection}>
                                        <Text style={styles.time}>Jam</Text>
                                        <Text style={styles.price}>Harga</Text>
                                    </View>

                                    {
                                        selectedItem.map((dataJadwal, index) => (
                                            <View key={dataJadwal.jadwal_lapangan.id} style={styles.timePriceSection}>
                                                <Text style={styles.time}>{dataJadwal.jadwal_lapangan.jam_mulai} - {dataJadwal.jadwal_lapangan.jam_selesai}</Text>
                                                <Text style={styles.price}>Rp. {dataJadwal.jadwal_lapangan.harga}</Text>
                                            </View>
                                        ))
                                    }

                                    <View style={styles.header2}>
                                        <Text style={styles.headerText2}>Metode Pembayaran</Text>
                                    </View>

                                    <View style={styles.timePriceSection2}>
                                        <View className="flex-row">
                                        <Image source={{ uri: Storage.Storage + selectedItem[0].metode_pembayaran.foto }} style={{ width: wp(15), height: hp(5), borderRadius: 10, borderColor: COLORS.black  }} />
                                            <Text style={styles.time} className="ml-2 mt-2">{selectedItem[0].metode_pembayaran.nama_metode}</Text>
                                        </View>
                                        <Text style={styles.price} className="ml-2 mt-2">{selectedItem[0].metode_pembayaran.no_rekening}</Text>
                                    </View>

                                    {selectedItem[0].status != 'draft' ? (
                                        <View style={styles.commentSection}>
                                            <Text style={styles.commentTitle}>Komentar</Text>
                                            <Text style={styles.comment}>{selectedItem[0].komentar ?? ('-') }</Text>
                                            <Text style={styles.admin}>{selectedItem[0].komentar ?? ('-') }</Text>
                                        </View>
                                    ):(
                                        <View style={styles.timePriceSection1}>
                                            <TouchableOpacity
                                                onPress={handleOnPressStartDate}
                                                style={{
                                                    height: 50,
                                                    width: 345,
                                                    borderRadius: 9,
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
                                                onPress={() => {
                                                    selectedItem.forEach(item => {
                                                        uploadImage(item.id);
                                                    });
                                                }}
                                                style={{
                                                    height: 50,
                                                    width: 70,
                                                    borderRadius: 9,
                                                    borderWidth: 2,
                                                    borderColor: COLORS.black,
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    paddingBottom: 16,
                                                    paddingVertical: 10,
                                                    borderColor: COLORS.primary,
                                                    borderWidth: 2,
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
                                    )}

                                    <View style={styles.footer}>
                                        <Text style={styles.footerText}>SPORTSCAMP</Text>
                                    </View>
                                    {/* footer */}
                                    <View className="space-y-20">
                                        <View className="mx-25 items-center">
                                        <Text style={{ fontSize: wp(1), color: COLORS.white }} className="font-semibold">Akhir halaman</Text>
                                        </View>
                                    </View>
                                </BottomSheetScrollView>
                            </View>
                            : selectedItem.map((item, index) => (
                                <View key={item.id} style={styles.contentContainer}>
                                    <BottomSheetScrollView showsVerticalScrollIndicator={false}>
                                        <View style={styles.header}>
                                            <Text style={styles.headerText}>DETAIL PESANAN</Text>
                                        </View>
                                        <View style={styles.sectionTanggal}>
                                            <Text style={styles.tanggal}>{item.tanggal_pemesanan}</Text>
                                        </View>

                                        <View style={styles.section}>
                                            <Text style={styles.title}>{item.lapangan.penyedia.nama_bisnis}</Text>
                                            <Text style={styles.subtitle}>{item.lapangan.nama_lapangan}</Text>
                                        </View>

                                        <View style={styles.section}>
                                            <Text style={styles.sectionTitle}>Status Pemesanan</Text>
                                            <Text style={getStatusStyle(item.status)}>{item.status}</Text>
                                        </View>

                                        <View style={styles.section}>
                                            <Text style={styles.JenisLapanganText}>{item.lapangan.jenis_lapangan.jenis_lapangan}</Text>
                                        </View>

                                        <View style={styles.timePriceSection}>
                                            <Text style={styles.time}>{item.jadwal_lapangan.jam_mulai} - {item.jadwal_lapangan.jam_selesai}</Text>
                                            <Text style={styles.price}>Rp. {item.total_harga}</Text>
                                        </View>

                                        <View style={styles.header2}>
                                            <Text style={styles.headerText2}>Metode Pembayaran</Text>
                                        </View>

                                        <View style={styles.timePriceSection2}>
                                            <View className="flex-row">
                                            <Image source={{ uri: Storage.Storage + item.metode_pembayaran.foto }} style={{ width: wp(15), height: hp(5), borderRadius: 10, borderColor: COLORS.black  }} />
                                                <Text style={styles.time} className="ml-2 mt-2">{item.metode_pembayaran.nama_metode}</Text>
                                            </View>
                                            <Text style={styles.price} className="ml-2 mt-2">{item.metode_pembayaran.no_rekening}</Text>
                                        </View>

                                        {item.status != 'draft' ? (
                                            <View style={styles.commentSection}>
                                                <Text style={styles.commentTitle}>Komentar</Text>
                                                <Text style={styles.comment}>{item.komentar ?? ('-') }</Text>
                                                <Text style={styles.admin}>{item.komentar ?? ('-') }</Text>
                                            </View>
                                        ):(
                                            <View style={styles.timePriceSection1}>
                                            <TouchableOpacity
                                                    onPress={handleOnPressStartDate}
                                                    style={{
                                                        height: 50,
                                                        width: 345,
                                                        borderRadius: 9,
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
                                                    onPress={() => uploadImage(item.id)}
                                                    style={{
                                                        height: 50,
                                                        width: 70,
                                                        borderRadius: 9,
                                                        borderWidth: 2,
                                                        borderColor: COLORS.black,
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        paddingBottom: 16,
                                                        paddingVertical: 10,
                                                        borderColor: COLORS.primary,
                                                        borderWidth: 2,
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
                                        )}
                                        <View style={styles.footer}>
                                            <Text style={styles.footerText}>SPORTSCAMP</Text>
                                        </View>
                                        {/* footer */}
                                        <View className="space-y-20">
                                            <View className="mx-25 items-center">
                                            <Text style={{ fontSize: wp(1), color: COLORS.white }} className="font-semibold">Akhir halaman</Text>
                                            </View>
                                        </View>
                                    </BottomSheetScrollView>
                                </View>
                            ))
                        )}
                    </BottomSheetModal>
                </View>
            </BottomSheetModalProvider>
        </GestureHandlerRootView>
    );
};

export default Riwayat;

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#FFF9E8',
    alignItems: "center",
    justifyContent: "center",
},
contentContainer: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: '#FFF9E8',
    width: "100%",
    height: SCREEN_HEIGHT,
    borderRadius: 50
},
row: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
},
header: {
    padding: 20,
    alignItems: 'center',
},
header2: {
    marginTop: 10,
    alignItems: 'center',
},
scroll: {
    flex: 1,
    backgroundColor: '#FFF9E8',
    borderRadius: 50
},
headerText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 30
},
headerText2: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18
},
section: {
    padding: 20,
},
sectionTanggal: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
},
tanggal: {
    fontSize: 12,
    fontWeight: 'bold',
},
title: {
    fontSize: 24,
    fontWeight: 'bold',
},
subtitle: {
    fontSize: 20,
},
sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
},
JenisLapanganText: {
    fontSize: 18,
},
timePriceSection: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#000',
},
timePriceSection1: {
    padding: 20,
    flexDirection: 'wrap',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#000',
},
timePriceSection2: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#000',
},
time: {
    fontSize: 18,
},
price: {
    fontSize: 18,
    fontWeight: 'bold',
},
divider: {
    marginVertical: 20,
    borderBottomWidth: 1,
    borderColor: '#000',
},
commentSection: {
    padding: 20,
},
commentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
},
comment: {
    fontSize: 16,
},
admin: {
    fontSize: 16,
    fontStyle: 'italic',
},
footer: {
    padding: 20,
    alignItems: 'center',
},
footerText: {
    fontSize: 18,
    fontWeight: 'bold',
},
});
