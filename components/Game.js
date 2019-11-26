import React from 'react';
import Matter from 'matter-js';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import { Physics, MoveShape, RemoveShape, upgradeShape, Clock } from '../Systems.js'
import { CELL_SIZE, HEIGHT_BETWEEN_SCREEN_BOARD,WIDTH_BETWEEN_SCREEN_BOARD,BOARD_HEIGHT, BOARD_WIDTH} from '../Constants.js'
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
const triangle = Matter.Bodies.rectangle(0, CELL_SIZE, CELL_SIZE, CELL_SIZE, {label: "triangle",restitution:0, inertia: Infinity, frictionAir: 0.01});
const square = Matter.Bodies.rectangle(CELL_SIZE*5, CELL_SIZE, CELL_SIZE, CELL_SIZE, {label: "triangle",restitution:0,inertia: Infinity, frictionAir: 0.01});
const pentagon = Matter.Bodies.rectangle(CELL_SIZE*3, CELL_SIZE, CELL_SIZE, CELL_SIZE, {label: "square",restitution:0,inertia: Infinity, frictionAir: 0.01});
const floor = Matter.Bodies.rectangle(BOARD_WIDTH/2, BOARD_HEIGHT, BOARD_WIDTH*2, CELL_SIZE, {label: "floor",isStatic: true,});
const rightWall = Matter.Bodies.rectangle(BOARD_WIDTH, 0, WIDTH_BETWEEN_SCREEN_BOARD, BOARD_HEIGHT, {label: "rightWall",isStatic: true,});
// const topWall = Matter.Bodies.rectangle(0, 0, BOARD_WIDTH, 5, {label: "topWall", isStatic: true,});
const leftWall = Matter.Bodies.rectangle(-WIDTH_BETWEEN_SCREEN_BOARD, 0, 1, BOARD_HEIGHT, {label: "leftWall",isStatic: true,});

Matter.World.add(world,[floor, leftWall, rightWall, triangle, square, pentagon]);

Matter.Events.on(engine, "collisionStart", (event) => {  // collision
    let a = event.pairs[0].bodyA;   // doing the collision
    let b = event.pairs[0].bodyB;   // victim of collision
    if (a.label === b.label) {
        if (a.label === "nonagon") {
            
        }
        else {  
            a.label = "DESTROY";
            b.label = "U" + b.label;        // upgrade body
            Matter.Composite.remove(world, a);
        }
    }
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
                    systems={[Physics, MoveShape, RemoveShape, upgradeShape, Clock]}
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
                        square: {
                            body: pentagon,
                            renderer: <Square />
                        }       
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