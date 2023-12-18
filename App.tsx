/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';

import Formulario from './componentes/Formulario';

const App = () => {

  const [ busqueda, guardarBusqueda ] = useState( {ciudad : '', pais : ''} )
  const [ consultar, guardarConsultar ] = useState(false)
  const { ciudad, pais } = busqueda

  useEffect( () => {
    const consultarCLima = async () => {
      if (consultar) {
        const appId = '152e2adf54a69a96dcd32a4e6bdde0fc'
        const url =  `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais},{country code}&appid=${appId}` 

        try {
          const respuesta = await fetch(url)
          const resultado = await respuesta.json()
          console.log(resultado)
        } catch (error) {
          mostrarAlerta()
          
        }   
      }
    }
    
    consultarCLima()

  }, [consultar] )

  const mostrarAlerta = () => {
    Alert.alert( 'Error', 'No hay resultados, intenta con otra ciudad o país' )   
  }

  return (
    <>
    <TouchableWithoutFeedback onPress={ () => Keyboard.dismiss() }>
        <View style={styles.app} >
          <View style={styles.contenido} >
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
