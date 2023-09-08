import { StyleSheet, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useFonts } from "expo-font";
import { BlurView } from 'expo-blur';
import { MaterialCommunityIcons, Ionicons, MaterialIcons } from '@expo/vector-icons';

import { Login, Register, Dashboard, Earnings, Outcomes, Profile } from './screens';

const Stack = createNativeStackNavigator(),
  Tab = createBottomTabNavigator(),
  inactiveItemColor = 'white',
  activeItemColor = '#007aff',
  screenOptions = {
    tabBarShowLabel: false,
    tabBarInactiveTintColor: inactiveItemColor,
    tabBarActiveTintColor: activeItemColor,
    tabBarStyle: {
      position: "absolute",
      height: 70,
      bottom: 0,
      right: 0,
      left: 0,
      borderTopLeftRadius: 100,
      borderTopRightRadius: 100,
      overflow: 'hidden',
    },
    tabBarBackground: () => (
      <BlurView tint="light" intensity={0} style={styles.navbar_blur} blurReductionFactor={0} />
    )
  };

const DashboardTabs = () => {
  return (
      <Tab.Navigator
        initialRouteName="Dashboard"
        screenOptions={screenOptions}
      >
        <Tab.Screen
          name="Movements"
          component={Outcomes}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <View style={focused ? styles.navbar_item_active : styles.navbar_item}>
                <MaterialIcons name="analytics" color={color} size={40} />
                {focused && <Text style={{color: activeItemColor, fontSize: 10}}>Analytics</Text>}
              </View>
            ),
          }}
        />

          <Tab.Screen
            name="Earnings"
            component={Earnings}
            options={{
              headerShown: false,
              tabBarIcon: ({ color, focused }) => (
                <View style={focused ? styles.navbar_item_active : styles.navbar_item}>
                  <MaterialIcons name="analytics" color={color} size={40} />
                  {focused && <Text style={{color: activeItemColor, fontSize: 10}}>Analytics</Text>}
                </View>
              ),
            }}
          />

        <Tab.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <View style={focused ? styles.navbar_item_active : styles.navbar_item}>
                <MaterialCommunityIcons name="view-dashboard" color={color} size={40} />
                {focused && <Text style={{color: activeItemColor, fontSize: 10}}>Dashboard</Text>}
              </View>
            ),
          }}
        />

        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <View style={focused ? styles.navbar_item_active : styles.navbar_item}>
                <Ionicons name="person" color={color} size={40} />
                {focused && <Text style={{color: activeItemColor, fontSize: 10}}>Profile</Text>}
              </View>
            ),
          }}
        />
      </Tab.Navigator>
  );
};

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
          name="Register"
          component={Register}
        />
        <Stack.Screen
          name="DashboardTabs"
          component={DashboardTabs}
        />
        <Stack.Screen
          name="Outcomes"
          component={Outcomes}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  navbar_blur: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      backgroundColor: '#5c98db80'
  },
  navbar_item: {
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: 'white',
      borderStyle: 'solid',
      borderBottomWidth: 5,
  },
  navbar_item_active: {
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderTopRightRadius: 100,
      borderTopLeftRadius: 100,
      backgroundColor: 'white',
  }
});