import * as SplashScreen from 'expo-splash-screen'
import React from 'react'
import { useFonts } from 'expo-font'
import { useCallback } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AsyncStorage from '@react-native-async-storage/async-storage'

{/* dev */}
import BottomTabNavigation from './src/navigation/BottonTabNavigation'
import { OnBoarding, Welcome } from './src/screens'
import { EditProfile } from './src/screens'
import { Settings } from './src/screens'
import { Search } from './src/screens'
import { Notifications } from './src/screens'
import { CabangOlahraga } from './src/screens'
import { Lapangan } from './src/screens'
import { Company } from './src/screens'
import { ReviewOrder } from './src/screens'
import { MethodePay } from './src/screens'
import { Detail } from './src/screens'
import { Login } from './src/screens'
import { Signup } from './src/screens'

const Stack = createNativeStackNavigator()

SplashScreen.preventAutoHideAsync()

export default function App() {
    const [isLoading, setIsLoading] = React.useState(true);
    const [userToken, setUserToken] = React.useState(null);
    // React.useEffect(() => {
    // // Check the token on app start
    // const checkToken = async () => {
    //     let token;
    //     try {
    //         token = await AsyncStorage.getItem('userToken');
    //         setUserToken(token);
    //     } catch (e) {
    //         console.error(e);
    //     }
    //     // Simulate some startup delay
    //     setTimeout(() => {
    //         setIsLoading(false);
    //     }, 1000);
    // };

    // checkToken();
    // }, []);

    const [fontsLoaded] = useFonts({
        black: require('./assets/fonts/Poppins-Black.ttf'),
        regular: require('./assets/fonts/Poppins-Regular.ttf'),
        bold: require('./assets/fonts/Poppins-Bold.ttf'),
        medium: require('./assets/fonts/Poppins-Medium.ttf'),
        mediumItalic: require('./assets/fonts/Poppins-MediumItalic.ttf'),
        semiBold: require('./assets/fonts/Poppins-SemiBold.ttf'),
        semiBoldItalic: require('./assets/fonts/Poppins-SemiBoldItalic.ttf'),
    })

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded, isLoading) {
            await SplashScreen.hideAsync()
        }
    }, [fontsLoaded])

    if (!fontsLoaded) {
        return null
    }
    return (
        <SafeAreaProvider onLayout={onLayoutRootView}>
        <NavigationContainer>
        <Stack.Navigator>
            {/* { AsyncStorage.getItem('userToken') == null ? ( */}
            <>
                <Stack.Screen
                name="OnBoarding"
                component={OnBoarding}
                options={{ headerShown: false }}
                />
                <Stack.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }}
                />
                <Stack.Screen
                name="SignUp"
                component={Signup}
                options={{ headerShown: false }}
                />
            </>
            {/* ) : (  */}
            <>
                <Stack.Screen
                name="Welcome"
                component={Welcome}
                options={{ headerShown: false }}
                />
                {/* Your other screens go here */}
                <Stack.Screen
                        name="EditProfile"
                        component={EditProfile}
                        options={{
                            headerShown: false
                        }}
                    />
                    <Stack.Screen
                        name="Settings"
                        component={Settings}
                        options={{
                            headerShown: false
                        }}
                    />
                    <Stack.Screen
                        name="Search"
                        component={Search}
                        options={{
                            headerShown: false
                        }}
                    />
                    <Stack.Screen
                        name="Notifications"
                        component={Notifications}
                        options={{
                            headerShown: false
                        }}
                    />
                    <Stack.Screen
                        name="cabangOlahraga"
                        component={CabangOlahraga}
                        options={{
                            headerShown: false
                        }}
                    />
                    <Stack.Screen
                        name="Lapangan"
                        component={Lapangan}
                        options={{
                            headerShown: false
                        }}
                    />
                    <Stack.Screen
                        name="Company"
                        component={Company}
                        options={{
                            headerShown: false
                        }}
                    />
                    <Stack.Screen
                        name="ReviewOrder"
                        component={ReviewOrder}
                        options={{
                            headerShown: false
                        }}
                    />
                    <Stack.Screen
                        name="Methode"
                        component={MethodePay}
                        options={{
                            headerShown: false
                        }}
                    />
                    <Stack.Screen
                        name="Detail"
                        component={Detail}
                        options={{
                            headerShown: false
                        }}
                    />
                {/* ... */}
                <Stack.Screen
                name="BottomTabNavigation"
                component={BottomTabNavigation}
                options={{ headerShown: false }}
                />
            </>
            {/* )} */}
        </Stack.Navigator>
        </NavigationContainer>
    </SafeAreaProvider>
    )
}
