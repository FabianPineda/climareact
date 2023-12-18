import React, { useState } from 'react'
import { Text, View, TextInput, StyleSheet, TouchableWithoutFeedback, Animated, Alert } from "react-native";
import { Picker } from '@react-native-picker/picker';

const Formulario = ({busqueda, guardarBusqueda, guardarConsultar}) => {

    const [animacionBoton] = useState(new Animated.Value(1))
    const {pais, ciudad } = busqueda
    const estiloAnimacion = { transform : [{ scale : animacionBoton }] }

    const animacionEntrada = () => {
        Animated.spring(animacionBoton,{
            toValue : .75,
            useNativeDriver: true
        }).start()
    }

    const animacionSalida = () => {
        Animated.spring(animacionBoton,{
            toValue : 1,
            friction : 4,
            tension : 30,
            useNativeDriver: true
        }).start()
    }

    const consultarClima = () => {
        if (pais.trim() === '' || ciudad.trim() === '') {
            Alert.alert( 
                'Error', 'Agrega la ciudad y país para la búsqueda, ambos campos son requeridos',
                [ {text : 'Entendido'} ]
            )   
            return
        }

        // Consultar la api
        guardarConsultar(true)
    }

  return (
    <>
        <View style={styles.formulario} >
            <View>
                <TextInput 
                    style={styles.input} 
                    placeholder='Ciudad' 
                    placeholderTextColor={'#666'} 
                    value={ciudad} 
                    onChangeText = {
                        ciudad => guardarBusqueda( {...busqueda, ciudad} ) 
                    } 
                />
            </View>

            <View>
                <Picker itemStyle={{ height:120, backgroundColor:'#FFF' }}  selectedValue={pais} onValueChange={ pais => guardarBusqueda( {...busqueda, pais} )}>
                    <Picker.Item label=' --- Seleccione un país ---' value=''  />
                    <Picker.Item label='Estados Unidos' value='US' />
                    <Picker.Item label='Mexico' value='MX' />
                    <Picker.Item label='Argentina' value='AR' />
                    <Picker.Item label='Colombia' value='CO' />
                    <Picker.Item label='Costa Rica' value='CR' />
                    <Picker.Item label='España' value='ES' />
                    <Picker.Item label='Perú' value='PE'  /> 
                </Picker>
            </View>
            <TouchableWithoutFeedback onPressIn={ () => animacionEntrada() } onPressOut={ () => animacionSalida() } onPress={ () => consultarClima() } >
                <Animated.View style={ [styles.btnBuscar, estiloAnimacion] } >
                    <Text style={styles.textoBuscar} >Buscar Clima</Text>
                </Animated.View>
            </TouchableWithoutFeedback>
        </View>
    </>
  )
}

const styles = StyleSheet.create({
    input : {
        padding : 10,
        height : 50,
        backgroundColor : '#FFF',
        fontSize : 20,
        marginBottom : 20,
        textAlign : 'center'
    },
    btnBuscar : {
        marginTop : 50,
        backgroundColor : '#000',
        padding : 10,
        justifyContent : 'center'
    },
    textoBuscar : {
        color : '#FFF',
        fontWeight : 'bold',
        textTransform : 'uppercase',
        textAlign : 'center',
        fontSize : 18
    }
})

export default Formulario