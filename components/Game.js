import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import  { GameEngine, GameLoop } from 'react-native-game-engine';
import ProgressBar from 'react-native-progress/Bar';

class Game extends React.Component {

    render(){
        return (
            <View style ={styles.topContainer}>
                <Text style={styles.scores}>Person Top Score</Text>
                <Text style={styles.scores}>Current Score</Text>
                {/* <Progress.Bar progress={0.5} width = {200} /> */}
                <ProgressBar style={styles.progressBar} progress={0.4}/>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    topContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    scores: {
        fontFamily:  'Baloo'
    },
    progressBar: {
        transform: [{rotate: '180deg'}]
    }
  })

export default Game;