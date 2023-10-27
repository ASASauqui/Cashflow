import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { checkToken } from '../api/users';
import { getUserInfo, updateUserInfo, updatePassword } from '../api/userInfo';
import * as SecureStore from 'expo-secure-store';
import { useIsFocused } from '@react-navigation/native';
import { Alert } from 'react-native';
import { CustomButton } from '../components';

const Profile = ({ navigation }) => {
    const isFocused = useIsFocused(),
        [token, setToken] = useState(''),
        [userInfo, setUserInfo] = useState({}),
        [isLoading, setIsLoading] = useState(false);

    const checkUserToken = async (token) => {
        try {
            const res = await checkToken(token);
            if (res.data !== undefined) {
                setToken(token);
            }
        } catch (error) {
            Alert.alert('Error', "El token es inválido");
            navigation.navigate('Login');
        }
    },
        handleGetUserInfo = async () => {
            setIsLoading(true);
            try {
                const res = await getUserInfo(token);
                if (res.data !== undefined) {
                    setUserInfo(res.data);
                }
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                Alert.alert('Error', "No se pudieron obtener los datos del usuario");
            }
        },
        handleUpdateUserInfo = async (name, email, phone, profileImage) => {
            try {
                body = {
                    name: name,
                    email: email,
                    phone: phone,
                    profileImage: profileImage,
                }

                const res = await updateUserInfo(token, body);
                if (res.data !== undefined) {
                    Alert.alert('Éxito', "Datos actualizados correctamente");
                }
            } catch (error) {
                Alert.alert('Error', "No se pudieron actualizar los datos del usuario");
            }
        },
        handleUpdatePassword = async (currentPassword, newPassword) => {
            try {
                body = {
                    currentPassword: currentPassword,
                    newPassword: newPassword,
                }

                const res = await updatePassword(token, body);
                if (res.data !== undefined) {
                    Alert.alert('Éxito', "Contraseña actualizada correctamente");
                }
            } catch (error) {
                Alert.alert('Error', "No se pudo actualizar la contraseña");
            }
        },
        handleLogout = async () => {
            await SecureStore.deleteItemAsync('token');
            navigation.navigate('Login');
        },
        handleSubmitUpdateUserInfo = async (values) => {
            const { name, email, phone, profileImage } = values;

            handleUpdateUserInfo(name, email, phone, profileImage);
            handleGetUserInfo();
        },
        handleSubmitUpdatePassword = async (values) => {
            const { currentPassword, newPassword, confirmNewPassword } = values;

            if (newPassword !== confirmNewPassword) {
                Alert.alert('Error', "Las contraseñas no coinciden");
                return;
            }

            handleUpdatePassword(currentPassword, newPassword);
            handleGetUserInfo();
        };

    useEffect(() => {
        SecureStore.getItemAsync('token').then((token) => {
            if (token) {
                checkUserToken(token);
            }
        });
    }, [isFocused]);

    useEffect(() => {
        if (token !== '') {
            handleGetUserInfo();
        }
    }, [isFocused, token]);

    return (
        <View style={styles.profile_container}>
            <View style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 10, paddingTop: 50, paddingBottom: 40, gap: 10 }}>
                <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {userInfo.profileImage ? (
                        <Image
                            source={{ uri: userInfo.profileImage }}
                            style={styles.profile_image}
                        />
                    ) : (
                        <View
                            style={{
                                width: 150,
                                height: 150,
                                borderRadius: 100,
                                backgroundColor: '#2c5e93',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Text style={{ fontSize: 60, color: 'white', fontWeight: 'bold' }}>{userInfo.name ? userInfo.name.charAt(0) : ''}
                            </Text>
                        </View>
                    )}
                </View>
                <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7 }}>
                    <Text style={{ fontSize: 20, fontFamily: 'Bold', color: 'white' }}>{userInfo.name}
                    </Text>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 9 }}>
                        <FontAwesome name="phone" size={20} color="white" />
                        <Text style={{ color: 'white', fontSize: 15, fontFamily: 'Regular' }}>+52 ({userInfo.phone ? userInfo.phone.substring(0, 3) : ''}) {userInfo.phone ? userInfo.phone.substring(3, 6) : ''} {userInfo.phone ? userInfo.phone.substring(6, 10) : ''}
                        </Text>
                    </View>
                </View>
            </View>

            <ScrollView style={{ width: '100%', paddingHorizontal: 10, borderTopLeftRadius: 40, borderTopRightRadius: 40, backgroundColor: 'white' }}>
                {!isLoading ? (
                <View style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: 20, padding: 10, gap: 20 }}>
                    <Formik
                        initialValues={userInfo}
                        onSubmit={(values) => {
                            handleSubmitUpdateUserInfo(values);
                        }}
                    >
                        {
                            ({ handleChange, handleSubmit, values }) => (
                                <View>
                                    <Text style={{ fontSize: 20, fontFamily: 'Bold', marginBottom: 10 }}
                                    >Editar perfil</Text>
                                    <Text style={styles.label}>Nombre</Text>
                                    <TextInput
                                        keyboardType='default'
                                        onChangeText={handleChange('name')}
                                        value={values.name}
                                        style={styles.field}
                                    />
                                    <Text style={styles.label}>Teléfono</Text>
                                    <TextInput
                                        keyboardType='phone-pad'
                                        onChangeText={handleChange('phone')}
                                        value={values.phone}
                                        style={styles.field}
                                    />
                                    <Text style={styles.label}>Correo electrónico</Text>
                                    <TextInput
                                        keyboardType='email-address'
                                        onChangeText={handleChange('email')}
                                        value={values.email}
                                        style={styles.field}
                                    />
                                    <Text style={styles.label}>Imagen</Text>
                                    <TextInput
                                        keyboardType='default'
                                        onChangeText={handleChange('profileImage')}
                                        value={values.profileImage}
                                        style={styles.field}
                                    />
                                    <View>
                                        <CustomButton title='Guardar cambios' onPress={handleSubmit} type='blue' />
                                    </View>
                                </View>
                            )
                        }
                    </Formik>
                    <Formik
                        initialValues={{
                            currentPassword: '',
                            newPassword: '',
                            confirmNewPassword: '',
                        }}
                        onSubmit={(values) => {
                            handleSubmitUpdatePassword(values)
                        }}
                    >
                        {
                            ({ handleChange, handleSubmit, values }) => (
                                <View>
                                    <Text style={{ fontSize: 20, fontFamily: 'Bold', marginBottom: 10, marginTop: 50 }}
                                    >Cambiar contraseña</Text>
                                    <Text style={styles.label}>Contraseña actual</Text>
                                    <TextInput
                                        keyboardType='default'
                                        onChangeText={handleChange('currentPassword')}
                                        value={values.currentPassword}
                                        secureTextEntry={true}
                                        style={styles.field}
                                    />
                                    <Text style={styles.label}>Nueva contraseña</Text>
                                    <TextInput
                                        keyboardType='default'
                                        onChangeText={handleChange('newPassword')}
                                        value={values.newPassword}
                                        secureTextEntry={true}
                                        style={styles.field}
                                    />
                                    <Text style={styles.label}>Confirmar nueva contraseña</Text>
                                    <TextInput
                                        keyboardType='default'
                                        onChangeText={handleChange('confirmNewPassword')}
                                        value={values.confirmNewPassword}
                                        secureTextEntry={true}
                                        style={styles.field}
                                    />
                                    <View>
                                        <CustomButton title='Cambiar contraseña' onPress={handleSubmit} type='blue' />
                                    </View>
                                </View>
                            )
                        }
                    </Formik>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() => navigation.navigate('Login')}
                        style={{ flex: 1, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'end', gap: 10, marginTop: 30, marginBottom: 100 }}
                    >
                        <FontAwesome name="power-off" size={24} color="red" />
                        <Text style={{ fontSize: 18, color: 'red', fontFamily: 'Bold' }} onPress={handleLogout}>Cerrar sesión</Text>
                    </TouchableOpacity>
                </View>
                ) : (
                    // Loading
                    <View style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: 20, padding: 10, gap: 20 }}>
                        <FontAwesome name="spinner" size={50} color="#5893d4" />
                    </View>
                )}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    profile_container: {
        width: '100%',
        height: '100%',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#5893d4',
    },
    profile_image: {
        width: 150,
        height: 150,
        borderRadius: 100
    },
    field: {
        width: 300,
        borderWidth: 1,
        borderColor: '#5893d4',
        borderRadius: 10,
        padding: 5,
        marginBottom: 20,
        fontFamily: 'Regular',
    },
    label: {
        fontSize: 15,
        fontFamily: 'Regular',
        marginBottom: 10,
        textAlign: 'left',
    },
});

export default Profile;
