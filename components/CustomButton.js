import React from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'

const CustomButton = ({
    onPress,
    title,
    type
}) => {

    const getStyles = () => {
        switch (type) {
            case 'blue':
                return {
                    button: styles.buttonBlue,
                    text: styles.textBlue,
                }
            case 'white':
                return {
                    button: styles.buttonWhite,
                    text: styles.textWhite,
                }
            default:
                return {
                    button: styles.buttonBlue,
                    text: styles.textBlue,
                }
        }
    }


  return (
    <Pressable style={getStyles().button} onPress={onPress}>
        <Text style={getStyles().text}>{title}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    buttonBlue: {
        backgroundColor: '#5893d4',
        borderRadius: 25,
        padding: 10,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    textBlue: {
        color: 'white',
        fontSize: 15,
        fontFamily: 'Bold',
    },
    buttonWhite: {
        backgroundColor: '#ffffff',
        borderColor: '#5893d4',
        borderWidth: 1,
        borderRadius: 25,
        padding: 10,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    textWhite: {
        color: '#5893d4',
        fontSize: 15,
        fontFamily: 'Bold',
    },
})

export default CustomButton;

