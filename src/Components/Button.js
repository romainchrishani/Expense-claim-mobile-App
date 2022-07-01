import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient'; 


const CustomButton = (props) => {
    return (
        <TouchableOpacity
            style={[styles.btn,
                { ...props.style }
            ]}
            onPress={props.onPressFunction}
        
        >
            <LinearGradient
                colors={['#08d4c4', '#01ab9d']}
                style={styles.btn}
            >
            <Text style={[styles.textSign, {
                color:'#fff'
            }]}>{props.title}</Text>
            </LinearGradient>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    btn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 22,
        fontWeight: 'bold'
    }
})

export default CustomButton;