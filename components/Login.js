import React from 'react';
import {TouchableOpacity, StyleSheet, ImageBackground, Text, View } from 'react-native';

class Login extends React.Component {
    //baloo
    render() {
        return (
        <View style={styles.container}>
            <ImageBackground source={require('../images/background.jpeg')} style={styles.backgroundImage}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Game')}>
                    <Text style={styles.options}>Play</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.options}>LeaderBoard</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.options}>How To Play</Text>
                </TouchableOpacity>
            </ImageBackground>
        </View>
        );
    }
}

export default Login;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    options: {
        color: 'white',
        marginTop:4,
        marginBottom:4,
        fontSize: 20,
        fontFamily: 'Baloo',
        fontWeight: 'bold'
        
    }
  });