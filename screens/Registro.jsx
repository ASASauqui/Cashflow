import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Registro = ({navigation}) => {
    const [nombre, setNombre] = useState('');
    const [telefono, setTelefono] = useState('');
    const [contraseña, setContraseña] = useState('');

    const handleRegistro = () => {
        if (nombre.trim() === '' || telefono.trim() === '' || contraseña.trim() === '') {
            Alert.alert('Error', 'Todos los campos son obligatorios');
            return;
        }

        // Aquí va la lógica de registro
        //console.log(nombre, telefono, contraseña);

        Alert.alert('Cuenta creada con éxito', 'Bienvenido a Cashflow');
        navigation.navigate('Login');
    };

    return (
        <LinearGradient colors={["#5893d4", "#67a7ed"]} style={styles.background}>
            <View style={styles.container}>
                <Text style={styles.title}>Registro</Text>

                <TextInput
                    placeholder="Nombre"
                    style={styles.input}
                    onChangeText={setNombre}
                    value={nombre}
                />

                <TextInput
                    placeholder="Número de teléfono"
                    style={styles.input}
                    keyboardType="phone-pad"
                    onChangeText={setTelefono}
                    value={telefono}
                />

                <TextInput
                    placeholder="Contraseña"
                    style={styles.input}
                    secureTextEntry={true}
                    onChangeText={setContraseña}
                    value={contraseña}
                />

                <Button title="Crear cuenta" onPress={handleRegistro} />
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
});

export default Registro;
