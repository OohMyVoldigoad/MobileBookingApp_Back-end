import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Image,
    TextInput,
  } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';

{/* dev */}
import { COLORS, FONTS, Api, Storage } from "../../constans";

  
const EditProfile = ({ navigation }) => {
  
const [selectedImage, setSelectedImage] = useState();
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [Oldemail, setOldEmail] = useState("");
const [Nohp, setNohp] = useState("");
const [id, setId] = useState("");
const [errorMessages, setErrorMessages] = useState({});
  
React.useEffect(() => {
  const fetchData = async () => {
      try {
          setName(await AsyncStorage.getItem('userNama'))
          setSelectedImage(await AsyncStorage.getItem('userFoto'))
          setOldEmail(await AsyncStorage.getItem('userEmail'))
          setEmail(await AsyncStorage.getItem('userEmail'))
          setNohp(await AsyncStorage.getItem('userNoHp'))
          setId(await AsyncStorage.getItem('akunId'))
      } catch (error) {
          console.error("Terjadi kesalahan saat mengambil data:", error);
      }
  };

  fetchData();
}, []);

const editProfile = async () => {
  const formData = new FormData();
  formData.append('old_email', Oldemail);
  formData.append('nama', name);
  formData.append('email', email);
  formData.append('no_hp', Nohp);
  if( selectedImage != null){
    formData.append('foto', {
      uri: selectedImage,
      type: 'image/jpeg', // asumsi gambar adalah jpeg, ubah sesuai kebutuhan
      name: 'img_profile.jpeg'
    });
  }

  try {
    const token = await AsyncStorage.getItem('userToken');
      // Kirim permintaan login ke server
    const response = await Api.post('/pelanggan/profile/'+ id, formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
    },
  });

    await AsyncStorage.setItem('userEmail', email);
    await AsyncStorage.setItem('userNama', name);
    await AsyncStorage.setItem('userNoHp', Nohp);
    // Jika Anda juga menyimpan foto dalam AsyncStorage, simpan nama file atau path baru ke foto
    if (selectedImage != null) {
      await AsyncStorage.setItem('userFoto', selectedImage);
    }
  // Handle respons dari server di sini
  console.log(response.data.notifikasi);

  navigation.navigate('Profile',{
    //notifikasi
    prosesBerhasil:true,
    notifikasi: response.data.notifikasi,
    type: response.data.type
  });

  } catch (error) {
      // Jika terjadi kesalahan, tangani pesan kesalahan dari server
      if (error.response && error.response.data && error.response.data.errors) {
          setErrorMessages(error.response.data.errors);
      }

      const alertType = error.response.data.type.toUpperCase();
      const type = ALERT_TYPE[alertType] || ALERT_TYPE.ERROR; 

      Toast.show({
          type: type,
          title: error.response.data.type,
          textBody: error.response.data.notifikasi,
          autoClose: 1500,
      });

      console.error('Ubah profile gagal:', error);
  }
};

  const handleImageSelection = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
      });
  
      if (!result.canceled) {
        setSelectedImage(result.assets[0].uri);
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
  
        <ScrollView>
          <View
            style={{
              alignItems: "center",
              marginVertical: 22,
            }}
          >
            <TouchableOpacity onPress={handleImageSelection}>
              <Image
                  source={
                    selectedImage
                      ? { uri: Storage.Storage + selectedImage }
                      : require('../../../assets/dummy/userp.png')
                  }
                style={{
                  height: 170,
                  width: 170,
                  borderRadius: 85,
                  borderWidth: 2,
                  borderColor: COLORS.primary,
                }}
              />
              {errorMessages.foto && (
                  <Text style={{ fontSize: 12, color: COLORS.error }}>
                      {errorMessages.foto[0]}
                  </Text>
              )}
  
              <View
                style={{
                  position: "absolute",
                  bottom: 0,
                  right: 10,
                  zIndex: 9999,
                }}
              >
                <MaterialIcons
                  name="photo-camera"
                  size={32}
                  color={COLORS.primary}
                />
              </View>
            </TouchableOpacity>
          </View>
  
          <View>
            <View
              style={{
                flexDirection: "column",
                marginBottom: 6,
              }}
            >
              <Text style={{ ...FONTS.h4 }}>Name</Text>
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
                  value={name}
                  onChangeText={(value) => setName(value)}
                  editable={true}
                />
              </View>
                {errorMessages.nama && (
                    <Text style={{ fontSize: 12, color: COLORS.error }}>
                        {errorMessages.nama[0]}
                    </Text>
                )}
            </View>
  
            <View
              style={{
                flexDirection: "column",
                marginBottom: 6,
              }}
            >
              <Text style={{ ...FONTS.h4 }}>Email</Text>
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
                  value={email}
                  onChangeText={(value) => setEmail(value)}
                  editable={true}
                />
            </View>
                {errorMessages.email && (
                    <Text style={{ fontSize: 12, color: COLORS.error }}>
                        {errorMessages.email[0]}
                    </Text>
                )}
              </View>

            <View
              style={{
                flexDirection: "column",
                marginBottom: 6,
              }}
            >
              <Text style={{ ...FONTS.h4 }}>Nomor Handphone</Text>
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
                  value={Nohp}
                  keyboardType="numeric"
                  onChangeText={(value) => setNohp(value)}
                  editable={true}
                />
              </View>
              {errorMessages.no_hp && (
                    <Text style={{ fontSize: 12, color: COLORS.error }}>
                        {errorMessages.no_hp[0]}
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
            onPress={editProfile}
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
  
  export default EditProfile;