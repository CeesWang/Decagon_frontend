import React from 'react';
import Matter from 'matter-js';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { GameEngine, GameLoop } from 'react-native-game-engine';
import {Physics, Test, MoveShape} from '../Systems.js'
import { CELL_SIZE, HEIGHT_BETWEEN_SCREEN_BOARD,WIDTH_BETWEEN_SCREEN_BOARD, MAX_HEIGHT_UNIT, MAX_HEIGHT, MAX_WIDTH_UNIT, BOARD_HEIGHT, BOARD_WIDTH} from '../Constants.js'
import Triangle from '../shapes/Triangle.js';
import Square from '../shapes/Square.js';
import Pentagon from '../shapes/Pentagon.js';
import Hexagon from '../shapes/Hexagon.js';
import Heptagon from '../shapes/Heptagon.js';
import Octogon from '../shapes/Octogon.js';
import Nonagon from '../shapes/Nonagon.js';
import Decagon from '../shapes/Decagon.js';
import Shapu from '../shapes/Shapu.js';
import Wall from '../Wall.js';
const engine = Matter.Engine.create({enableSleeping: false});
const world = engine.world;
const triangle = Matter.Bodies.rectangle(0, CELL_SIZE, CELL_SIZE, CELL_SIZE, {label: "triangle",restitution:0, inertia: Infinity, frictionAir: 0.02});
const square = Matter.Bodies.rectangle(CELL_SIZE*5, CELL_SIZE, CELL_SIZE, CELL_SIZE, {label: "triangle",restitution:0,inertia: Infinity, frictionAir: 0.02});
const floor = Matter.Bodies.rectangle(BOARD_WIDTH/2, BOARD_HEIGHT, BOARD_WIDTH*2, CELL_SIZE, {label: "floor",isStatic: true,});
const rightWall = Matter.Bodies.rectangle(BOARD_WIDTH, 0, WIDTH_BETWEEN_SCREEN_BOARD, BOARD_HEIGHT, {label: "rightWall",isStatic: true,});
// const topWall = Matter.Bodies.rectangle(0, 0, BOARD_WIDTH, 5, {label: "topWall", isStatic: true,});
const leftWall = Matter.Bodies.rectangle(-WIDTH_BETWEEN_SCREEN_BOARD, 0, 1, BOARD_HEIGHT, {label: "leftWall",isStatic: true,});

Matter.World.add(world,[floor, triangle, square, leftWall, rightWall]);

Matter.Events.on(engine, "collisionStart", (event) => {  // collision
    let pairs = event.pairs
    let a = pairs[0];
    let b = pairs[0];

    // if (b === "leftWall") {
    //     let currPos = {x: 0, y: a.position.y}
    //     a.setPosition(a.bodyA, currPos)
    // }
    // if (b === "rightWall") {
    //     let currPos = {x: MAX_WIDTH_UNIT * CELL_SIZE, y: a.position.y}
    //     a.setPosition(a.bodyA, currPos)
    // }
    // console.log(a.bodyA);
    console.log(b.bodyB.label);
});

class Game extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        gameOver: false
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
                    systems={[Physics, MoveShape,]}
                    entities={{
                        physics: {
                            engine: engine,
                            world: world
                        },
                        floor: {
                            body: floor,
                            position: [0, BOARD_HEIGHT],
                            size: [BOARD_WIDTH, 1],
                            renderer: <Wall />
                        },
                        // topWall: {
                        //     body: topWall,
                        //     position: [0, 0],
                        //     size: [BOARD_WIDTH,1],
                        //     renderer: <Wall />
                        // },
                        leftWall: {
                            body: leftWall,
                            position: [0, 0],
                            size: [1, BOARD_HEIGHT],
                            renderer: <Wall />
                        },
                        rightWall: {
                            body: rightWall,
                            position: [BOARD_WIDTH, 0],
                            size: [1, BOARD_HEIGHT],
                            renderer: <Wall />
                        },
                        triangle: {
                            body: triangle,
                            renderer: <Triangle />
                        },
                        triangle1: {
                            body: square,
                            renderer: <Triangle />
                        },       
                    }}>
                    <StatusBar hidden={true} />                   
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
        height: HEIGHT_BETWEEN_SCREEN_BOARD
    },
    board: {
        flex: null,
        height: BOARD_HEIGHT,
        width: BOARD_WIDTH,
        // borderRadius: 10,
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