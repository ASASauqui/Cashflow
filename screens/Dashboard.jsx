import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import ProgressBar from 'react-native-progress/Bar';
import { checkToken } from '../api/users';
import { getUserInfo } from '../api/userInfo';
import { getMoves, createMove } from '../api/moves';
import { getUserCashInfo } from '../api/userCashInfo';
import * as SecureStore from 'expo-secure-store';
import { Alert } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { CreateMovementDialog } from '../components';
import { CustomButton } from '../components';

const Dashboard = () => {
    const isFocused = useIsFocused(),
        navigation = useNavigation(),
        [token, setToken] = useState(''),
        [userInfo, setUserInfo] = useState({}),
        [userCashInfo, setUserCashInfo] = useState({}),
        [incomesOutomesSum, setIncomesOutomesSum] = useState(0),
        [moves, setMoves] = useState([]),
        [showCreateMovementDialog, setShowCreateMovementDialog] = useState(false);

    const checkUserToken = async ( token ) => {
        try {
            const res = await checkToken(token);
            if(res.data !== undefined ){
                setToken(token);
            }
        } catch (error) {
            navigation.navigate('Login');
        }
    };

    const handleGetUserCashInfo = async () => {
        try {
            const res = await getUserCashInfo(token);
            if(res.data !== undefined ){
                // console.log(res.data);
                setUserCashInfo(res.data);
                setIncomesOutomesSum(res.data.incomes + res.data.outcomes);
            }
        } catch (error) {
            Alert.alert('Error', "No se pudo obtener la información de tu cuenta.")
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
            Alert.alert('Error', "No se pudo obtener la información de tu cuenta.");
        }
    },
    handleGetMoves = async () => {
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
            Alert.alert('Error', "No se pudo obtener la información de tu cuenta.");
        }
    },
    handleCreateMove = async (amount, concept, type) => {
        try {
            const body = {
                amount: amount,
                concept: concept,
                type: type,
            }
            const res = await createMove(token, body);
            if(res.data !== undefined ){
                setShowCreateMovementDialog(false);
                handleGetUserCashInfo();
                handleGetMoves();
            }
        } catch (error) {
            Alert.alert('Error', "No se pudo crear el movimiento.");
        }
    };

    const handleSubmitMovement = (amount, concept) => {
        if (amount.trim() === '' || concept.trim() === '') {
            Alert.alert('Error', 'Ambos campos son obligatorios');
            return;
        }

        const amountRegex = /^-?\d+(\.\d{1,2})?$/;
        if (!amountRegex.test(amount)) {
            Alert.alert('Error', 'El monto debe ser un número válido');
            return;
        }

        if (Number(amount) === 0) {
            Alert.alert('Error', 'El monto debe ser diferente de 0');
            return;
        }

        let type = 'income';
        if (amount < 0) {
            amount = amount * -1;
            type = 'outcome';
        }

        handleCreateMove(amount, concept, type);
    }

    useEffect(() => {
        SecureStore.getItemAsync('token').then((token) => {
            if (token) {
                checkUserToken(token);
            }
        });
    }, [isFocused]);

    useEffect(() => {
        if (token !== '') {
            handleGetUserCashInfo();
            handleGetUserInfo();
            handleGetMoves();
        }
    }, [isFocused, token]);

    return (
        <LinearGradient colors={["#5893d4", "#67a7ed"]} style={styles.background}>
            <View style={styles.container}>
                <View style={styles.balance_info}>
                    <Text style={styles.balance_info.hello}>¡Hola de nuevo, {userInfo.name}!
                    </Text>
                    <Text style={styles.balance_info.balance}>${userCashInfo.cash ? userCashInfo.cash.toLocaleString('en-US').split('.')[0] : '0'}
                    <Text style={styles.balance_info.dec}>{userCashInfo.cash ? userCashInfo.cash.toFixed(2).split('.')[1] : '00'}
                    </Text></Text>

                    <Text style={styles.balance_info.incomes}>Ingresos: ${userCashInfo.incomes ? userCashInfo.incomes.toLocaleString('en-US') : '0'}
                    </Text>
                    <ProgressBar progress={incomesOutomesSum ? userCashInfo.incomes / incomesOutomesSum : 0}
                    animated style={styles.balance_info.bar} color="#7DE2D1" unfilledColor="white" height={15} width={350}/>
                    <Text style={styles.balance_info.outcomes}>Egresos: ${userCashInfo.outcomes ? userCashInfo.outcomes.toLocaleString('en-US') : '0'}
                    </Text>
                    <ProgressBar progress={incomesOutomesSum ? userCashInfo.outcomes / incomesOutomesSum : 0}
                    animated style={styles.balance_info.bar} color="#fc4a41" unfilledColor="white" height={15} width={350}/>
                    <View>
                        <CustomButton title='Crear movimiento' onPress={() => setShowCreateMovementDialog(true)} type='white'/>
                    </View>
                </View>
                <View style={styles.moves_container}>
                    <Text style={styles.moves_container.title}>Últimos movimientos</Text>
                    <ScrollView style={styles.moves_container.moves}>
                        {
                            moves.slice(0, 10).map((move) => (
                                <View key={move._id} style={styles.moves_container.moves.move}>
                                    <Text style={styles.moves_container.moves.move.date}>{move.createdAt.split('T')[0]}
                                    </Text>
                                    <Text style={styles.moves_container.moves.move.concept}>{move.concept}
                                    </Text>
                                    <Text style={styles.moves_container.moves.move.amount}>{move.type === 'income' ? '' : '-'}${move.amount.toLocaleString('en-US')}
                                    </Text>
                                </View>
                            ))
                        }
                    </ScrollView>
                </View>
            </View>
            <CreateMovementDialog show={showCreateMovementDialog} setShow={setShowCreateMovementDialog} handleSubmitMovement={handleSubmitMovement}/>
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
        marginTop: 30,
        flexDirection: "column",
        alignItems: 'center',
    },
    balance_info: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 20,
        marginTop: 50,
        hello: {
            fontFamily: 'Bold',
            fontSize: 20,
            color: 'white',
            marginBottom: 20,
            textAlign: 'center',
        },
        balance_text: {
            fontSize: 20,
            color: 'black',
        },
        balance: {
            fontSize: 50,
            color: 'white',
            fontFamily: 'Bold',
        },
        dec: {
            fontSize: 20,
            color: 'white',
            fontFamily: 'Bold',
        },
        incomes: {
            fontSize: 15,
            color: 'white',
            marginTop: 50,
            fontFamily: 'Regular',
        },
        outcomes: {
            fontSize: 15,
            color: 'white',
            fontFamily: 'Regular',
        },
        bar: {
            marginTop: 5,
            marginBottom: 10,
            borderRadius: 10,
            border: 0,
        }
    },
    moves_container: {
        width: '100%',
        height: 500,
        backgroundColor: 'white',
        marginTop: 10,
        paddingBottom: 100,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        padding: 30,
        flex: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.5,
        shadowRadius: 18,

        elevation: 5,
        title: {
            fontSize: 30,
            color: 'black',
            fontFamily: 'Bold',
            marginBottom: 20,
            textAlign: 'center',
        },
        moves: {
            flex: 1,
            move: {
                width: '100%',
                height: 'auto',
                backgroundColor: '#E8E8E8',
                borderRadius: 10,
                padding: 15,
                marginBottom: 10,
                position: 'relative',
                date: {
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    margin: 5,
                    fontSize: 10,
                    fontFamily: 'Regular',
                    fontStyle: 'italic',
                    color: 'gray'
                },
                concept: {
                    fontSize: 15,
                    fontFamily: 'Regular',
                },
                amount: {
                    fontSize: 15,
                    fontFamily: 'Bold',
                }

            }
        },
    }
});

export default Dashboard;
