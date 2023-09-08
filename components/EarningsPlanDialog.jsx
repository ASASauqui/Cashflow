import { Formik } from 'formik';
import React from 'react'
import { Button, Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import CustomButton from './CustomButton';

const EarningsPlanDialog = ({
    show,
    setShow,
    handleSubmitPlan
}) => {
  return (
        <Modal visible={show} transparent>
            <View style={styles.container}>
                <View style={styles.modal}>
                    <Text style={styles.title}>Crear plan de ahorros</Text>
                    <Formik
                        initialValues={{
                            amount: '',
                            duration: '',
                        }}
                        onSubmit={(values) => {
                            handleSubmitPlan(values.amount, values.duration);
                        }}
                    >
                        {
                            ({ handleChange, handleSubmit, values }) => (
                                <View>
                                    <Text style={styles.question}>¿Cuánto quieres ahorrar?</Text>
                                    <TextInput 
                                        placeholder="Monto" 
                                        keyboardType='numeric'
                                        onChangeText={handleChange('amount')}
                                        value={values.amount}
                                        style={styles.field}
                                    />
                                    <Text style={styles.question}>¿Cuánto quieres que dure tu plan?</Text>
                                    <TextInput 
                                        placeholder="Duración (semanas)" 
                                        keyboardType='numeric'
                                        onChangeText={handleChange('duration')}
                                        value={values.duration}
                                        style={styles.field}
                                    />

                                    <View>
                                        <CustomButton title='¡Crear!' onPress={handleSubmit} type='blue'/>
                                        <CustomButton title='Cancelar' onPress={() => setShow(false)} type='white'/>
                                    </View>
                                </View>
                            )
                        }
                    </Formik>
                </View>
            </View>
        </Modal>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,.5)'
    },
    modal: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        height: 'auto',
        margin: 20
    },
    title: {
        fontSize: 25,
        fontFamily: 'Bold',
        textAlign: 'center',
        marginBottom: 50,
    },
    question: {
        fontSize: 15,
        fontFamily: 'Regular',
        marginBottom: 10,
        textAlign: 'center',
    },
    field:{
        borderWidth: 1,
        borderColor: '#5893d4',
        borderRadius: 10,
        padding: 10,
        marginBottom: 20,
        fontFamily: 'Regular',
    },
    button: {
        marginBottom: 10,
        backgroundColor: '#5893d4',
        color: 'white'
    }
})

export default EarningsPlanDialog;
