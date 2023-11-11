import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    Modal,
    Switch,
    FlatList
} from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import React, { useState, useEffect } from "react";
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from "react-native-safe-area-context";
import DatePicker, { getFormatedDate } from "react-native-modern-datepicker";
import { ChevronLeftIcon, ShoppingCartIcon } from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

{/* dev */} 
import { COLORS, FONTS, Api, Storage } from "../../constans";

const ios = Platform.OS == 'ios';
const topMargin = ios? '': 'mt-10';

const Lapangan = (props) => {
    const home = props.route.params;
    const navigation = useNavigation();

    const [totalPrice, setTotalPrice] = useState(0);
    const [selectedIndexes, setSelectedIndexes] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);

    const handleItemPress = (item, index) => {
        const selectedIndexArray = [...selectedIndexes];
        if (selectedIndexArray.includes(index)) {
            // Item sudah dipilih, maka hapus dari array
            const indexToRemove = selectedIndexArray.indexOf(index);
            if (indexToRemove !== -1) {
                selectedIndexArray.splice(indexToRemove, 1);
            }
        } else {
            // Item belum dipilih, maka tambahkan ke array
            selectedIndexArray.push(index);
        }
        setSelectedIndexes(selectedIndexArray);

        // Selain dari itu, tambahkan item yang diklik ke dalam selectedItems
        const selectedItemsArray = [...selectedItems];
        if (selectedItemsArray.includes(item)) {
            // Item sudah dipilih, maka hapus dari array
            const itemIndexToRemove = selectedItemsArray.indexOf(item);
            if (itemIndexToRemove !== -1) {
                selectedItemsArray.splice(itemIndexToRemove, 1);
            }
        } else {
            // Item belum dipilih, maka tambahkan ke array
            selectedItemsArray.push(item);
        }
        setSelectedItems(selectedItemsArray);

        // Menghitung total harga saat item diklik
        if (selectedIndexArray.includes(index)) {
            const newTotalPrice = totalPrice + item.harga;
            setTotalPrice(newTotalPrice);
        } else {
            const newTotalPrice1 = totalPrice - item.harga;
            setTotalPrice(newTotalPrice1);
        }
    };

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const [selectedDay, setSelectedDay] = useState("Day");
    const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
    const today = new Date();
    const startDate = getFormatedDate(
        today.setDate(today.getDate() + 1),
        "YYYYY/MM/DD"
    );
    const [selectedStartDate, setSelectedStartDate] = useState("2023/10/23");
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

    const [isModalVisible, setIsModalVisible] = useState(false);
    const openModal = () => {
        setIsModalVisible(true);
    };
    
    const closeModal = () => {
        setIsModalVisible(false);
    };
    
    const [jadwalLapangan, setJadwalLapangan] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = await AsyncStorage.getItem('userToken');
                if(token){
                    const response = await Api.get('/lapangan/'+home.id+'/jadwal',{
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    setJadwalLapangan(response.data.dataJadwalLapangan);
                }
            } catch (error) {
                console.error("Terjadi kesalahan saat mengambil data:", error);
            }
        };
        fetchData();
    }, [home.id]);

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

    return (
        <View className="bg-white flex-1">
            {/* destination image */}
            <Image source={{ uri: Storage.Storage + home.foto_lapangan }} style={{width: wp(100), height: hp(25)}} />
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
                    {home?.penyedia.nama_bisnis}
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
                        <Text style={{fontSize: wp(7)}} className="font-bold text-neutral-700">
                            Atur Tanggal
                        </Text>
                        <View
                            style={{
                                alignItems: "center",
                                marginVertical: 5,
                            }}
                        >
                            <View
                                style={{
                                    flexDirection: "column",
                                    marginBottom: 6,
                                }}
                            >
                                <TouchableOpacity
                                    onPress={handleOnPressStartDate}
                                    style={{
                                        height: 30,
                                        width: "100%",
                                        marginVertical: 2,
                                        justifyContent: "center",
                                        paddingLeft: 8,
                                        paddingRight: 8,
                                    }}
                                >
                                    <Text style={{ fontSize: wp(5), fontWeight: "bold", color: "#333" }}>{selectedDay}, {selectedStartDate}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {renderDatePicker()}
                    </View>
                    
                    <View
                        className="bg-[#BCD8A6] rounded-3xl"
                    >
                        <View className="flex-row justify-between items-center p-4 py-6 mb-5">
                            <Text style={{fontSize: wp(6)}} className="font-bold text-neutral-700">
                                Hanya tampilkan jadwal tersedia
                            </Text>
                            <Switch
                                trackColor={{false: '#767577', true: COLORS.white}}
                                thumbColor={isEnabled ? COLORS.primary : COLORS.white}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitch}
                                value={isEnabled}
                            />
                        </View>
                        <View className="flex-row justify-between flex-wrap px-3">
                            {jadwalLapangan.map((item, index) => {
                                const isButtonSelected = selectedIndexes.includes(index);
                                if (!isEnabled || item.status !== "telah dipesan" || item.status == "tidak tersedia" || item.status == "sedang dipesan") {
                                    return (
                                        <TouchableOpacity
                                            key={index}
                                            style={{ width: wp(40), height: wp(30) }}
                                            className={isButtonSelected || item.status == "telah dipesan" || item.status == "tidak tersedia" || item.status == "sedang dipesan" ? "bg-[#D1CBBA] flex justify-end p-1 py-5 space-y-1 mb-10 rounded-3xl items-center" : "bg-[#FFF9E8] flex justify-end p-1 py-5 space-y-1 mb-10 rounded-3xl items-center"}
                                            disabled = {item.status == "telah dipesan" || item.status == "tidak tersedia" || item.status == "sedang dipesan"}
                                            onPress={() => handleItemPress(item, index)}
                                        >
                                        <Text style={{ fontSize: wp(4) }} className="text-black font-semibold">
                                            {item.jam_mulai} - {item.jam_selesai}
                                        </Text>
                                        <Text style={{ fontSize: wp(4) }} className="text-black">
                                            Rp. {item.harga}
                                        </Text>
                                        <Text style={{ fontSize: wp(4) }} className="text-black">
                                            {item.status}
                                        </Text>
                                        </TouchableOpacity>
                                    );
                                }
                                return null; // Mengabaikan elemen jika status "booked"
                            })}
                        </View>
                    </View>
                    
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={isModalVisible}
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
                                <Text style={{ ...FONTS.body3, color: COLORS.white }}>Item yang Dipilih</Text>
                                    <FlatList
                                        data={selectedItems}
                                        className="bg-[#BCD8A6]"
                                        keyExtractor={(item, index) => index.toString()}
                                        renderItem={({ item, index }) => (
                                            <View key={index} style={{ flex: 1, alignItems: "center", justifyContent: "center",}}>
                                                {/* Tampilkan informasi item yang dipilih sesuai kebutuhan */}
                                                <Text style={{ fontSize: wp(4) }} className="text-black font-semibold">
                                                    {item.jam_mulai} - {item.jam_selesai}
                                                </Text>
                                                <Text style={{ fontSize: wp(4) }} className="text-black">
                                                Rp. {item.harga}
                                                </Text>
                                            </View>
                                        )}
                                    />
                                <TouchableOpacity onPress={closeModal} style={{ alignItems: "center", width: wp(20), height: wp(10), color: COLORS.white,backgroundColor: COLORS.black, borderRadius: 5 }}>
                                    <Text style={{ fontSize: wp(5), marginTop: 5,color: COLORS.white,}}>Tutup</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                    {/* footer */}
                    <View className="space-y-20">
                        <View className="mx-25 items-center">
                            <Text style={{fontSize: wp(1),color: COLORS.white}} className="font-semibold">Akhir halaman</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
            <View
                className="bg-[#BCD8A6]"
            >
                <View className="flex-row justify-between items-center p-1 py-1">
                    <TouchableOpacity
                        onPress={openModal}
                        className="p-2 rounded-full ml-4"
                        style={{backgroundColor: 'rgba(255,255,255,0.5)'}}
                    >
                        <ShoppingCartIcon size={wp(7)} color="black" />
                    </TouchableOpacity>

                    <View className="space-y-5">
                        <View className="mr-20 items-center">
                            <Text style={{fontSize: wp(5),color: COLORS.black}} className="font-semibold">Total: Rp. {totalPrice}</Text>
                        </View>
                    </View>
                    <TouchableOpacity onPress={()=> navigation.navigate('ReviewOrder', {...home, selectedItems, selectedStartDate})} style={{backgroundColor: COLORS.white, height: wp(10), width: wp(25), marginTop: 2, marginBottom: 2}} className="mb-2 mx-3 flex justify-center items-center rounded-full">
                        <Text className="text-black font-bold" style={{fontSize: wp(5.5)}}>Pesan</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
};

export default Lapangan;