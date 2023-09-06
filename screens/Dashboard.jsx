import React from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import {LinearGradient} from 'expo-linear-gradient';
import ProgressBar from 'react-native-progress/Bar';


const Dashboard = () => {
    return (
        <LinearGradient colors={["#5893d4", "#67a7ed"]} style={styles.background}>
            <View style={styles.container}>
                <View style={styles.balance_info}>
                    <Text style={styles.balance_info.hello}>Hola de nuevo, Usuario</Text>
                    <Text style={styles.balance_info.balance}>$12,345.<Text style={styles.balance_info.balance.decimals}>00</Text></Text>

                    <Text style={styles.balance_info.incomes}>Ingresos: $1,234.00</Text>
                    <ProgressBar progress={0.2} animated style={styles.balance_info.bar} color="#7DE2D1" unfilledColor="white" height={15} width={350}/>
                    <Text style={styles.balance_info.outcomes}>Egresos: $8,500.00</Text>
                    <ProgressBar progress={0.8} animated style={styles.balance_info.bar} color="#7DE2D1" unfilledColor="white" height={15} width={350}/>
                </View>
                <View style={styles.moves_container}>
                    <Text style={styles.moves_container.title}>Ultimos movimientos</Text>
                    <ScrollView style={styles.moves_container.moves}>
                        {
                            moves.map((move) => (
                                <View key={move.id} style={styles.moves_container.moves.move}>
                                    <Text style={styles.moves_container.moves.move.date}>{move.date}</Text>
                                    <Text style={styles.moves_container.moves.move.concept}>{move.concept}</Text>
                                    <Text style={styles.moves_container.moves.move.amount}>{move.type === 'income' ? '' : '-'}${move.amount}</Text>
                                </View>
                            ))
                        }
                    </ScrollView>
                </View>
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
        marginTop: '500px',
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
            fontSize: 20,
            fontWeight: 'bold',
            color: 'white',
            marginBottom: 20
        },
        balance_text: {
            fontSize: 20,
            color: 'black',
        },
        balance: {
            fontSize: 50,
            color: 'white',
            fontWeight: 'bold',
            decimals: {
                fontSize: 20,
                color: 'white',
                fontWeight: 'bold',
            }
        },
        incomes: {
            fontSize: 15,
            color: 'white',
            marginTop: 50,
        },
        outcomes: {
            fontSize: 15,
            color: 'white',
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
        marginTop: 50,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        padding: 30,
        flex: 1,
        title: {
            fontSize: 30,
            color: 'black',
            fontWeight: 'bold',
            marginBottom: 20
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
                    fontStyle: 'italic'
                },
                concept: {
                    fontSize: 15,
                },
                amount: {
                    fontSize: 15,
                    fontWeight: 'bold',
                }

            }
        },
    }
});

const moves = [
    {
        id: 1,
        concept: 'Testing',
        date: '2021-09-01',
        amount: 1000.00,
        type: 'income'
    },
    {
        id: 2,
        concept: 'Testing',
        date: '2021-09-01',
        amount: 1000.00,
        type: 'outcome'
    },
    {
        id: 3,
        concept: 'Testing',
        date: '2021-09-01',
        amount: 1000.00,
        type: 'income'
    },
    {
        id: 4,
        concept: 'Testing',
        date: '2021-09-01',
        amount: 1000.00,
        type: 'outcome'
    },
    {
        id: 5,
        concept: 'Testing',
        date: '2021-09-01',
        amount: 1000.00,
        type: 'income'
    },
    {
        id: 6,
        concept: 'Testing',
        date: '2021-09-01',
        amount: 1000.00,
        type: 'outcome'
    },
    {
        id: 7,
        concept: 'Testing',
        date: '2021-09-01',
        amount: 1000.00,
        type: 'outcome'
    },
    {
        id: 8,
        concept: 'Testing',
        date: '2021-09-01',
        amount: 1000.00,
        type: 'income'
    },
    {
        id: 9,
        concept: 'Testing',
        date: '2021-09-01',
        amount: 1000.00,
        type: 'outcome'
    },
]

export default Dashboard;


