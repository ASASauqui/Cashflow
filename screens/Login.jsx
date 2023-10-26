import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Alert, Image } from 'react-native'; 
import { LinearGradient } from 'expo-linear-gradient';
import logo from "../assets/img/logo2.png"
import { CustomButton } from '../components';
import { login, checkToken } from '../api/users';
import * as SecureStore from 'expo-secure-store';

const Login = ({ navigation }) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        SecureStore.getItemAsync('token').then((token) => {
            if (token) {
                console.log(token);
                checkUserToken(token);
            }
        });
    }, []);

    const checkUserToken = async ( token ) => {
        try {
            const res = await checkToken(token);
            if(res.data !== undefined ){
                console.log(res.data);
                navigation.navigate('DashboardTabs');   
            }
        } catch (error) {
            console.log(error.response.data.message);
            navigation.navigate('Login');  
        }
    }

    const handleLogin = async () => {
        if (phoneNumber.trim() === '' || password.trim() === '') {
            Alert.alert('Error', 'Ambos campos son obligatorios');
            return;
        }

        try {
            const body = {
                phone: phoneNumber,
                password: password,
            }

            const res = await login(body);


            if(res.data !== undefined ){
                console.log(res.data.data.token);
                await SecureStore.setItemAsync('token', res.data.data.token);
                setPassword('');
                setPhoneNumber('');
                Alert.alert('Sesión iniciada con éxito', 'Bienvenido a Cashflow');
                navigation.navigate('DashboardTabs');   
            }
        } catch (error) {
            console.log(error.response.data.message);
            Alert.alert('Error', "Hubo un error al iniciar sesión");
        }
    };

    const handleToRegister = () => {
        navigation.navigate('Register');
    };

    return (
        <LinearGradient colors={["#5893d4", "#67a7ed"]} style={styles.background}>
            <View style={styles.container}>
                <Image source={logo} style={styles.logo} />

                <TextInput
                    placeholder="Número de teléfono"
                    style={styles.input}
                    keyboardType="phone-pad"
                    onChangeText={setPhoneNumber}
                    value={phoneNumber}
                />

                <TextInput
                    placeholder="Contraseña"
                    style={styles.input}
                    secureTextEntry={true}
                    onChangeText={setPassword}
                    value={password}
                />

                <CustomButton title='Iniciar Sesión' onPress={handleLogin} type='white'/>
                <CustomButton title='Crear cuenta nueva' onPress={handleToRegister} type='white'/>

            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 20
    },
    input: {
        width: '100%',
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'white',
        marginBottom: 15,
        fontSize: 16,
        fontFamily: 'Regular',
    },
    logo: {
        width: 300,
        height: 300,
        marginBottom: 0,
        resizeMode: 'contain',
    },
    buttonContainer: {
        width: '100%',
        marginBottom: 10,
    }
});

export default Login;
