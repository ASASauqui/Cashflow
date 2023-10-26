import { Formik } from 'formik';
import React from 'react'
import { Modal, StyleSheet, Text, TextInput, View } from 'react-native';
import CustomButton from './CustomButton';

const CreateMovementDialog = ({
    show,
    setShow,
    handleSubmitMovement
}) => {
  return (
        <Modal visible={show} transparent>
            <View style={styles.container}>
                <View style={styles.modal}>
                    <Text style={styles.title}>Crear movimiento</Text>
                    <Formik
                        initialValues={{
                            amount: '',
                            concept: '',
                        }}
                        onSubmit={(values) => {
                            handleSubmitMovement(values.amount, values.concept);
                        }}
                    >
                        {
                            ({ handleChange, handleSubmit, values }) => (
                                <View>
                                    <Text style={styles.question}>¿De cuánto dinero es el movimiento?</Text>
                                    <TextInput
                                        placeholder="Monto (negativo si es gasto)"
                                        keyboardType='numeric'
                                        onChangeText={handleChange('amount')}
                                        value={values.amount}
                                        style={styles.field}
                                    />
                                    <Text style={styles.question}>¿De qué es el movimiento?</Text>
                                    <TextInput
                                        placeholder="Concepto"
                                        keyboardType='default'
                                        onChangeText={handleChange('concept')}
                                        value={values.concept}
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
        textAlign: 'left',
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

export default CreateMovementDialog;
