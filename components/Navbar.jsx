import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import Svg, { Path } from 'react-native-svg';

function Navbar() {
    const currentScreen = useNavigation().getState().routes[useNavigation().getState().index].name;

    return (
        <View style={styles.navbar}>
            <BlurView intensity={10} tint="dark" style={styles.navbar_blur} />

            <View style={styles.navbar_inner}>
                <TouchableOpacity onPress={() => alert('Analytics')} style={{width: '33.33%'}}>
                    <View style={currentScreen === 'Analytics' ? styles.navbar_items_active : styles.navbar_items}>
                        <Svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" data-darkreader-inline-fill="" style={currentScreen === 'Analytics' ? styles.navbar_items_active.svg : styles.navbar_items.svg}>
                            <Path d="M12 9a1 1 0 01-1-1V3c0-.553.45-1.008.997-.93a7.004 7.004 0 015.933 5.933c.078.547-.378.997-.93.997h-5z"></Path>
                            <Path d="M8.003 4.07C8.55 3.992 9 4.447 9 5v5a1 1 0 001 1h5c.552 0 1.008.45.93.997A7.001 7.001 0 012 11a7.002 7.002 0 016.003-6.93z"></Path>
                        </Svg>
                        {currentScreen === 'Analytics' ? <Text style={styles.navbar_items_active.text}>Análisis</Text> : null}
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => alert('Dashboard')} style={{width: '33.33%'}}>
                    <View style={currentScreen === 'Dashboard' ? styles.navbar_items_active : styles.navbar_items}>
                        <Svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={currentScreen === 'Dashboard' ? styles.navbar_items_active.svg : styles.navbar_items.svg}>
                            <Path
                                clipRule="evenodd"
                                fillRule="evenodd"
                                d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z"
                            />
                        </Svg>
                        {currentScreen === 'Dashboard' ? <Text style={styles.navbar_items_active.text}>Dashboard</Text> : null}
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => alert('Profile')} style={{width: '33.33%'}}>
                    <View style={currentScreen === 'Profile' ? styles.navbar_items_active : styles.navbar_items}>
                        <Svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" data-darkreader-inline-fill="" style={currentScreen === 'Profile' ? styles.navbar_items_active.svg : styles.navbar_items.svg}>
                            <Path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z"></Path>
                        </Svg>
                        {currentScreen === 'Profile' ? <Text style={styles.navbar_items_active.text}>Perfil</Text> : null}
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    navbar: {
        position: 'absolute',
        width: '100%',
        height: 80,
        borderTopLeftRadius: 100,
        borderTopRightRadius: 100,
        bottom: 0,
        overflow: 'hidden'
    },
    navbar_blur: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    navbar_inner: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#5c98db80'
    },
    navbar_items: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'white',
        borderStyle: 'solid',
        borderBottomWidth: 5,
        svg: {
            width: 40,
            height: 40,
            fill: 'white'
        }
    },
    navbar_items_active: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopRightRadius: 100,
        borderTopLeftRadius: 100,
        backgroundColor: 'white',
        marginTop: 10,
        svg: {
            width: 40,
            height: 40,
            fill: '#5c98db'
        },
        text: {
            color: '#5c98db',
            fontWeight: 'bold'
        }
    }
});

export default Navbar;