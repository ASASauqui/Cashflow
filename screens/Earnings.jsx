import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { LinearGradient } from 'expo-linear-gradient';
import Dialog from "react-native-dialog";
import { CustomButton, EarningsPlanDialog } from '../components';
import { checkToken } from '../api/users';
import { createMove } from '../api/moves';
import { getSave, createSave, updateSave, deleteSave } from '../api/saves';
import * as SecureStore from 'expo-secure-store';
import { useIsFocused } from '@react-navigation/native';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Earnings = () => {
    const isFocused = useIsFocused(),
    navigation = useNavigation(),
    [token, setToken] = useState(''),
    [week, setWeek] = useState(0),
    [totalWeeks, setTotalWeeks] = useState(0),
    [periodicalEarning, setPeriodicalEarning] = useState(0),
    [totalAmount, setTotalAmount] = useState(0),
    [showPayDialog, setShowPayDialog] = useState(false),
    [showStopDialog, setShowStopDialog] = useState(false),
    [showCreatePlanDialog, setShowCreatePlanDialog] = useState(false),
    [activeSavingsPlan, setActiveSavingsPlan] = useState(false),
    today = new Date(),
    [finalDate, setFinalDate] = useState();

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

    const handleGetSave = async () => {
        try {
            const res = await getSave(token);

            if(res.data === null ){
                setActiveSavingsPlan(false);
                return;
            }
            if(res.data !== undefined ){
                setWeek(res.data.currentWeek);
                setTotalAmount(res.data.totalAmount);
                setTotalWeeks(res.data.totalWeeks);
                setPeriodicalEarning(res.data.individualAmount);
                const endingDate = new Date(res.data.finalDate);
                setFinalDate(endingDate);
                setActiveSavingsPlan(true);
            }
        } catch (error) {
            setActiveSavingsPlan(false);
            Alert.alert('Error', "No se pudo obtener el plan de ahorros");
        }
    },
    handleCreateSave = async (amount, duration) => {
        try {
            const body = {
                individualAmount: (amount / duration).toFixed(2),
                totalAmount: amount,
                totalWeeks: duration,
                currentWeek: 0,
                finalDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + duration * 7)
            }

            const res = await createSave(token, body);
            if(res.data !== undefined ){
                setWeek(0);
                setTotalAmount(parseFloat(amount));
                setTotalWeeks(duration);
                setPeriodicalEarning((amount / duration).toFixed(2));
                const endingDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + duration * 7);
                setFinalDate(endingDate);
                setActiveSavingsPlan(true);
                setShowCreatePlanDialog(false);
            }
        } catch (error) {
            setActiveSavingsPlan(false);
            Alert.alert('Error', "No se pudo crear el plan de ahorros");
        }
    },
    handleUpdateSave = async () => {
        try {
            body = {
                currentWeek: week + 1,
                totalAmount: totalAmount,
                totalWeeks: totalWeeks,
                individualAmount: periodicalEarning,
                finalDate: finalDate,
            }
            const res = await updateSave(token, body);
            if(res.data !== undefined ){
                setWeek(week + 1);
                setShowPayDialog(false);
            }
        } catch (error) {
            setShowPayDialog(false);
            Alert.alert('Error', "No se pudo abonar al plan de ahorros");
        }

    },
    handleDeleteSave = async () => {
        try {
            const res = await deleteSave(token);
            if(res.data !== undefined ){
                setWeek(0);
                setTotalAmount(0);
                setTotalWeeks(0);
                setPeriodicalEarning(0);
                setActiveSavingsPlan(false);
                setShowCreatePlanDialog(false);
                setShowStopDialog(false);
            }
        } catch (error) {
            setShowStopDialog(false);
            Alert.alert('Error', "No se pudo eliminar el plan de ahorros");
        }
    }

    const handleCreateMove = async (amount, type, concept) => {
        try {
            if(week === 0){
                setWeek(0);
                setTotalAmount(0);
                setTotalWeeks(0);
                setPeriodicalEarning(0);
                setActiveSavingsPlan(false);
                setShowCreatePlanDialog(false);
                setShowStopDialog(false);
                return;
            }
            const body = {
                amount: week * periodicalEarning,
                type: type,
                concept: concept,
            }
            const res = await createMove(token, body);
            if(res.data !== undefined ){
                Alert.alert('Movimiento registrado', 'Tu movimiento se ha registrado correctamente');
            }
        } catch (error) {
            Alert.alert('Error', "No se pudo registrar el movimiento");
        }
    }

    const handlePay = () => {
        if (week >= totalWeeks) {
            Alert.alert('Error', "Ya has terminado tu plan de ahorros");
            return;
        }
        handleUpdateSave();
    }

    const handleFinish = () => {
        handleCreateMove(totalAmount, 'income', 'Plan de ahorros');
        handleDeleteSave();
    }

    const handleSubmitPlan = (amount, duration) => {
        const amountRegex = /^[1-9]\d*$/
        if (!amountRegex.test(amount)) {
            alert('El monto debe ser un número entero positivo');
            return;
        }

        if (!amountRegex.test(duration)) {
            alert('La duración debe ser un número entero positivo');
            return;
        }

        if (duration > 52) {
            alert('La duración máxima es de 52 semanas');
            return;
        }

        if (amount < 100) {
            alert('El monto mínimo es de $100');
            return;
        }

        handleCreateSave(amount, duration);
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
            handleGetSave();
        }
    }, [isFocused, token]);


    const activePlan = () => {
        return (
            <View style={styles.earnings}>
                <AnimatedCircularProgress
                    size={200}
                    width={15}
                    fill={week/totalWeeks * 100}
                    tintColor="#7DE2D1"
                    backgroundColor="#ffffff" 
                >
                    {
                        (fill) => (
                        <Text style={styles.weekCounter}>
                            {week} / {totalWeeks}
                        </Text>
                        )
                    }
                </AnimatedCircularProgress>
                <Text style={styles.weeks}>Semanas</Text>
                <Text style={styles.total_text}>Total ahorrado</Text>
                <Text style={styles.total}>{(week * periodicalEarning).toLocaleString('es-US', { style: 'currency', currency: 'USD' })} / {totalAmount.toLocaleString('es-US', { style: 'currency', currency: 'USD' })}</Text>
                <Text style={styles.finalDate}>Finaliza el {finalDate.toLocaleDateString()}</Text>

                {week < totalWeeks &&
                    <CustomButton
                        title="Abonar"
                        onPress={() => setShowPayDialog(true)}
                        type="white"
                    />
                }
                <CustomButton
                    title="Terminar plan de ahorro"
                    onPress={() => setShowStopDialog(true)}
                    type="white"
                />

                <Dialog.Container visible={showPayDialog}>
                    <Dialog.Title>¿Deseas abonar?</Dialog.Title>
                    <Dialog.Description>
                    Se abonarán {periodicalEarning.toLocaleString('es-US', { style: 'currency', currency: 'USD' })} a tu plan de ahorros.
                    </Dialog.Description>
                    <Dialog.Button label="Aceptar" onPress={handlePay}/>
                    <Dialog.Button label="Cancelar"  onPress={() => setShowPayDialog(false)}/>
                </Dialog.Container>

                
                <Dialog.Container visible={showStopDialog}>
                    <Dialog.Title>¿Deseas terminar tu plan de ahorros antes de tiempo?</Dialog.Title>
                    <Dialog.Description>
                    Tu plan de ahorros terminará inmediatamente.
                    </Dialog.Description>
                    <Dialog.Button label="Aceptar" onPress={handleFinish}/>
                    <Dialog.Button label="Cancelar"  onPress={() => setShowStopDialog(false)}/>
                </Dialog.Container>
            </View>
        )
    }

    const nonActivePlan = () => {
        return(
            <View style={styles.noplan}>
            <Text style={styles.subtitle}>Aún tienes un plan de ahorros activo</Text>
            <Text style={styles.desc}>Utiliza esta función para crear tu plan de ahorros personalizado. Define tus objetivos financieros y establece un plan para alcanzarlos a través del ahorro regular.</Text>
            <CustomButton
                title="Crear plan de ahorros"
                onPress={() => setShowCreatePlanDialog(true)}
                type="white"
            />
            <EarningsPlanDialog show={showCreatePlanDialog} setShow={setShowCreatePlanDialog} handleSubmitPlan={handleSubmitPlan}/>
        </View>
        )
    }



  return (
    <LinearGradient colors={["#5893d4", "#67a7ed"]} style={styles.background}>
        <View style={styles.container}>
            <Text style={styles.title}>Ahorros</Text>
            {
                activeSavingsPlan ? activePlan() : nonActivePlan()
            }
        </View> 
    </LinearGradient>   
  );
}

