import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Dashboard, Earnings } from './screens';
import { useFonts } from "expo-font";

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    "Regular": require("./assets/fonts/Montserrat-Regular.ttf"),
    "Bold": require("./assets/fonts/Montserrat-Bold.ttf")
  });

  if(!fontsLoaded) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Ahorros"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Dashboard" component={Dashboard}/>
        <Stack.Screen name="Ahorros" component={Earnings}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}