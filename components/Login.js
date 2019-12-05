import React from 'react';
import {TouchableOpacity, StyleSheet, ImageBackground, Text, View, StatusBar, Image} from 'react-native';
import { CELL_SIZE, BOARD_WIDTH, BOARD_HEIGHT, HEIGHT_BETWEEN_SCREEN_BOARD } from '../Constants';
import { connect } from 'react-redux';

class Login extends React.Component {
    //baloo
    render() {
        return (
        <View style={styles.container}>

            <StatusBar hidden={true} />  
            <ImageBackground source={require('../images/login.jpg')} style={styles.backgroundImage}>
                <View style={styles.logoContainer}>
                    <Image style={styles.logo} source={require('../images/logo.png')} />
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Game')}>
                        <Text style={styles.options}>Play</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('LeaderBoard')}>
                        <Text style={styles.options}>LeaderBoard</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={styles.options}>How To Play</Text>
                    </TouchableOpacity>
                </View>
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
    logoContainer: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        marginTop: (BOARD_HEIGHT/3) 
    },  
    logo: {
        resizeMode: 'contain',
        transform: [{scale: 0.85}]
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
    },
    options: {
        color: 'white',
        marginTop:4,
        marginBottom:4,
        fontSize: 20,
        fontFamily: 'Baloo',        
    }
})