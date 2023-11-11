import { View, Text, Platform, Image } from "react-native";
import React from "react";
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { LinearGradient } from "expo-linear-gradient";

{/* dev */}
import { COLORS, FONTS, images } from "../constans";
import { Feedback, Home, Profile, Promos, Riwayat } from "../screens";

const Tab = createBottomTabNavigator()

const BottomTabNavigation = () => {
    return (
        <Tab.Navigator screenOptions={{
            tabBarShowLabel: false,
            headerShown: false,
            tabBarHideOnKeyboard: true,
            tabBarStyle: {
                position: 'absolute',
                bottom: 10,
                right: 10,
                left: 10,
                elevation: 0,
                height: 60,
                backgroundColor: '#BCD8A6',
                borderRadius: 20,
            }
        }}>

            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                            >
                                {focused ? (
                                    <>
                                    <Ionicons
                                        name="home"
                                        size={24}
                                        color={focused ? COLORS.white : COLORS.black}
                                    />
                                        <Text
                                            style={{
                                                ...FONTS.body3,
                                                color: COLORS.white,
                                            }}
                                        >
                                            Home
                                        </Text>
                                    </>
                                ) : (
                                    <Ionicons
                                        name="home-outline"
                                        size={24}
                                        color={focused ? COLORS.primary : COLORS.black}
                                    />
                                )}
                            </View>
                        )
                    },
                }}
            />
            <Tab.Screen
                name="Promos"
                component={Promos}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                            >
                                {focused ? (
                                    <>
                                    <Ionicons
                                        name="pricetags"
                                        size={24}
                                        color={focused ? COLORS.white : COLORS.black}
                                    />
                                        <Text
                                            style={{
                                                ...FONTS.body3,
                                                color: COLORS.white,
                                            }}
                                        >
                                            Promo
                                        </Text>
                                    </>
                                ) : (
                                    <Ionicons
                                        name="pricetags-outline"
                                        size={24}
                                        color={focused ? COLORS.primary : COLORS.black}
                                    />
                                )}
                            </View>
                        )
                    },
                }}
            />
            <Tab.Screen
                name="Feedback"
                component={Feedback}
                options={{
                    tabBarIcon: () => {
                        return (
                            <LinearGradient
                                colors={['#F68464', '#EEA849']}
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: Platform.OS == 'ios' ? 50 : 60,
                                    height: Platform.OS == 'ios' ? 50 : 60,
                                    top: Platform.OS == 'ios' ? -10 : -20,
                                    borderRadius: 25,
                                    borderColor: '#fff',
                                    borderWidth: 4,
                                }}
                            >
                                <Image
                                    source={images.logo}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        borderRadius: 20,
                                    }}
                                />
                            </LinearGradient>
                        )
                    },
                }}
            />
            <Tab.Screen
                name="Riwayat"
                component={Riwayat}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                            >
                                {focused ? (
                                    <>
                                    <Ionicons
                                        name="time"
                                        size={24}
                                        color={focused ? COLORS.white : COLORS.black}
                                    />
                                        <Text
                                            style={{
                                                ...FONTS.body3,
                                                color: COLORS.white,
                                            }}
                                        >
                                            Riwayat
                                        </Text>
                                    </>
                                ) : (
                                    <Ionicons
                                        name="time-outline"
                                        size={24}
                                        color={focused ? COLORS.primary : COLORS.black}
                                    />
                                )}
                            </View>
                        )
                    },
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                            >
                                {focused ? (
                                    <>
                                    <FontAwesome
                                        name="user-circle"
                                        size={24}
                                        color={focused ? COLORS.white : COLORS.black}
                                    />
                                        <Text
                                            style={{
                                                ...FONTS.body3,
                                                color: COLORS.white,
                                            }}
                                        >
                                            Profile
                                        </Text>
                                    </>
                                ) : (
                                    <FontAwesome
                                        name="user-circle"
                                        size={24}
                                        color={focused ? COLORS.primary : COLORS.black}
                                    />
                                )}
                            </View>
                        )
                    },
                }}
            />
        </Tab.Navigator>
    )
}

export default BottomTabNavigation