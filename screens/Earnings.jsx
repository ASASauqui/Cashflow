import React, { useState } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { LinearGradient } from 'expo-linear-gradient';
import Dialog from "react-native-dialog";
import { CustomButton, EarningsPlanDialog } from '../components';

const Earnings = () => {
    const [week, setWeek] = useState(0);
    const [totalWeeks, setTotalWeeks] = useState(0);
    const [periodicalEarning, setPeriodicalEarning] = useState(100);
    const [showPayDialog, setShowPayDialog] = useState(false);
    const [showStopDialog, setShowStopDialog] = useState(false);
    const [showCreatePlanDialog, setShowCreatePlanDialog] = useState(false);
    const [activeSavingsPlan, setActiveSavingsPlan] = useState(false);

    const handlePay = () => {
        setWeek(week + 1);
        setShowPayDialog(false);
    }

    const handleFinish = () => {
        setWeek(0);
        setTotalWeeks(0);
        setPeriodicalEarning(0);
        setActiveSavingsPlan(false);
        setShowStopDialog(false);
    }

    const handleSubmitPlan = (amount, duration) => {
        setTotalWeeks(duration);
        setPeriodicalEarning(amount / duration);
        setActiveSavingsPlan(true);
        setShowCreatePlanDialog(false);
    }


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
                <Text style={styles.total}>{(week * periodicalEarning).toLocaleString('es-US', { style: 'currency', currency: 'USD' })} / {(totalWeeks * periodicalEarning).toLocaleString('es-US', { style: 'currency', currency: 'USD' })}</Text>
                <Text style={styles.endingDate}>Finaliza el 20-10-2023</Text>

                <CustomButton
                    title="Abonar"
                    onPress={() => setShowPayDialog(true)}
                    type="white"
                />
                <CustomButton
                    title="Terminar plan de ahorro"
                    onPress={() => setShowStopDialog(true)}
                    type="white"
                />

                <Dialog.Container visible={showPayDialog}>
                    <Dialog.Title>¿Deseas abonar?</Dialog.Title>
                    <Dialog.Description>
                    Se abonarán ${periodicalEarning} a tu plan de ahorros.
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
    endingDate: {
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
