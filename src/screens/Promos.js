import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LottieView from 'lottie-react-native';
import { COLORS } from '../constans';

export default function App() {
  return (
    <View style={styles.container}>
      <LottieView style={{ width: 100, height: 100 }} source={require('../../assets/imp/setting.json')} autoPlay loop/>
      <Text>Mohon maaf fitur ini sedang dalam pengerjaan.</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
