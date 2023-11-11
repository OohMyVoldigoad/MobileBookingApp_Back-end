import { View, Text, Image, TouchableOpacity, ScrollView, TextInput, Platform, Modal, ImageBackground, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon, ShareIcon, StarIcon, ClockIcon, Bars3Icon, MapPinIcon, PaperAirplaneIcon} from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import MapView from 'react-native-maps';
import axios from 'axios';
import RenderHtml from 'react-native-render-html';
import AsyncStorage from '@react-native-async-storage/async-storage';

{/* dev */}
import { COLORS,FONTS } from '../../constans';
import DotsView from '../../components/DotsView';
import { Api, Storage } from '../../constans';

const ios = Platform.OS == 'ios';
const topMargin = ios? '': 'mt-10';

export default function Company(props) {
    const item = props.route.params;
    const navigation = useNavigation();
    const [isFavourite, toggleFavourite] = useState(false);
    const [starRating, setStarRating] = useState(null);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const openModal = () => {
        setIsModalVisible(true);
    };
    
    const closeModal = () => {
        setIsModalVisible(false);
    };
    
    {/* API */}
    const [jenisL, setJenisL] = useState([])
    const [Lapangan, setLapangan] = useState([]);
    const [minHarga, setMinHarga] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = await AsyncStorage.getItem('userToken');
                if(token){
                    const response = await Api.get('/penyedia_lapangan/'+ item.id +'/jenisLapangan',{
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    setJenisL(response.data.dataJenisLapangan);
                    setLapangan(response.data.dataLapangan)
                    setMinHarga(response.data.minHarga)
                }
            } catch (error) {
                console.error("Terjadi kesalahan saat mengambil data:", error);
            }
        };

        fetchData();
    }, [item.id]);
    
    const content = {
        html: item.deskripsi_lapangan || "" // Pastikan anda mendapatkan string HTML dari deskripsi lapangan
    };
return (
    <View className="bg-white flex-1">
        {/* ModalLapangan */}
        
    <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
    >
        <View style={styles.modalContainer}>
    <View style={styles.modalDialog}>
        <View style={styles.modalContent}>

            <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Lapangan</Text>
                <TouchableOpacity onPress={closeModal}>
                    <Text style={styles.closeButton}>Close</Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalScrollView}>
                <View style={styles.modalBody}>
                    <View style={styles.container}>
                        <View style={styles.rowCols2}>
                            {
                                Lapangan.map((item, index) => (
                                    <View key={index} style={styles.col}>
                                        <TouchableOpacity
                                            key={index}
                                            onPress={() => navigation.navigate('Lapangan', {...item})}
                                            style={{width: wp(35), height: wp(25), borderRadius: 10}}>
                                            
                                            <ImageBackground 
                                                source={{ uri: Storage.Storage + item.foto_lapangan }} 
                                                style={{flex: 1, justifyContent: 'flex-end', borderRadius: 10}}
                                                imageStyle={{borderRadius: 10}}>
                                                
                                                <LinearGradient
                                                    colors={['transparent', 'rgba(0,0,0,0.6)']}
                                                    style={{flex: 1, justifyContent: 'flex-end', padding: 10, borderRadius: 10}}>
                                                    
                                                    <Text style={{fontSize: wp(4), color: 'white', fontWeight: 'bold'}}>
                                                        {item.nama_lapangan}
                                                    </Text>
                                                    <Text style={{fontSize: wp(2.2), color: 'white'}}>
                                                        {item.jenis_lapangan.jenis_lapangan}
                                                    </Text>
                                                    
                                                </LinearGradient>
                                                
                                            </ImageBackground>
                                            
                                        </TouchableOpacity>

                                    </View>
                                ))
                            }
                        </View>
                    </View>
                </View>
            </ScrollView>

        </View>
    </View>
