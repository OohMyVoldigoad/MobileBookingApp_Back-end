import {
  View,
  Text,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  FlatList
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import { SceneMap, TabBar, TabView} from "react-native-tab-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native";
import { useIsFocused } from '@react-navigation/native';
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';

{/* dev */}
import { COLORS, FONTS, SIZES, images, Storage } from "../constans";

const FirstRoute = () => (
  <View style={{ flex: 1, backgroundColor: COLORS.white }}>
    <FlatList
      data={images}
      numColumns={3}
      renderItem={({ item, index }) => (
          <View
          style={{
              flex: 1,
              aspectRatio: 1,
              margin: 3,
          }}
          >
          <Image
              key={index}
              source={item}
              style={{ width: "100%", height: "100%", borderRadius: 12 }}
          />
          </View>
      )}
    />
  </View>
);

const SecondRoute = () => (
  <View style={{ flex: 1, backgroundColor: COLORS.black }} />
);

const ThirdRoute = () => (
  <View style={{ flex: 1, backgroundColor: COLORS.white }} />
);

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
  third: ThirdRoute
});

const renderTabBar = (props) => (
  <TabBar
  {...props}
  indicatorStyle={{
      backgroundColor: COLORS.primary,
  }}
  style={{
      backgroundColor: COLORS.primary,
      height: 44,
  }}
  renderLabel={({ focused, route }) => (
      <Text style={[{ color: focused ? COLORS.white : COLORS.black }]}>
        {route.title}
      </Text>
  )}
  />
);

const Profile = (props) => {
  const paycheck = {
    prosesBerhasil: props.route.params?.prosesBerhasil || false,
    type: props.route.params?.type || '',
    notifikasi: props.route.params?.notifikasi || '',
  };
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [Nama, setName] = useState("")
  const [image, setImage] = useState("")

  React.useEffect(() => {
      const fetchData = async () => {
          try {
              setName(await AsyncStorage.getItem('userNama'))
              setImage(await AsyncStorage.getItem('userFoto'))
          } catch (error) {
              console.error("Terjadi kesalahan saat mengambil data:", error);
          }
      };

      if (isFocused) {
      fetchData();
    }
  }, [isFocused]); 

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

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}
    >
      <StatusBar backgroundColor={COLORS.gray} />
      <View style={{ width: "100%" }}>
        <Image
          source={images.bg}
          resizeMode="cover"
          style={{
            height: 228,
            width: "100%",
          }}
        />
      </View>

      <View style={{ flex: 1, alignItems: "center" }}>
        <Image
            source={
              image
                ? { uri: Storage.Storage + image }
                : require('../../assets/dummy/userp.png')
            }
          resizeMode="contain"
          style={{
            height: 155,
            width: 155,
            borderRadius: 999,
            borderColor: COLORS.primary,
            borderWidth: 2,
            marginTop: -90,
          }}
        />

        <Text
          style={{
            ...FONTS.h3,
            color: COLORS.primary,
            marginVertical: 8,
          }}
        >
          {Nama}
        </Text>
        <Text
          style={{
            color: COLORS.black,
            ...FONTS.body4,
          }}
        >
          Pen main
        </Text>

        <View
          style={{
            flexDirection: "row",
            marginVertical: 6,
            alignItems: "center",
          }}
        >
          <MaterialIcons name="location-on" size={24} color="black" />
          <Text
            style={{
              ...FONTS.body4,
              marginLeft: 4,
            }}
          >
            Batam, Indonesia
          </Text>
        </View>

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={{
              width: 124,
              height: 36,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: COLORS.primary,
              borderRadius: 10,
              marginHorizontal: SIZES.padding * 2,
            }}
            onPress={()=> navigation.navigate('EditProfile')}
          >
            <Text
              style={{
                ...FONTS.body4,
                color: COLORS.white,
              }}
            >
              Edit Profile
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              width: 124,
              height: 36,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: COLORS.primary,
              borderRadius: 10,
              marginHorizontal: SIZES.padding * 2,
            }}
            onPress={()=> navigation.navigate('Settings')}
          >
            <Text
              style={{
                ...FONTS.body4,
                color: COLORS.white,
              }}
            >
              Setting
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;