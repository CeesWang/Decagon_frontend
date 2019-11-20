import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import  { GameEngine, GameLoop } from 'react-native-game-engine';
import Svg, { Polygon}from 'react-native-svg';

class Game extends React.Component {

    render(){
        return (
            <View>
                <View style ={styles.topContainer}>
                    <Text style={styles.scores}>Person Top Score</Text>
                    <Text style={styles.scores}>Current Score</Text>
                    {/* <Progress.Bar progress={0.5} width = {200} /> */}
                </View>
                <View style ={styles.figures}>
                    <Svg height="100px" width="100px" >
                        <Polygon
                            points="50 0, 0 100, 100 100"
                        />
                    </Svg>
                    <Svg height="100px" width="100px" >
                        <Polygon
                            points="0 0, 0 100, 100 100, 100 0"
                        />
                    </Svg>
                    <Svg height="100px" width="100px" >
                        <Polygon
                            points="50 0, 100 38, 82 100, 18 100, 0 38"
                        />
                    </Svg>
                    <Svg height="100px" width="100px" >
                        <Polygon
                            points="50 0, 100 25, 100 75, 50 100, 0 75, 0 25"
                        />
                    </Svg>
                    <Svg height="100px" width="100px" >
                        <Polygon
                            points="50 0, 90 20, 100 60, 75 100, 25 100, 0 60, 10 20"
                        />
                    </Svg>
                    <Svg height="100px" width="100px" >
                        <Polygon
                            points="30 0, 70 0, 100 30, 100 70, 70 100, 30 100, 0 70, 0 30"
                        />
                    </Svg>
                    <Svg height="100px" width="100px" >
                        <Polygon
                            points="50 0, 83 12, 100 43, 94 78, 68 100, 32 100, 6 78, 0 43, 17 12"
                        />
                    </Svg>
                </View>
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    topContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    figures: {
        justifyContent: 'center',
        flexDirection: 'row',
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