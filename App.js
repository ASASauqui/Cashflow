import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from "expo-font";

import { Earnings } from './screens';
import { Login } from './screens';
import { Dashboard } from './screens';
import { Registro } from './screens';

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
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen 
          name="Ahorros" 
          component={Earnings}
        />
        <Stack.Screen
          name="Login"
          component={Login}
        />
        <Stack.Screen
          name="Registro"
          component={Registro}
        />
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
} 