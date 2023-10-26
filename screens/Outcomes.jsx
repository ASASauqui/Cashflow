import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { checkToken } from '../api/users';
import { getMoves } from '../api/moves';
import * as SecureStore from 'expo-secure-store';
import { Alert } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

const Outcomes = () => {
    const isFocused = useIsFocused(),
        [token, setToken] = useState(''),
        [moves, setMoves] = useState([]),
        [move, setMove] = useState('incomes');

    const outcomes = moves.filter(move => move.type === 'outcome');
    const incomes = moves.filter(move => move.type === 'income');
    const navigation = useNavigation();

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
    };

    const handleGetMoves = async () => {
        try {
            const res = await getMoves(token);
            if(res.data !== undefined ){
                res.data.sort((a, b) => {
                    if (a.createdAt > b.createdAt) {
                        return -1;
                    }
                    if (a.createdAt < b.createdAt) {
                        return 1;
                    }
                    return 0;
                });
                setMoves(res.data);
            }
        } catch (error) {
            Alert.alert('Error', "No se pudieron obtener los movimientos");
        }
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
            handleGetMoves();
        }
    }, [isFocused, token]);

    const incomesPage = () => {
        return(
            <ScrollView style={styles.moves_container}>
                {
                    incomes.map((income) => (
                        <View key={income._id} style={styles.move}>
                            <Text style={styles.moveDate}>{income.createdAt.split('T')[0]}</Text>
                            <Text style={styles.moveConcept}>{income.concept}</Text>
                            <Text style={styles.moveAmount}>${income.amount.toLocaleString('en-US')}</Text>
                        </View>
                    ))
                }
            </ScrollView>
        );
    }

    const outcomesPage = () => {
        return(
            <ScrollView style={styles.moves_container}>
                {
                    outcomes.map((outcome) => (
                        <View key={outcome._id} style={styles.move}>
                            <Text style={styles.moveDate}>{outcome.createdAt.split('T')[0]}</Text>
                            <Text style={styles.moveConcept}>{outcome.concept}</Text>
                            <Text style={styles.moveAmount}>-${outcome.amount.toLocaleString('en-US')}</Text>
                        </View>
                    ))
                }
            </ScrollView>
        );
    }

    return (
        <LinearGradient colors={["#5893d4", "#67a7ed"]} style={styles.background}>
            <View style={styles.header}>
                <Text style={move == 'incomes' ? styles.title_active : styles.title} onPress={() => setMove('incomes')}>Ingresos</Text>
                <Text style={move == 'outcomes' ? styles.title_active : styles.title} onPress={() => setMove('outcomes')}>Egresos</Text>
            </View>
            <View style={styles.container}>
                {
                    move === 'incomes' ? incomesPage() : outcomesPage()
                }
            </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    background: {
        width: '100%',
        height: '100%',
    },
    container: {
        width: '100%',
        height: '100%',
        marginTop: 0,
        flexDirection: "column",
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    title: {
        fontSize: 32,
        fontFamily: 'Bold',
        backgroundColor: 'white',
        color: '#5893d4',
        marginBottom: 20,
        textAlign: 'center',
        width: '50%',
        padding: 10,
        paddingTop: 30,
    },
    title_active: {
        fontSize: 32,
        fontFamily: 'Bold',
        color: 'white',
        marginBottom: 20,
        width: '50%',
        textAlign: 'center',
        padding: 10,
        paddingTop: 30,
    },
    moves_container: {
        width: '90%',
        marginBottom: 60,
        flex: 1,
    },
    move: {
        width: '100%',
        backgroundColor: '#E8E8E8',
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
        position: 'relative',
    },
    moveDate: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        margin: 5,
        fontFamily: 'Regular',
        fontSize: 13,
    },
    moveConcept: {
        fontSize: 20,
        fontFamily: 'Regular',
    },
    moveAmount: {
        fontSize: 18,
        fontFamily: 'Bold',
        marginTop: 10,
    },
    button: {
        backgroundColor: 'white', 
        padding: 8,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default Outcomes;