import * as SplashScreen from 'expo-splash-screen'
import { useFonts } from 'expo-font'
import { useCallback } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

{/* dev */}
import BottomTabNavigation from './src/navigation/BottonTabNavigation'
import { Welcome } from './src/screens'
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

const Stack = createNativeStackNavigator()

SplashScreen.preventAutoHideAsync()
export default function App() {
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
        if (fontsLoaded) {
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
                    {/* Auth */}

                    {/* SplashScreen */}
                    <Stack.Screen
                        name="Welcome"
                        component={Welcome}
                        options={{
                            headerShown: false,
                        }}
                    />

                    {/* Ekstra */}
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

                    {/* BottomNav */}
                    <Stack.Screen
                        name="BottomTabNavigation"
                        component={BottomTabNavigation}
                        options={{
                            headerShown: false,
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    )
}
