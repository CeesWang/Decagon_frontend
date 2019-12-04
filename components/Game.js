import React from 'react';
import Matter from 'matter-js';
import { StyleSheet, Text, View, StatusBar, ImageBackground, TextInput, TouchableOpacity} from 'react-native';
import * as Progress from 'react-native-progress';
import { GameEngine } from 'react-native-game-engine';
import { Physics, MoveShape, NextRowShapes, KeepShapesInScreen, UpgradeShape, RemoveShape, Score, Reset} from '../Systems.js'
import { CELL_SIZE, HEIGHT_BETWEEN_SCREEN_BOARD,WIDTH_BETWEEN_SCREEN_BOARD,BOARD_HEIGHT, BOARD_WIDTH, API_BASE} from '../Constants.js'
import DecagonScore from '../shapes/DecagonScore.js';

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.gameEngine = null,
        this.world = null,
        this.entities = this.setUpWorld()
    }

    state = {
        gameOver: true,
        nextRow: false,
        nextRowTime: 0,
        score: 0,
        id: 0,
        name: "",
        topScore: 0,
        gravity: -0.0075
    }

    setUpWorld = () => {
        const engine = Matter.Engine.create({enableSleeping: false});
        const world = engine.world;
        this.world = world;
        this.world.gravity.y = this.state.gravity;
        const bottomWall = Matter.Bodies.rectangle(BOARD_WIDTH/2, BOARD_HEIGHT, BOARD_WIDTH, CELL_SIZE, {label: "bottomWall",isStatic: true,});
        const rightWall = Matter.Bodies.rectangle(BOARD_WIDTH, 0, WIDTH_BETWEEN_SCREEN_BOARD, BOARD_HEIGHT, {label: "rightWall", isStatic:true});
        const topWall = Matter.Bodies.rectangle(0,-CELL_SIZE, BOARD_WIDTH, CELL_SIZE, {label: "topWall", isStatic: true,});
        const leftWall = Matter.Bodies.rectangle(-CELL_SIZE, 0, WIDTH_BETWEEN_SCREEN_BOARD, BOARD_HEIGHT, {label: "leftWall",isStatic: true,});
        Matter.World.add(world,[bottomWall, leftWall, rightWall, topWall]);
        this.handleCollision(engine, world);

        return  {   physics: { engine: engine, world: world, scored: false},
                    bottomWall: { body: bottomWall, position: [0, BOARD_HEIGHT], size: [BOARD_WIDTH, 1] },
                    topWall: { body: topWall, position: [0, 0], size: [BOARD_WIDTH, 1] },
                    leftWall: { body: leftWall, position: [0, 0], size: [1, BOARD_HEIGHT] },
                    rightWall: { body: rightWall, position: [BOARD_WIDTH, 0], size: [1, BOARD_HEIGHT] },
        }
    }

    handleCollision = (engine, world) => {
        Matter.Events.on(engine, "collisionStart", (event) => {  // collisionStart
            for(let i = 0; i < event.pairs.length; ++i) {
                let a = event.pairs[i].bodyA;   // doing the collision
                let b = event.pairs[i].bodyB;   // victim of collision
                if (a.label === "topWall" || b.label === "topWall") {       // game over when block hits top wall
                    this.gameEngine.dispatch({type: "game-over"});
                }
                else if (a.label === b.label) {
                    // a.label = "DESTROY";
                    a.label = "DESTROY";
                    b.label = "U" + b.label;    
                }
                else if (a.label.substring(a.length-4) === "Wall" || b.label.substring(b.length-4) === "Wall") {    // one of them is a wall
                    a.label.substring(a.length-4) === "Wall" ? 
                    Matter.Body.setVelocity(b,{x: -b.velocity.y, y: b.velocity.y})
                    : 
                    Matter.Body.setVelocity(a,{x: -a.velocity.y, y: a.velocity.y})
                }
                else { 
                    a.position.x < b.position.x ? 
                    Matter.Body.setVelocity(b,{x: b.velocity.y, y: a.velocity.y}) 
                    :
                    Matter.Body.setVelocity(b,{x: -b.velocity.y, y: a.velocity.y})
                }
            }
        }); //collisionStart
    }
    
    onEvent = (event) => {
        if (event.type === "game-over") {
            this.setState({gameOver: false});
        }
        else if (event.type === "gravity") {
            this.world.gravity.y -= 0.0015
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
    handleSubmit = () => {
        fetch(API_BASE,{
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
                "Accepts" : "application/json"
            },
            body: JSON.stringify( {
                name: this.state.name,
                score: this.state.score
            })
        })
        .then(resp => resp.json())
        .then(data => {
            if (data.score > this.state.topScore){
                this.setState({topScore: data.score});
            }
        })
    .catch((error) => {
        console.log("submit score", error);
        })     
    }
    
    handleNextGame = () => {
        Reset();    //resets the constants in system
        this.gameEngine.swap(this.setUpWorld());
        this.setState({gameOver: !this.state.gameOver, score: 0, nextRowTime: 0});
    }
    
    render(){
        return (
            <ImageBackground source={require('../images/background2.jpg')} style={styles.backgroundImage}>
                <View style ={styles.topContainer}>
                    <View style={styles.scoreContainer}>
                        <Text style={styles.scores}>HIGH SCORE: {this.state.topScore}          </Text>
                        <Text style={styles.scores}>SCORE: </Text>
                        <DecagonScore />
                        <Text style={styles.scores}> x {this.state.score}</Text>
                    </View>
                    <Progress.Bar unfilledColor="black" color="#cb2d3e" style={styles.progressBar}progress={this.state.nextRowTime} width ={BOARD_WIDTH} height={Math.floor(CELL_SIZE/3)}/>
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
                { this.state.gameOver ?             // popup after the game is over
                    null : 
                    (<View style={styles.gameOver}> 
                        <TextInput
                            style={styles.name}
                            placeholder="Enter your name:"
                            onChangeText={(name) => this.setState({name: name})}
                            value={this.state.name} 
                        />
                        <TouchableOpacity onPress={this.handleSubmit}>
                            <Text style={styles.gameOverOptions} >Submit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={styles.gameOverOptions} onPress={this.handleNextGame}>Play Again</Text>
                        </TouchableOpacity>
                    </View>) 
                }
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    topContainer: {
        alignItems: 'center',
        height: HEIGHT_BETWEEN_SCREEN_BOARD,
    },
    backgroundImage: {
        width: '100%',
        height: '100%',
    },
    scoreContainer: {
        margin: 20,
        flexDirection: 'row',
    },
    board: {
        alignSelf: 'center',
        flex: null,
        height: BOARD_HEIGHT,
        width: BOARD_WIDTH,
        borderRadius: 10,
        backgroundColor: 'rgba(0,0,0,0.3)',
        borderWidth: 1
    },
    scores: {
        fontFamily:  'Baloo',
        color: 'white',
        fontSize: 26
    },
    progressBar: {
        flexWrap: 'wrap',
    },
    gameOver: {
        justifyContent:'center',
        alignItems: 'center',
        alignSelf: 'center',
        position: 'absolute',
        top: HEIGHT_BETWEEN_SCREEN_BOARD,
        borderRadius: 10,
        fontFamily: 'Baloo',
        fontSize: 18,
        color: 'white',
        backgroundColor: 'rgba(0,0,0,0.5)',
        height: BOARD_HEIGHT, 
        width: BOARD_WIDTH
    },
    gameOverOptions: {
        fontFamily: 'Baloo',
        color: 'white',
        fontSize: 18,
        margin: 6
    },
    name :{
        height: CELL_SIZE/2,
        width: BOARD_WIDTH/2,
        textAlign: 'center',
        borderWidth: 1,
        borderColor: 'white',
        fontFamily: 'Baloo',
        color: 'white',
        margin: 10
    }
  })

export default Game;