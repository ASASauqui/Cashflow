import React from 'react'
import { View, Text, ScrollView, StyleSheet, Image, Button, TouchableOpacity } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome, Ionicons } from '@expo/vector-icons';


const Profile = ({ navigation }) => {
    return (
        <View style={styles.background}>
            {/* <View>
                <Image source={require('../assets/img/logo2.png')} style={styles.logo} />
            </View> */}
            <View style={styles.profile_container}>
                <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {/* Imagen de internet */}
                    <Image source={{ uri: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.thefamouspeople.com%2Fprofiles%2Fimages%2Fbad-bunny-3.jpg&f=1&nofb=1&ipt=fe9ba359589fa7a32778b79f5ddff2060a4574d5e3874333075a6ecb6197e40b&ipo=images' }} style={styles.profile_image} />
                </View>
                <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Bad Bunny</Text>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 9 }}>
                        <FontAwesome name="phone" size={20} color="gray" />
                        <Text style={{ color: 'gray', fontSize: 15 }}>+52 (123) 456 7890</Text>
                    </View>
                </View>

                <View style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: 20, borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#C7C7C7', padding: 10, gap: 20 }}>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() => navigation.navigate('Dashboard')}
                        style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10 }}
                    >
                        <Ionicons name="settings" size={24} color="#007aff" />
                        <Text style={{ fontSize: 20, color: '#007aff', fontWeight: 'bold' }}>Ajustes</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => navigation.navigate('Login')}
                    style={{ flex: 1, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'end', gap: 10 }}
                >
                    <FontAwesome name="power-off" size={24} color="red" />
                    <Text style={{ fontSize: 20, color: 'red', fontWeight: 'bold' }}>Cerrar sesión</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    background: {
        width: '100%',
        height: '100%',
        flex: 1,
        backgroundColor: '#000',
    },
    profile_container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        paddingVertical: 20,
        gap: 10,
        marginTop: 100
    },
    profile_image: {
        width: 150,
        height: 150,
        borderRadius: 100
    },
});

export default Profile;