</View>
    </Modal>

        {/* destination image */}
        <Image source={{ uri: Storage.Storage + item.foto }} style={{width: wp(100), height: hp(25)}} />
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
                {item.nama_bisnis}
            </Text>
        </SafeAreaView>

        {/* title & descritpion & booking button */}
        <View style={{borderTopLeftRadius: 40, borderTopRightRadius: 40}} className="px-5 flex flex-1 justify-between bg-[#FFF9E8] pt-8 -mt-14">
            <ScrollView showsVerticalScrollIndicator={false} className="space-y-1">
                <View
                    className="space-y-1 mx-1 mb-4 bg-[#BCD8A6] rounded-3xl p-1 pl-1"
                >
                    <Image source={{ uri: Storage.Storage + item.foto }} style={{width: wp(84), height: hp(25)}} className="flex mx-1 mb-4 bg-[#BCD8A6] rounded-3xl p-1 pl-1"/>
                    <View
                        style={{
                            alignItems: 'center',
                        }}
                    >
                        <DotsView />
                    </View>
                    <View className="flex-row justify-between items-center p-1 py-1 mb-1">
                        <Text style={{fontSize: wp(5)}} className="font-bold text-neutral-700">
                            {item.nama_bisnis}
                        </Text>
                        <View className="flex-row justify-end items-center p-1 py-1 mb-1">
                            <TouchableOpacity onPress={()=> toggleFavourite(!isFavourite)} style={{backgroundColor: 'rgba(255,255,255,0.4)'}} className="p-2 rounded-full ml-4">
                                <HeartIcon size={wp(5)} color={isFavourite? "red": "white"} />
                            </TouchableOpacity>
                            <TouchableOpacity style={{backgroundColor: 'rgba(255,255,255,0.4)'}} className="p-2 rounded-full ml-2">
                                <ShareIcon size={wp(5)} color={"white"} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View className="justify-start flex-row">
                        <StarIcon size={wp(5)} color={"yellow"} />
                        <Text style={{fontSize: wp(5), marginBottom: 3}} className="font text-neutral-700">
                            ,  7
                        </Text>
                    </View>

                    <View className="justify-start flex-row">
                        <Text style={{fontSize: wp(5)}} className="font text-neutral-700">
                            Kontak : {item?.no_hp}
                        </Text>
                    </View>

                    <View style={{ justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 5 }}>
                        <Text style={{fontSize: wp(5), fontWeight: 'bold'}}>
                            Jenis lapangan :
                            { 
                                jenisL.map((jenis, index) => (
                                    <Text key={index}>
                                        {jenis.jenis_lapangan.jenis_lapangan}
                                        {index !== jenisL.length - 1 ? ', ' : ''}
                                    </Text>
                                ))
                            }
                        </Text>
                    </View>
                </View>

                <View
                    className="space-y-1 mx-1 mb-4 bg-[#BCD8A6] rounded-3xl p-1 pl-1"
                >
                    <View
                        style={{
                            alignItems: 'center',
                        }}
                    >
                    </View>
                    <View className="flex-row justify-between items-center p-1 py-1 mb-1">
                        <Text style={{fontSize: wp(5)}} className="font-bold text-neutral-700">
                            Jam Operasional
                        </Text>
                        <View className="flex-row justify-end items-center p-1 py-1 mb-1">
                            <ClockIcon size={wp(5)} color={"white"} />
                        </View>
                    </View>
                    
                    <View>
                            <View className="justify-between flex-row" style={{ marginBottom: 7 }}>
                                <Text style={{ fontSize: wp(4) }} className="text-sans-700">
                                    Senin - Minggu :
                                </Text>
                                <Text style={{ fontSize: wp(4) }} className="text-sans-700">
                                    {item.jam_buka} - {item.jam_tutup}
                                </Text>
                            </View>
                    </View>
                </View>

                <View
                    className="space-y-1 mx-1 mb-4 bg-[#BCD8A6] rounded-3xl p-1 pl-1"
                >
                    <View
                        style={{
                            alignItems: 'center',
                        }}
                    >
                    </View>
                    <View className="flex-row justify-between items-center p-1 py-1 mb-1">
                        <Text style={{fontSize: wp(5)}} className="font-bold text-neutral-700">
                            Fasilitas & Peraturan
                        </Text>
                        <View className="flex-row justify-end items-center p-1 py-1 mb-1">
                            <Bars3Icon size={wp(5)} color={"white"} />
                        </View>
                    </View>
                    

                    <View className="justify-between items-baseline ml-1" style={{ marginBottom: 7 }} >
                        <View style={{ width: wp(80) }}>
                            <RenderHtml contentWidth={wp(80)} source={content}/>
                        </View>
                    </View>
                </View>

                <View
                    className="space-y-1 mx-1 mb-4 bg-[#BCD8A6] rounded-3xl p-1 pl-1"
                >
                    <View
                        style={{
                            alignItems: 'center',
                        }}
                    >
                    </View>
                    <View className="flex-row justify-between items-center p-1 py-1 mb-1">
                        <Text style={{fontSize: wp(5)}} className="font-bold text-neutral-700">
                            Lokasi
                        </Text>
                        <View className="flex-row justify-end items-center p-1 py-1 mb-1">
                            <MapPinIcon size={wp(5)} color={"white"} />
                        </View>
                    </View>
                    
                    <View className="flex-row" style={{ marginBottom: 7 }}>
                        <Text style={{ fontSize: wp(4) }} className="text-sans-700">
                            {item.alamat}
                        </Text>
                    </View>
                    <View className="flex-row" style={{ marginBottom: 7 }}>
                        <MapPinIcon size={wp(5)} color={"white"} />
                        <Text style={{ fontSize: wp(4) }} className="text-sans-700">
                            8 KM
                        </Text>
                    </View>
                    <View className="flex-row items-center" style={{ marginBottom: 7}}>
                        <Text style={{ fontSize: wp(5) }} className="text-sans-700">
                            Petunjuk Jalan
                        </Text>
                    </View>
                    <View className="flex-row items-center rounded-3xl" style={{ marginBottom: 7}} >
                        <MapView style= {{width: 350,height: 250, marginBottom: 10}}/>
                    </View>
                </View>

                <View
                    className="space-y-1 mx-1 mb-1 bg-[#BCD8A6] rounded-3xl p-1 pl-1"
                >
                    <View
                        style={{
                            alignItems: 'center',
                        }}
                    >
                    </View>
                    <View className="flex-row justify-between items-center p-1 py-1 mb-1">
                        <Text style={{fontSize: wp(5)}} className="font-bold text-neutral-700">
                            Penilaian
                        </Text>
                        <View className="flex-row justify-end items-center p-1 py-1 mb-1">
                            <StarIcon size={wp(5)} color={"white"} />
                        </View>
                    </View>
                    
                    <View className="mx-2 flex-wrap justify-between">
                        <View 
                            style={{width: wp(83), height: wp(15)}}
                            className="bg-[#FFF9E8] flex-row justify-between p-1 py-1 mb-11 rounded-3xl items-center"
                        >
                            <Text style={{fontSize: wp(5)}} className="font-bold text-neutral-700">{starRating ? `${starRating}*` : 'Tap to rate'}</Text>
                            <TouchableOpacity onPress={() => setStarRating(1)}>
                            <MaterialIcons
                                name={starRating >= 1 ? 'star' : 'star-border'}
                                size={32}
                                style={starRating >= 1 ? "red": "white"}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setStarRating(2)}>
                                <MaterialIcons
                                name={starRating >= 2 ? 'star' : 'star-border'}
                                size={32}
                                style={starRating >= 2 ? "red": "white"}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setStarRating(3)}>
                                <MaterialIcons
                                name={starRating >= 3 ? 'star' : 'star-border'}
                                size={32}
                                style={starRating >= 3 ? "red": "white"}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setStarRating(4)}>
                                <MaterialIcons
                                name={starRating >= 4 ? 'star' : 'star-border'}
                                size={32}
                                style={starRating >= 4 ? "red": "white"}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setStarRating(5)}>
                                <MaterialIcons
                                name={starRating >= 5 ? 'star' : 'star-border'}
                                size={32}
                                style={starRating >= 5 ? "red": "white"}
                                />
                            </TouchableOpacity>
                        </View>

                        <View className="flex-row justify-between items-center p-1 py-1 mb-1">
                            <View
                                style={{
                                flexDirection: "column",
                                marginBottom: 6,
                                }}
                            >
                                <View
                                style={{
                                    height: 44,
                                    width: 250,
                                    borderColor: COLORS.secondaryGray,
                                    borderWidth: 1,
                                    borderRadius: 4,
                                    marginVertical: 6,
                                    justifyContent: "center",
                                    paddingLeft: 8,
                                }}
                                >
                                <TextInput
                                    placeholder='Berikan komentar...'
                                    placeholderTextColor={'gray'}
                                    className="flex-1 text-base mb-1 pl-1 tracking-wider"
                                />
                                </View>
                            </View>
                            <TouchableOpacity className="bg-[#FFF9E8] flex-row justify-end items-center p-1 py-1 mb-1 rounded-3xl">
                                <PaperAirplaneIcon size={wp(8)} color={"black"} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
        <View
            className="bg-[#BCD8A6] flex-row justify-between rounded-2xl items-center p-1 py-1 "
        >
            <Text style={{fontSize: wp(5)}} className="font-bold text-neutral-700">
                Mulai dari : {minHarga}
            </Text>
            <TouchableOpacity style={{backgroundColor: COLORS.white, height: wp(10), width: wp(25), marginTop: 2, marginBottom: 2}} className="mb-2 mx-3 flex justify-center items-center rounded-full" onPress={openModal}>
                <Text className="text-black font-bold" style={{fontSize: wp(5.5)}}>Pesan</Text>
            </TouchableOpacity>
        </View>
    </View>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0,0,0,0.5)' // Overlay semi-transparent
    },
    modalDialog: {
        width: '80%',
        height: '40%', // Anda bisa atur sesuai keinginan
        backgroundColor: 'transparent'
    },
    modalScrollView: {
        flexGrow: 1
    },
    modalContent: {
        flex: 1,
        backgroundColor: "#BCD8A6",
        borderRadius: 10,
    },
    modalHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#e5e5e5"
    },
    modalTitle: {
        fontSize: 18,
        color: "#FFF9E8"
    },
    closeButton: {
        fontSize: 16,
        color: "#007bff"
    },
    modalBody: {
        padding: 15
    },
    container: {
        flex: 1,
    },
    rowCols2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap'
    },
    col: {
        width: '48%',
        marginBottom: 10
    },
    button: {
        padding: 10,
        backgroundColor: "#e5e5e5",
        alignItems: "center",
        borderRadius: 5
    }
});