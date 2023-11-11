import { View, Text, Image , Pressable, TextInput, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from '../../constans/index';
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';

{/* dev */}
import { API, Api } from '../../constans';

const Login = ({ navigation, route }) => {
    const paycheck = {
        prosesBerhasil: route.params?.prosesBerhasil || false,
        type: route.params?.type || '',
        notifikasi: route.params?.notifikasi || '',
    };

    const [isPasswordShown, setIsPasswordShown] = useState(true);
    const [isChecked, setIsChecked] = useState(false);
    
    {/* Auth */}
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);

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

    const loginHandler = async () => {
        try {
            // Kirim permintaan login ke server
            const response = await Api.post('/login-pelanggan', {
                email: email,
                password: password,
            });
        
            // Handle respons dari server di sini
            console.log('Login berhasil:', response.data);
            // Simpan token ke AsyncStorage
            const userToken = response.data.token;

            //token login
            await AsyncStorage.setItem('userToken', userToken);

            //tabel user
            await AsyncStorage.setItem('akunId', response.data.user.id.toString());

            await AsyncStorage.setItem('userEmail', response.data.user.email);
            
            if (response.data.user.email_verified_at) {
                await AsyncStorage.setItem('userEmailVerifiedAt', response.data.user.email_verified_at);
            }
            await AsyncStorage.setItem('userRole', response.data.user.role);

            await AsyncStorage.setItem('userStatus', response.data.user.status);

            //tabel pelanggan
            await AsyncStorage.setItem('idPelanggan', response.data.user.pelanggan.id.toString());

            await AsyncStorage.setItem('userNama', response.data.user.pelanggan.nama);

            await AsyncStorage.setItem('userNoHp', response.data.user.pelanggan.no_hp);

            if (response.data.user.pelanggan.foto) {
                await AsyncStorage.setItem('userFoto', response.data.user.pelanggan.foto);
            }
            
            const alertType = response.data.type.toUpperCase();
            const type = ALERT_TYPE[alertType] || ALERT_TYPE.SUCCESS;
            Toast.show({
                type: type,
                title: response.data.type,
                textBody: response.data.notifikasi,
                autoClose: 1500,
            })    

            navigation.navigate('BottomTabNavigation', { name: 'Home' })
        
        } catch (error) {
            const alertType = error.response.data.type.toUpperCase();
            const type = ALERT_TYPE[alertType] || ALERT_TYPE.ERROR; // Default ke ERROR jika tidak ditemukan

            Toast.show({
                type: type,
                title: error.response.data.type,
                textBody: error.response.data.notifikasi,
                autoClose: 1500,
            });
            setErrorMessage('Username or password is wrong');
            console.log(error)
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <View style={{ flex: 1, marginHorizontal: 22 }}>
                <View style={{ marginVertical: 22 }}>
                    <Text style={{
                        fontSize: 22,
                        fontWeight: 'bold',
                        marginVertical: 12,
                        color: COLORS.black
                    }}>
                        Hi Welcome Back ! 👋
                    </Text>

                    <Text style={{
                        fontSize: 16,
                        color: COLORS.black
                    }}>Hello again you have been missed!</Text>
                    {errorMessage && (
                        <Text style={{
                            fontSize: 16,
                            color: 'red',
                            marginTop: 12
                        }}>
                            {errorMessage}
                        </Text>
                    )}
                </View>

                <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8
                    }}>Email address</Text>

                    <View style={{
                        width: "100%",
                        height: 48,
                        borderColor: COLORS.black,
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: 22
                    }}>
                        <TextInput
                            placeholder='Enter your email address'
                            value={email}
                            onChangeText={setEmail}
                            placeholderTextColor={COLORS.black}
                            keyboardType='email-address'
                            style={{
                                width: "100%"
                            }}
                        />
                    </View>
                </View>

                <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8
                    }}>Password</Text>

                    <View style={{
                        width: "100%",
                        height: 48,
                        borderColor: COLORS.black,
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: 22
                    }}>
                        <TextInput
                            placeholder='Enter your password'
                            value={password}
                            onChangeText={setPassword}
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
                </View>

                <View style={{
                    flexDirection: 'row',
                    marginVertical: 6
                }}>
                    <Checkbox
                        style={{ marginRight: 8 }}
                        value={isChecked}
                        onValueChange={setIsChecked}
                        color={isChecked ? COLORS.primary : undefined}
                    />

                    <Text>Remenber Me</Text>
                </View>

                <TouchableOpacity
                    onPress={loginHandler}
                    style={{
                        paddingBottom: 16,
                        paddingVertical: 10,
                        borderColor: COLORS.primary,
                        borderWidth: 2,
                        borderRadius: 12,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: COLORS.button
                    }}
                >
                    <Text style={{color: COLORS.white}}>Login</Text>
                </TouchableOpacity>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 20 }}>
                    <View
                        style={{
                            flex: 1,
                            height: 1,
                            backgroundColor: COLORS.grey,
                            marginHorizontal: 10
                        }}
                    />
                    <Text style={{ fontSize: 14 }}>Or Login with</Text>
                    <View
                        style={{
                            flex: 1,
                            height: 1,
                            backgroundColor: COLORS.grey,
                            marginHorizontal: 10
                        }}
                    />
                </View>

                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center'
                }}>
                    <TouchableOpacity
                        onPress={() => console.log("Pressed")}
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'row',
                            height: 52,
                            borderWidth: 1,
                            borderColor: COLORS.grey,
                            marginRight: 4,
                            borderRadius: 10
                        }}
                    >
                        <Image
                            source={require("../../../assets/dummy/facebook.png")}
                            style={{
                                height: 36,
                                width: 36,
                                marginRight: 8
                            }}
                            resizeMode='contain'
                        />

                        <Text>Facebook</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => console.log("Pressed")}
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'row',
                            height: 52,
                            borderWidth: 1,
                            borderColor: COLORS.grey,
                            marginRight: 4,
                            borderRadius: 10
                        }}
                    >
                        <Image
                            source={require("../../../assets/dummy/google.png")}
                            style={{
                                height: 36,
                                width: 36,
                                marginRight: 8
                            }}
                            resizeMode='contain'
                        />

                        <Text>Google</Text>
                    </TouchableOpacity>
                </View>

                <View style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginVertical: 22
                }}>
                    <Text style={{ fontSize: 16, color: COLORS.black }}>Don't have an account ? </Text>
                    <Pressable
                        onPress={() => navigation.navigate("SignUp")}
                    >
                        <Text style={{
                            fontSize: 16,
                            color: COLORS.black,
                            fontWeight: "bold",
                            marginLeft: 6
                        }}>Register</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Login