const styles = StyleSheet.create({
    background: {
        width: '100%',
        height: '100%',
    },
    container: {
        padding: 20,
        width: '100%',
        height: '100%',
    },
    title:{
        fontSize: 30,
        fontFamily: 'Bold',
        color: '#fff',
        marginTop: 50,
        textAlign: 'center',
    },
    earnings: {
        alignItems: 'center',
        marginTop: 50,
    },
    weekCounter: {
        fontSize: 35,
        fontFamily: 'Bold',
        color: '#fff',
    },
    weeks: {
        fontSize: 20,
        fontFamily: 'Bold',
        color: '#fff',
        marginBottom: 20,
        marginTop: 10,
    },
    total_text: {
        fontSize: 20,
        fontFamily: 'Bold',
        color: '#fff',
        marginBottom: 10,
    },
    total: {
        fontSize: 25,
        fontFamily: 'Bold',
        color: '#fff',
        marginBottom: 20,
    },
    finalDate: {
        fontSize: 15,
        fontFamily: 'Regular',
        color: '#fff',
        marginBottom: 20,
    },
    noplan: {
        marginTop: 200,
        alignItems: 'center',
        height: '100%',
    },
    subtitle: {
        fontSize: 20,
        fontFamily: 'Bold',
        color: '#fff',
        marginBottom: 20,
        textAlign: 'center',
    },
    desc: {
        fontSize: 15,
        fontFamily: 'Regular',
        color: '#fff',
        marginBottom: 20,
        textAlign: 'center',
    },
});

export default Earnings;
