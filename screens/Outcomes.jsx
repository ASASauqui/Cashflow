import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const Outcomes = () => {

    const outcomes = moves.filter(move => move.type === 'outcome');
    const navigation = useNavigation();

    return (
        <LinearGradient colors={["#5893d4", "#67a7ed"]} style={styles.background}>
            <View style={styles.container}>
                <View style={styles.header}>
                    {/* <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Dashboard')}>
                        <Text style={styles.buttonText}>⌂</Text>
                    </TouchableOpacity> */}
                    <Text style={styles.title}>Egresos</Text>
                </View>
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
        marginTop: '50px',
        flexDirection: "column",
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '90%',
        marginTop: 40,
    },
    title: {
        fontSize: 32,
        fontFamily: 'Bold',
        color: 'white',
        marginBottom: 20,

    },
    moves_container: {
        width: '90%',
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
        fontSize: 15,
        fontStyle: 'italic'
    },
    moveConcept: {
        fontSize: 20,
    },
    moveAmount: {
        fontSize: 18,
        fontWeight: 'bold',
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

];

export default Outcomes