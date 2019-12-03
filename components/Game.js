import React from 'react';
import Matter from 'matter-js';
import { StyleSheet, Text, View, StatusBar, ImageBackground, TextInput, TouchableOpacity} from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import { Physics, MoveShape, NextRowShapes, KeepShapesInScreen, UpgradeShape, RemoveShape, Score} from '../Systems.js'
import { CELL_SIZE, HEIGHT_BETWEEN_SCREEN_BOARD,WIDTH_BETWEEN_SCREEN_BOARD,BOARD_HEIGHT, BOARD_WIDTH} from '../Constants.js'
import * as Progress from 'react-native-progress';
import Wall from '../Wall.js';

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.gameEngine = null,
        this.entities = this.setUpWorld()
    }

    state = {
        gameOver: true,
        nextRow: false,
        nextRowTime: 0,
        score: 0,
        id: 0,
        gravity: -0.0075
    }

    setUpWorld = () => {
        const engine = Matter.Engine.create({enableSleeping: false});
        const world = engine.world;
        world.gravity.y = this.state.gravity;
        // const triangle = Matter.Bodies.rectangle(0, CELL_SIZE, CELL_SIZE, CELL_SIZE, {label: "triangle", restitution:0, mass: 0, inertia: Infinity, });
        // const square = Matter.Bodies.rectangle(CELL_SIZE*5, CELL_SIZE, CELL_SIZE, CELL_SIZE, {label: "triangle",restitution:0, mass: 0, inertia: Infinity, });
        // const pentagon = Matter.Bodies.rectangle(CELL_SIZE*3, CELL_SIZE, CELL_SIZE, CELL_SIZE, {label: "square",restitution:0, mass: 0, inertia: Infinity, });
        const bottomWall = Matter.Bodies.rectangle(BOARD_WIDTH/2, BOARD_HEIGHT, BOARD_WIDTH, CELL_SIZE, {label: "bottomWall",isStatic: true,});
        const rightWall = Matter.Bodies.rectangle(BOARD_WIDTH, 0, WIDTH_BETWEEN_SCREEN_BOARD, BOARD_HEIGHT, {label: "rightWall", isStatic:true});
        const topWall = Matter.Bodies.rectangle(0,-(CELL_SIZE/2), BOARD_WIDTH, CELL_SIZE, {label: "topWall", isStatic: true,});
        const leftWall = Matter.Bodies.rectangle(-CELL_SIZE, 0, WIDTH_BETWEEN_SCREEN_BOARD, BOARD_HEIGHT, {label: "leftWall",isStatic: true,});
        Matter.World.add(world,[bottomWall, leftWall, rightWall, topWall]);
        this.handleCollision(engine, world);

        return  {   physics: { engine: engine, world: world, scored: false},
                    bottomWall: { body: bottomWall, position: [0, BOARD_HEIGHT], size: [BOARD_WIDTH, 1], renderer: <Wall /> },
                    topWall: { body: topWall, position: [0, 0], size: [BOARD_WIDTH, 1], renderer: <Wall /> },
                    leftWall: { body: leftWall, position: [0, 0], size: [1, BOARD_HEIGHT], renderer: <Wall /> },
                    rightWall: { body: rightWall, position: [BOARD_WIDTH, 0], size: [1, BOARD_HEIGHT], renderer: <Wall /> },
        }
    }

    handleCollision = (engine, world) => {
        Matter.Events.on(engine, "collisionStart", (event) => {  // collisionStart
            for(let i = 0; i < event.pairs.length; ++i) {
                let a = event.pairs[i].bodyA;   // doing the collision
                let b = event.pairs[i].bodyB;   // victim of collision
                // console.log(a.label);
                // console.log(b.label);
                if (a.label === "topWall" || b.label === "topWall") {       // game over when block hits top wall
                    this.gameEngine.dispatch({type: "game-over"});
                }
                else if (a.label === b.label) {
                    // a.label = "DESTROY";
                    a.label = "DESTROY";
                    b.label = "U" + b.label;    
                }
                else if (a.label.substring(a.length-4) === "Wall" || b.label.substring(b.length-4) === "Wall") {    // one of them is a wall
                    if (a.label.substring(a.length-4) === "Wall") {
                        Matter.Body.setVelocity(b,{x: -b.velocity.y, y: b.velocity.y})
                    }
                    else {
                        Matter.Body.setVelocity(a,{x: -a.velocity.y, y: a.velocity.y})
                    }
                }
                else { 
                    if (a.position.x < b.position.x)
                        Matter.Body.setVelocity(b,{x: b.velocity.y, y: a.velocity.y})
                    else 
                        Matter.Body.setVelocity(b,{x: -b.velocity.y, y: a.velocity.y})
                }
            }
        }); //collisionStart

    }
    
    onEvent = (event) => {
        if (event.type === "game-over") {
            this.setState({gameOver: false});
        }
        else if (event.type === "score") {
            this.setState({score: this.state.score + 1});
        }
        else if (event.type === "resetTimer") {
            this.setState({nextRowTime: 0});
        }
        else if (event.type === "timer") {
            this.setState({nextRowTime: this.state.nextRowTime + 0.2})
        }
    }

    render(){
        return (
            <ImageBackground source={require('../images/gamebackground.jpg')} style={styles.backgroundImage}>
                <View style ={styles.topContainer}>
                    <Text style={styles.scores}>Person Top Score: {this.state.score}</Text>
                    <Text style={styles.scores}>Current Score: {this.state.score}</Text>
                    <Progress.Bar progress={this.state.nextRowTime} width ={BOARD_WIDTH} height={Math.floor(CELL_SIZE/3)}/>
                </View>
                <GameEngine
                    style={styles.board}
                    ref={(ref) => {this.gameEngine = ref}}
                    onEvent={this.onEvent}
                    running={this.state.gameOver}
                    systems={[Physics, MoveShape, NextRowShapes, RemoveShape, UpgradeShape, KeepShapesInScreen, Score]}
                    entities={this.entities}>
                    <StatusBar hidden={true} />                   
                </GameEngine>
                { this.state.gameOver ?
                    null : 
                    (<View style={styles.gameOver}> 
                        <TextInput/>
                        <TextInput/>
                        <TouchableOpacity>
                            <Text> submit</Text>
                        </TouchableOpacity>
                    </View>) 
                }
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    // parentContainer: {
    //     justifyContent: 'center',
    //     alignItems: 'center',
    // },
    topContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: HEIGHT_BETWEEN_SCREEN_BOARD,
    },
    backgroundImage: {
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    board: {
        flex: null,
        height: BOARD_HEIGHT,
        width: BOARD_WIDTH,
        // borderRadius: 10,
        borderWidth: 1
    },
    scores: {
        fontFamily:  'Baloo',
        color: 'white'
    },
    progressBar: {
        transform: [{rotate: '180deg'}]
    },
    gameOver: {
        justifyContent:'center',
        position: 'absolute',
        top: HEIGHT_BETWEEN_SCREEN_BOARD,
        borderRadius: 10,
        backgroundColor: 'white',
        height: BOARD_HEIGHT, 
        width: BOARD_WIDTH
    }
  })

export default Game;