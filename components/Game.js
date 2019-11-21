import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import  { GameEngine, GameLoop } from 'react-native-game-engine';
import {MAX_HEIGHT, MAX_WIDTH, BOARD_HEIGHT, BOARD_WIDTH} from '../Constants.js'
import Triangle from '../shapes/Triangle.js';
import Square from '../shapes/Square.js';
import Pentagon from '../shapes/Pentagon.js';
import Hexagon from '../shapes/Hexagon.js';
import Heptagon from '../shapes/Heptagon.js';
import Octogon from '../shapes/Octogon.js';
import Nonagon from '../shapes/Nonagon.js';
import Decagon from '../shapes/Decagon.js';

class Game extends React.Component {
    constructor(props){
        super(props);
        this.engine = null;
    }

    render(){
        return (
            <View style={styles.parentContainer}>
                <View style ={styles.topContainer}>
                    <Text style={styles.scores}>Person Top Score</Text>
                    <Text style={styles.scores}>Current Score</Text>
                </View>
                <GameEngine
                    style={styles.board}
                    ref={(ref) => {this.engine = ref}}
                    entities={{
                        triangle: {
                            position: [1,0],
                            renderer: <Decagon />
                        }                       
                    }}>                   
                </GameEngine>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    parentContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    topContainer: {
    },
    board: {
        flex: null,
        height: BOARD_HEIGHT,
        width: BOARD_WIDTH,
        borderRadius: 10,
        borderWidth: 1
    },
    scores: {
        fontFamily:  'Baloo'
    },
    progressBar: {
        transform: [{rotate: '180deg'}]
    }
  })

export default Game;

     {/* <Svg height="100px" width="100px" >
                        <Polygon
                            strokeLinejoin="mitter"
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
                    <Svg height="100px" width="100px" >
                        <Polygon
                            points="50 0, 80 10, 100 35, 100 70, 80 90, 50 100, 20 90, 0 70, 0 35, 20 10"
                        />
                    </Svg> */}