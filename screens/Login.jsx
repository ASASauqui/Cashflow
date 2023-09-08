import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Image } from 'react-native'; 
import { LinearGradient } from 'expo-linear-gradient';
import logo from "../assets/img/logo2.png"

const Login = ({ navigation }) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        if (phoneNumber.trim() === '' || password.trim() === '') {
            Alert.alert('Error', 'Ambos campos son obligatorios');
            return;
        }

        navigation.navigate('Dashboard');
    };

    const handleRegistro = () => {
        navigation.navigate('Registro');
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

                <View style={styles.buttonContainer}>
                    <Button title="Iniciar sesión" onPress={handleLogin} />
                </View>

                <View style={styles.buttonContainer}>
                    <Button title="Crear cuenta nueva" onPress={handleRegistro} />
                </View>
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
        borderRadius: 5,
        backgroundColor: 'white',
        marginBottom: 15,
        fontSize: 16,
    },
    logo: {
        width: 300,
        height: 300,
        marginBottom: 20,
        resizeMode: 'contain',
    },
    buttonContainer: {
        width: '100%',
        marginBottom: 10,
    }
});

export default Login;
