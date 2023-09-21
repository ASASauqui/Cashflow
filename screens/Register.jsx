import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { CustomButton } from '../components';
import { register } from '../api/users';
import { REACT_APP_API_URL, REACT_APP_API_KEY } from '@env'

const Register = ({navigation}) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleRegister = async () => {
        if (name.trim() === '' || phone.trim() === '' || password.trim() === '') {
            Alert.alert('Error', 'Todos los campos son obligatorios');
            return;
        }

        try {
            const body = {
                name,
                phone,
                email,
                password,
            }

            const res = await register(body);

            if(res.data !== undefined ){
                setEmail('');
                setPassword('');
                setName('');
                setPhone('');
                Alert.alert('Cuenta creada con éxito', 'Bienvenido a Cashflow');
                navigation.navigate('Login');   
            }
        } catch (error) {
            console.log(error.response.data.message);
            Alert.alert('Error', error.response.data.message);
        }
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
                    placeholder="Correo electrónico"
                    style={styles.input}
                    onChangeText={setEmail}
                    value={email}
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
