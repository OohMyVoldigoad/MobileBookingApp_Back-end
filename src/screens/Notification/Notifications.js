import { View, TouchableOpacity, Platform } from 'react-native'
import React from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native';

const ios = Platform.OS == 'ios';
const topMargin = ios? '': 'mt-10';

export default function Notifications() {
    const navigation = useNavigation();

  return (
    <View className="bg-white flex-1">

        {/* back button */}
        <SafeAreaView className={"flex-row justify-between items-center w-full absolute " + topMargin}>
            <TouchableOpacity
                onPress={()=> navigation.goBack()}
                className="p-2 rounded-full ml-4"
                style={{backgroundColor: 'black'}}
            >
                <ChevronLeftIcon size={wp(7)} strokeWidth={4} color="white" />
            </TouchableOpacity>
        </SafeAreaView>

        
    </View>
  )
}