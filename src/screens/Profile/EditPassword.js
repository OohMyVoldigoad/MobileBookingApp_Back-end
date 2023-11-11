import {
View,
Text,
TouchableOpacity,
ScrollView,
TextInput,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';

{/* dev */}
import { COLORS, FONTS, Api } from "../../constans";

const EditPassword = ({ navigation }) => {

const [id, setId] = useState("")
const [isPasswordShown, setIsPasswordShown] = useState(true);
const [oldPassword, setOldPassword] = useState("");
const [newPassword, setNewPassword] = useState("");
const [confPassword, setConfPassword] = useState("");
const [errorMessages, setErrorMessages] = useState({});
    
React.useEffect(() => {
    const fetchData = async () => {
        try {
            setId(await AsyncStorage.getItem('akunId'))
        } catch (error) {
            console.error("Terjadi kesalahan saat mengambil data:", error);
        }
    };
    
    fetchData();
    }, []);

const editPassword = async () => {
    try {
        const token = await AsyncStorage.getItem('userToken');
        if(token){
            const tes = {
                password_lama : oldPassword,
                password_baru : newPassword,
                konf_password : confPassword
            }

            const response = await Api.post('/pelanggan/privacy/' + id, tes, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            console.log(response.data.notifikasi);

            navigation.navigate('Profile',{
                //notifikasi
                prosesBerhasil:true,
                notifikasi: response.data.notifikasi,
                type: response.data.type
            });
        }

    } catch (error) {
        // Jika terjadi kesalahan, tangani pesan kesalahan dari server
        if (error.response && error.response.data && error.response.data.errors) {
            setErrorMessages(error.response.data.errors);
        }

        const alertType = error.response.data.type.toUpperCase();
        const type = ALERT_TYPE[alertType] || ALERT_TYPE.ERROR; // Default ke ERROR jika tidak ditemukan

        Toast.show({
            type: type,
            title: error.response.data.type,
            textBody: error.response.data.notifikasi,
            autoClose: 1500,
        });

        console.error('Register gagal:', errorMessages);
    }
};

return (
    <SafeAreaView
    style={{
        flex: 1,
        backgroundColor: COLORS.white,
        paddingHorizontal: 22,
    }}
    >
        <View
            style={{
            marginHorizontal: 12,
            flexDirection: "row",
            justifyContent: "center",
            }}
        >
            <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
                position: "absolute",
                left: 0,
            }}
            >
            <MaterialIcons
                name="keyboard-arrow-left"
                size={24}
                color={COLORS.black}
            />
            </TouchableOpacity>

            <Text style={{ ...FONTS.h3 }}>Edit Profile</Text>
        </View>

        <ScrollView style={{ marginTop: 40 }}>
            <View>
                <View
                    style={{
                        flexDirection: "column",
                        marginBottom: 6,
                    }}
                >
                    <Text style={{ ...FONTS.h4 }}>Password lama</Text>
                    <View
                        style={{
                        height: 44,
                        width: "100%",
                        borderColor: COLORS.secondaryGray,
                        borderWidth: 1,
                        borderRadius: 4,
                        marginVertical: 6,
                        justifyContent: "center",
                        paddingLeft: 8,
                        }}
                    >
                        <TextInput
                            placeholder='Masukkan password lama'
                            value={oldPassword}
                            onChangeText={setOldPassword}
                            placeholderTextColor={COLORS.black}
                            secureTextEntry={isPasswordShown}
                            style={{
                                width: "100%"
                            }}
                        />

                        <TouchableOpacity
                            onPress={() => setIsPasswordShown(!isPasswordShown)}
                            style={{
                                position: "absolute",
                                right: 12
                            }}
                        >
                            {
                                isPasswordShown == true ? (
                                    <Ionicons name="eye-off" size={24} color={COLORS.black} />
                                ) : (
                                    <Ionicons name="eye" size={24} color={COLORS.black} />
                                )
                            }

                        </TouchableOpacity>
                    </View>
                    {errorMessages.password_lama && (
                        <Text style={{ fontSize: 12, color: COLORS.error }}>
                            {errorMessages.password_lama[0]}
                        </Text>
                    )}
                </View>

                    <View
                    style={{
                        flexDirection: "column",
                        marginBottom: 6,
                    }}
                    >
                    <Text style={{ ...FONTS.h4 }}>Password baru</Text>
                    <View
                        style={{
                        height: 44,
                        width: "100%",
                        borderColor: COLORS.secondaryGray,
                        borderWidth: 1,
                        borderRadius: 4,
                        marginVertical: 6,
                        justifyContent: "center",
                        paddingLeft: 8,
                        }}
                    >
                        <TextInput
                            placeholder='Masukkan password baru'
                            value={newPassword}
                            onChangeText={setNewPassword}
                            placeholderTextColor={COLORS.black}
                            secureTextEntry={isPasswordShown}
                            style={{
                                width: "100%"
                            }}
                        />

                        <TouchableOpacity
                            onPress={() => setIsPasswordShown(!isPasswordShown)}
                            style={{
                                position: "absolute",
                                right: 12
                            }}
                        >
                            {
                                isPasswordShown == true ? (
                                    <Ionicons name="eye-off" size={24} color={COLORS.black} />
                                ) : (
                                    <Ionicons name="eye" size={24} color={COLORS.black} />
                                )
                            }

                        </TouchableOpacity>
                    </View>
                    {errorMessages.password_baru && (
                        <Text style={{ fontSize: 12, color: COLORS.error }}>
                            {errorMessages.password_baru[0]}
                        </Text>
                    )}
                </View>

                    <View
                    style={{
                        flexDirection: "column",
                        marginBottom: 6,
                    }}
                    >
                    <Text style={{ ...FONTS.h4 }}>Konfirmasi password baru</Text>
                    <View
                        style={{
                        height: 44,
                        width: "100%",
                        borderColor: COLORS.secondaryGray,
                        borderWidth: 1,
                        borderRadius: 4,
                        marginVertical: 6,
                        justifyContent: "center",
                        paddingLeft: 8,
                        }}
                    >
                        <TextInput
                            placeholder='Konfirmasi password baru'
                            value={confPassword}
                            onChangeText={setConfPassword}
                            placeholderTextColor={COLORS.black}
                            secureTextEntry={isPasswordShown}
                            style={{
                                width: "100%"
                            }}
                        />

                        <TouchableOpacity
                            onPress={() => setIsPasswordShown(!isPasswordShown)}
                            style={{
                                position: "absolute",
                                right: 12
                            }}
                        >
                            {
                                isPasswordShown == true ? (
                                    <Ionicons name="eye-off" size={24} color={COLORS.black} />
                                ) : (
                                    <Ionicons name="eye" size={24} color={COLORS.black} />
                                )
                            }

                        </TouchableOpacity>
                    </View>
                    {errorMessages.konf_password && (
                        <Text style={{ fontSize: 12, color: COLORS.error }}>
                            {errorMessages.konf_password[0]}
                        </Text>
                    )}
                </View>
            </View>

            <TouchableOpacity
                style={{
                    backgroundColor: COLORS.primary,
                    height: 44,
                    borderRadius: 6,
                    alignItems: "center",
                    justifyContent: "center",
                }}
                onPress={editPassword}
                >
                <Text
                    style={{
                    ...FONTS.body3,
                    color: COLORS.black,
                    }}
                >
                    Save Change
                </Text>
            </TouchableOpacity>
        </ScrollView>
    </SafeAreaView>
);
};

export default EditPassword;