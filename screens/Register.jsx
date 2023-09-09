import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { CustomButton } from '../components';

const Register = ({navigation}) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = () => {
        if (name.trim() === '' || phone.trim() === '' || password.trim() === '') {
            Alert.alert('Error', 'Todos los campos son obligatorios');
            return;
        }

        // Aquí va la lógica de register

        Alert.alert('Cuenta creada con éxito', 'Bienvenido a Cashflow');
        navigation.navigate('Login');
    };


    const handleLogin = () => {
        navigation.navigate('Login');
    };

    return (
        <LinearGradient colors={["#5893d4", "#67a7ed"]} style={styles.background}>
            <View style={styles.container}>
                <Text style={styles.title}>Registro de usuario</Text>

                <TextInput
                    placeholder="Nombre"
                    style={styles.input}
                    onChangeText={setName}
                    value={name}
                />

                <TextInput
                    placeholder="Número de teléfono"
                    style={styles.input}
                    keyboardType="phone-pad"
                    onChangeText={setPhone}
                    value={phone}
                />

                <TextInput
                    placeholder="Contraseña"
                    style={styles.input}
                    secureTextEntry={true}
                    onChangeText={setPassword}
                    value={password}
                />

                <CustomButton title='Crear cuenta' onPress={handleRegister} type='white'/>
                <CustomButton title='Iniciar sesión' onPress={handleLogin} type='white'/>
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
        fontFamily: 'Bold',
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
});

export default Register;
