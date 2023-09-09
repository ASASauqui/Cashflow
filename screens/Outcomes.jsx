import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const Outcomes = () => {
    const [move, setMove] = useState('incomes');

    const outcomes = moves.filter(move => move.type === 'outcome');
    const incomes = moves.filter(move => move.type === 'income');
    const navigation = useNavigation();

    const incomesPage = () => {
        return(
            <ScrollView style={styles.moves_container}>
                {
                    incomes.map((outcome) => (
                        <View key={outcome.id} style={styles.move}>
                            <Text style={styles.moveDate}>{outcome.date}</Text>
                            <Text style={styles.moveConcept}>{outcome.concept}</Text>
                            <Text style={styles.moveAmount}>${outcome.amount}</Text>
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
                        <View key={outcome.id} style={styles.move}>
                            <Text style={styles.moveDate}>{outcome.date}</Text>
                            <Text style={styles.moveConcept}>{outcome.concept}</Text>
                            <Text style={styles.moveAmount}>-${outcome.amount}</Text>
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
        color: 'white',
        marginBottom: 20,
        textAlign: 'center',
        width: '50%',
        padding: 10,
        paddingTop: 30,
    },
    title_active: {
        fontSize: 32,
        fontFamily: 'Bold',
        backgroundColor: 'white',
        color: '#5893d4',
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

const moves = [
    {
        id: 1,
        concept: 'Amazon',
        date: '23-02-2023',
        amount: 450.00,
        type: 'outcome'
    },
    {
        id: 2,
        concept: 'Alquiler',
        date: '11-06-2023',
        amount: 1000.00,
        type: 'outcome'
    },
    {
        id: 3,
        concept: 'Rappi Eats',
        date: '05-04-2023',
        amount: 140.00,
        type: 'outcome'
    },
    {
        id: 4,
        concept: 'Caffenio App',
        date: '16-01-2023',
        amount: 345.00,
        type: 'outcome'
    },
    {
        id: 5,
        concept: 'Universidad UP',
        date: '27-10-2023',
        amount: 3455.00,
        type: 'outcome'
    },
    {
        id: 6,
        concept: 'Nintendo Eshop',
        date: '09-08-2023',
        amount: 1400.00,
        type: 'outcome'
    },
    {
        id: 7,
        concept: 'Tacos Bora',
        date: '03-07-2023',
        amount: 123.50,
        type: 'outcome'
    },
    {
        id: 8,
        concept: 'Las Alitas',
        date: '14-12-2023',
        amount: 683.00,
        type: 'outcome'
    },
    {
        id: 9,
        concept: 'HyM Altaria',
        date: '28-05-2023',
        amount: 425.00,
        type: 'outcome'
    },
    {
        id: 10,
        concept: 'Toyota Ags',
        date: '29-02-2023',
        amount: 6000.00,
        type: 'outcome'
    },
    {
        id: 11,
        concept: 'Pandora',
        date: '15-12-2022',
        amount: 1299.00,
        type: 'outcome'
    },
    {
        id: 1,
        concept: 'Amazon',
        date: '23-02-2023',
        amount: 450.00,
        type: 'income'
    },
    {
        id: 2,
        concept: 'Alquiler',
        date: '11-06-2023',
        amount: 1000.00,
        type: 'income'
    },
    {
        id: 3,
        concept: 'Rappi Eats',
        date: '05-04-2023',
        amount: 140.00,
        type: 'income'
    },
    {
        id: 4,
        concept: 'Caffenio App',
        date: '16-01-2023',
        amount: 345.00,
        type: 'income'
    },
    {
        id: 5,
        concept: 'Universidad UP',
        date: '27-10-2023',
        amount: 3455.00,
        type: 'income'
    },
    {
        id: 6,
        concept: 'Nintendo Eshop',
        date: '09-08-2023',
        amount: 1400.00,
        type: 'income'
    },
    {
        id: 7,
        concept: 'Tacos Bora',
        date: '03-07-2023',
        amount: 123.50,
        type: 'income'
    },
    {
        id: 8,
        concept: 'Las Alitas',
        date: '14-12-2023',
        amount: 683.00,
        type: 'income'
    },
    {
        id: 9,
        concept: 'HyM Altaria',
        date: '28-05-2023',
        amount: 425.00,
        type: 'income'
    },
    {
        id: 10,
        concept: 'Toyota Ags',
        date: '29-02-2023',
        amount: 6000.00,
        type: 'income'
    },
    {
        id: 11,
        concept: 'Pandora',
        date: '15-12-2022',
        amount: 1299.00,
        type: 'income'
    },

];



export default Outcomes