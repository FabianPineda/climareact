/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';

import Formulario from './componentes/Formulario';
import Clima from './componentes/Clima';

const App = () => {

  const [ busqueda, guardarBusqueda ] = useState( {ciudad : '', pais : ''} )
  const [ consultar, guardarConsultar ] = useState(false)
  const [ resultado, guardarResultado ] = useState({})
  const [ bgcolor, guardarBgcolor ] = useState('rgb(71, 149, 212)')

  const { ciudad, pais } = busqueda

  useEffect( () => {
    const consultarCLima = async () => {
      if (consultar) {
        const appId = '152e2adf54a69a96dcd32a4e6bdde0fc'
        const url =  `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`

        try {
          const respuesta = await fetch(url)
          const resultado = await respuesta.json()
          
        { resultado.cod === '404' && mostrarAlerta() }
        console.log(resultado)
        guardarResultado(resultado)
        guardarConsultar(false);

        // modifica los colores basado en la temperatura

        const kelvin = 273.15;
        const {main} = resultado
        const actual = main.temp - kelvin

        if (actual < 10) {
          guardarBgcolor('rgb(105, 108, 149)')
        }else if (actual >= 10 && actual < 25){
          guardarBgcolor('rgb(71, 149, 212)')
        }else{
          guardarBgcolor('rgb(178, 28, 61)')
        }

        } catch (error) {
          mostrarAlerta()
          
        }   
      }
    }
    
    consultarCLima()

  }, [consultar] )

  const mostrarAlerta = () => { Alert.alert( 'Error', 'No hay resultados, intenta con otra ciudad o país' )  }
  const bgColorApp = { backgroundColor : bgcolor }

  return (
    <>
    <TouchableWithoutFeedback onPress={ () => Keyboard.dismiss() }>
        <View style={ [styles.app, bgColorApp ] } >
          <View style={styles.contenido} >

            <Clima resultado={resultado} />

            <Formulario busqueda={busqueda} guardarBusqueda={guardarBusqueda} guardarConsultar={guardarConsultar} />
          
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  )
}

const styles = StyleSheet.create({
  app : {
    flex : 1,
    backgroundColor : 'rgb(71, 149, 212)',
    justifyContent : 'center'
  },
  contenido : {
    marginHorizontal : '2.5%'
  }
});

export default App;
