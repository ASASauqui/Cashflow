import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, Button, TouchableOpacity } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { checkToken } from '../api/users';
import { getUserInfo } from '../api/userInfo';
import * as SecureStore from 'expo-secure-store';
import { useIsFocused } from '@react-navigation/native';

const Profile = ({ navigation }) => {
    const isFocused = useIsFocused(),
        [token, setToken] = useState(''),
        [userInfo, setUserInfo] = useState({});

    const checkUserToken = async ( token ) => {
        try {
            const res = await checkToken(token);
            if(res.data !== undefined ){
                setToken(token);
            }
        } catch (error) {
            Alert.alert('Error', "El token es inválido");
            navigation.navigate('Login');
        }
    },
    handleGetUserInfo = async () => {
        try {
            const res = await getUserInfo(token);
            if(res.data !== undefined ){
                // console.log(res.data);
                setUserInfo(res.data);
            }
        } catch (error) {
            Alert.alert('Error', "No se pudieron obtener los datos del usuario");
        }
    },
    handleLogout = async () => {
        await SecureStore.deleteItemAsync('token');
        navigation.navigate('Login');
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
            <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {userInfo.profileImage ? (
                    <Image
                        source={{ uri: userInfo.profileImage }}
                        style={styles.profile_image}
                    />
                    ) : (
                    <View
                        style={{
                            width: 100,
                            height: 100,
                            borderRadius: 50,
                            backgroundColor: '#5893d4',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Text style={{ fontSize: 40, color: 'white' }}>{userInfo.name ? userInfo.name.charAt(0) : ''}
                        </Text>
                    </View>
                )}
            </View>
            <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7 }}>
                <Text style={{ fontSize: 20, fontFamily: 'Bold' }}>{userInfo.name}
                </Text>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 9 }}>
                    <FontAwesome name="phone" size={20} color="gray" />
                    <Text style={{ color: 'gray', fontSize: 15, fontFamily: 'Regular' }}>+52 ({userInfo.phone ? userInfo.phone.substring(0, 3) : ''}) {userInfo.phone ? userInfo.phone.substring(3, 6) : ''} {userInfo.phone ? userInfo.phone.substring(6, 10) : ''}
                    </Text>
                </View>
            </View>

            <View style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: 20, borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#C7C7C7', padding: 10, gap: 20 }}>
                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => navigation.navigate('Dashboard')}
                    style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10 }}
                >
                    <Ionicons name="settings" size={24} color="#007aff" />
                    <Text style={{ fontSize: 20, color: '#007aff', fontFamily: 'Bold' }}>Ajustes</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => navigation.navigate('Login')}
                style={{ flex: 1, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'end', gap: 10 }}
            >
                <FontAwesome name="power-off" size={24} color="red" />
                <Text style={{ fontSize: 20, color: 'red', fontFamily: 'Bold' }} onPress={handleLogout}>Cerrar sesión</Text>
            </TouchableOpacity>
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
        backgroundColor: '#fff',
        paddingVertical: 50,
        gap: 10
    },
    profile_image: {
        width: 150,
        height: 150,
        borderRadius: 100
    },
});

export default Profile;
