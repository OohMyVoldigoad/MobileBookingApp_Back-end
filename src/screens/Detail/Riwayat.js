import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Dimensions
} from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import React, { useState, useEffect, useRef } from "react";
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import AsyncStorage from "@react-native-async-storage/async-storage";

{/* dev */} 
import { COLORS, images, jenisRiwayat,Api } from "../../constans";

const ios = Platform.OS == 'ios';
const topMargin = ios? '': 'mt-10';
const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const Riwayat = (props) => {
    const navigation = useNavigation();
    const [activeSort, setActiveSort] = useState('Draft');
    const [idPelanggan, setidPelanggan] = useState('');
    const [dataDraft, setDataDraft] = useState({});

    const [selectedItem, setSelectedItem] = useState([]);

    const [isOpen, setIsOpen] = useState(false);

    const bottomSheetModalRef = useRef(null);

    const snapPoints = ["25%", "50%", "75%"];

    function handlePresentModal(itemsArray) {
        bottomSheetModalRef.current?.present();
        setIsOpen(true);
        setSelectedItem(itemsArray);
    }

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
        <GestureHandlerRootView style={{ flex: 1, backgroundColor: isOpen ? "gray" : "white" }}>
            <BottomSheetModalProvider>
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
                            <View className="flex-row justify-around items-center mx-1 rounded-full p-2 px-4 space-x-2" style={{ borderBottomColor: "white" }}>
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
                                        <Text style={styles.tanggal}>{selectedItem[0].created_at}</Text>
                                    </View>

                                    <View style={styles.section}>
                                        <Text style={styles.title}>{selectedItem[0].lapangan.penyedia.nama_bisnis}</Text>
                                        <Text style={styles.subtitle}>{selectedItem[0].lapangan.nama_lapangan}</Text>
                                    </View>

                                    <View style={styles.section}>
                                        <Text style={styles.sectionTitle}>Status Pemesanan</Text>
                                        <Text style={styles.status}>{selectedItem[0].status}</Text>
                                    </View>

                                    <View style={styles.section}>
                                        <Text style={styles.JenisLapanganText}>{selectedItem[0].lapangan.jenis_lapangan.jenis_lapangan}</Text>
                                    </View>

                                    <TouchableOpacity style={styles.timePriceSection}>
                                        <Text style={styles.time}>Jam</Text>
                                        <Text style={styles.price}>Harga</Text>
                                    </TouchableOpacity>

                                    {
                                        selectedItem.map((dataJadwal, index) => (
                                            <View key={dataJadwal.jadwal_lapangan.id} style={styles.timePriceSection}>
                                                <Text style={styles.time}>{dataJadwal.jadwal_lapangan.jam_mulai} - {dataJadwal.jadwal_lapangan.jam_selesai}</Text>
                                                <Text style={styles.price}>Rp. {dataJadwal.jadwal_lapangan.harga}</Text>
                                            </View>
                                        ))
                                    }
                                            
                                    <View style={styles.commentSection}>
                                        <Text style={styles.commentTitle}>Komentar</Text>
                                        <Text style={styles.comment}>Pesanan Berhasil</Text>
                                        <Text style={styles.admin}>Admin 1</Text>
                                    </View>

                                    <View style={styles.footer}>
                                        <Text style={styles.footerText}>SPORTSCAMP</Text>
                                    </View>
                                </BottomSheetScrollView>
                            </View>
                            : selectedItem.map((item, index) => (
                                <View key={index} style={styles.contentContainer}>
                                    <BottomSheetScrollView showsVerticalScrollIndicator={false}>
                                        <View style={styles.header}>
                                            <Text style={styles.headerText}>DETAIL PESANAN</Text>
                                        </View>
                                        <View style={styles.sectionTanggal}>
                                            <Text style={styles.tanggal}>{item.created_at}</Text>
                                        </View>

                                        <View style={styles.section}>
                                            <Text style={styles.title}></Text>
                                            <Text style={styles.subtitle}>{item.id_jadwal_lapangan}</Text>
                                        </View>

                                        <View style={styles.section}>
                                            <Text style={styles.sectionTitle}>Status Pemesanan</Text>
                                            <Text style={styles.status}>{item.status}</Text>
                                        </View>

                                        <View style={styles.section}>
                                            <Text style={styles.JenisLapanganText}>JenisLapangan</Text>
                                        </View>

                                        <View style={styles.timePriceSection}>
                                            <Text style={styles.time}>08.00 - 09.00</Text>
                                            <Text style={styles.price}>Rp. {item.total_harga}</Text>
                                        </View>

                                        <View style={styles.commentSection}>
                                            <Text style={styles.commentTitle}>Komentar</Text>
                                            <Text style={styles.comment}>Pesanan Berhasil</Text>
                                            <Text style={styles.admin}>Admin 1</Text>
                                        </View>

                                        <View style={styles.footer}>
                                            <Text style={styles.footerText}>SPORTSCAMP</Text>
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
status: {
    color: 'green',
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