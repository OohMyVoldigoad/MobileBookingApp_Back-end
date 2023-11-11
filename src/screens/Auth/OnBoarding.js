import { View, Text, Pressable, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from '../../constans';

const OnBoarding = ({ navigation }) => {

    return (
        <LinearGradient
            style={{
                flex: 1
            }}
            colors={[COLORS.primary, COLORS.white]}
        >
            <View style={{ flex: 1 }}>
                <View>
                    <Image
                        source={require("../../../assets/ICON.jpg")}
                        style={{
                            height: 100,
                            width: 100,
                            borderRadius: 20,
                            position: "absolute",
                            top: 10,
                            transform: [
                                { translateX: 20 },
                                { translateY: 50 },
                                { rotate: "-15deg" }
                            ]
                        }}
                    />

                    <Image
                        source={require("../../../assets/dummy/badminton.jpg")}
                        style={{
                            height: 100,
                            width: 100,
                            borderRadius: 20,
                            position: "absolute",
                            top: -30,
                            left: 100,
                            transform: [
                                { translateX: 50 },
                                { translateY: 50 },
                                { rotate: "-5deg" }
                            ]
                        }}
                    />

                    <Image
                        source={require("../../../assets/dummy/ball.jpg")}
                        style={{
                            width: 100,
                            height: 100,
                            borderRadius: 20,
                            position: "absolute",
                            top: 130,
                            left: -50,
                            transform: [
                                { translateX: 50 },
                                { translateY: 50 },
                                { rotate: "15deg" }
                            ]
                        }}
                    />

                    <Image
                        source={require("../../../assets/ICON.jpg")}
                        style={{
                            height: 200,
                            width: 200,
                            borderRadius: 20,
                            position: "absolute",
                            top: 110,
                            left: 100,
                            transform: [
                                { translateX: 50 },
                                { translateY: 50 },
                                { rotate: "-15deg" }
                            ]
                        }}
                    />
                </View>

                {/* content  */}

                <View style={{
                    paddingHorizontal: 22,
                    position: "absolute",
                    top: 400,
                    width: "100%"
                }}>
                    <Text style={{
                        fontSize: 50,
                        fontWeight: 800,
                        color: COLORS.button
                    }}>Let's Get</Text>
                    <Text style={{
                        fontSize: 46,
                        fontWeight: 800,
                        color: COLORS.button
                    }}>Started</Text>

                    <View style={{ marginVertical: 22 }}>
                        <Text style={{
                            fontSize: 16,
                            color: COLORS.button,
                            marginVertical: 4
                        }}>Cari lapangan yang ingin kamu pesan</Text>
                        <Text style={{
                            fontSize: 16,
                            color: COLORS.button,
                        }}>Pemesanan lapangan dan saran lapangan terdekat</Text>
                    </View>

                    <TouchableOpacity
                        onPress={() => navigation.navigate("SignUp")}
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
                        <Text style={{color: COLORS.white}}>Register</Text>
                    </TouchableOpacity>

                    <View style={{
                        flexDirection: "row",
                        marginTop: 12,
                        justifyContent: "center"
                    }}>
                        <Text style={{
                            fontSize: 16,
                            color: COLORS.button
                        }}>Already have an account ?</Text>
                        <Pressable
                            onPress={() => navigation.navigate("Login")}
                        >
                            <Text style={{
                                fontSize: 16,
                                color: COLORS.button,
                                fontWeight: "bold",
                                marginLeft: 4
                            }}>Login</Text>
                        </Pressable>

                    </View>
                </View>
            </View>
        </LinearGradient>
    )
}

export default OnBoarding