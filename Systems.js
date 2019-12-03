import Matter from 'matter-js';
import React from 'react';
import { HEIGHT_BETWEEN_SCREEN_BOARD, OFFSET,WIDTH_BETWEEN_SCREEN_BOARD ,CELL_SIZE, MAX_WIDTH_UNIT,BOARD_WIDTH, BOARD_HEIGHT} from './Constants.js'
import Triangle from './shapes/Triangle.js';
import Square from './shapes/Square.js';
import Pentagon from './shapes/Pentagon.js';
import Hexagon from './shapes/Hexagon.js';
import Heptagon from './shapes/Heptagon.js';
import Octogon from './shapes/Octogon.js';
import Nonagon from './shapes/Nonagon.js';
import Decagon from './shapes/Decagon.js';
const shapesArray = ["triangle", "square", "pentagon", "hexagon"]; //"heptagon", "octogon", "nonagon"
const shapesMap = { triangle: "square", square: "pentagon", pentagon: "hexagon", hexagon: "heptagon", heptagon: "octogon",octogon: "nonagon", nonagon: "decagon" } // maps to next upgrade
const renderShape = { triangle: <Triangle />, square: <Square />, pentagon: <Pentagon />, hexagon: <Hexagon />, heptagon: <Heptagon />, octogon: <Octogon />, nonagon: <Nonagon />, decagon: <Decagon /> }

let selectedShape = null;
let id = 0;
let nextRow = false;
let gameTime = 0;

export const Physics = (entities, { time, dispatch }) => {
    if ((time.current % 1000) >= 970) {
        dispatch({type: "timer"});      // increment timer     
        ++gameTime;
        nextRow = true;
    }

    let engine = entities["physics"].engine;
    Matter.Engine.update(engine, time.delta);
    return entities;
};

export const MoveShape = (entities, {touches }) => {
    let start = touches.find(x => x.type === "start");  // on touch press
	if (start) {
        const startPos = [start.event.pageX - WIDTH_BETWEEN_SCREEN_BOARD, start.event.pageY - HEIGHT_BETWEEN_SCREEN_BOARD];
		selectedShape = Object.keys(entities).find(key => {
            let body = entities[key].body;
			return (
				body && distance([body.position.x+ CELL_SIZE/2,  body.position.y+ CELL_SIZE/2], startPos) < 30
			);
        });
        // if (entities[selectedShape])
        //     Matter.Body.setStatic(entities[selectedShape].body, false)
	}

    let move = touches.find(x => x.type === "move"); // on touch move 

	if (move && entities[selectedShape]) {
        const currPos = {}
        if (move.event.pageY >= BOARD_HEIGHT)
            currPos.y = BOARD_HEIGHT-CELL_SIZE;
        else 
            currPos.y = move.event.pageY - HEIGHT_BETWEEN_SCREEN_BOARD - (CELL_SIZE/2);
        if (move.event.pageX >= MAX_WIDTH_UNIT*CELL_SIZE + MAX_WIDTH_UNIT*OFFSET) {     // prevent box to move outside the right wall
            currPos.x = (MAX_WIDTH_UNIT-1) * CELL_SIZE + MAX_WIDTH_UNIT*OFFSET;
        }
        else if (move.event.pageX- WIDTH_BETWEEN_SCREEN_BOARD - (CELL_SIZE/2) <= 0) { // prevent box to move outside the left wall
            currPos.x = 0;
        }
        else {
            currPos.x = move.event.pageX - WIDTH_BETWEEN_SCREEN_BOARD - (CELL_SIZE/2);
        }
        Matter.Body.setPosition(entities[selectedShape].body, currPos)
	}

    let end = touches.find(x => x.type === "end");  // on touch release
    if (end && entities[selectedShape] && move) {
        // const endPos = {x: findFallPosition(move.event.pageX - WIDTH_BETWEEN_SCREEN_BOARD - (CELL_SIZE/2)), y: move.event.pageY - HEIGHT_BETWEEN_SCREEN_BOARD - (CELL_SIZE/2)};
        // Matter.Body.setPosition(entities[selectedShape].body, endPos)
        selectedShape = null;
    }

	return entities;
};

export const KeepShapesInScreen = (entities) => {
    Object.keys(entities).forEach(key=> {
        if (key !== "physics" && key !== "leftWall" && key !== "rightWall" && key !== "topWall" && key !== "bottomWall") {
            let pos = {y: entities[key].body.position.y};
            if (entities[key].body.position.x <= 0 ) {
                pos.x = 0;
            }
            else if (entities[key].body.position.x+CELL_SIZE >= BOARD_WIDTH) {
                pos.x = CELL_SIZE * (MAX_WIDTH_UNIT-1);
            }
            else {
                pos.x = entities[key].body.position.x;
            }
            Matter.Body.setPosition(entities[key].body, pos);
        }
    });
    return entities;
}


export const RemoveShape = (entities) => {
    let deleteShape = Object.keys(entities).find(key => key !== "physics" && entities[key].body.label === "DESTROY");
    if (deleteShape) {
        Matter.Composite.remove(entities["physics"].world, entities[deleteShape].body);
        delete entities[deleteShape];
    }
    return entities;
}
export const UpgradeShape = (entities) => {
    let shape = Object.keys(entities).find(key => key !== "physics" && entities[key].body.label[0] === "U");    // Utriangle, Usquare etc
    if (shape) {        // found the block to upgrade
        let world = entities["physics"].world;
        let position = [entities[shape].body.position.x, entities[shape].body.position.y]
        let label = shapesMap[entities[shape].body.label.substring(1)]       //triangle square etc
        let newShape = Matter.Bodies.rectangle(
            position[0],
            position[1],
            CELL_SIZE,
            CELL_SIZE, 
            { label: label, inertia: Infinity, restitution: 0 }
            );
            Matter.World.add(world, [newShape]);
            
            entities[++id] = {  
                body: newShape,
                renderer: renderShape[label] 
            }
        Matter.Composite.remove(world, entities[shape].body);   
        delete entities[shape];         
    }
    return entities
}

export const NextRowShapes = (entities, {dispatch}) => {
    if (gameTime % 6 === 0 && nextRow) {
        let world = entities["physics"].world;
        for (let i = 0; i < MAX_WIDTH_UNIT; ++i) {
            let label = randomShape();
            let newShape = Matter.Bodies.rectangle(
                (CELL_SIZE * i) + (OFFSET * (i+1)),
                BOARD_HEIGHT - CELL_SIZE,
                CELL_SIZE,
                CELL_SIZE, 
                { label: label, inertia: Infinity, restitution: 0} 
                );
                Matter.World.add(world, [newShape]);
                
                entities[++id] = {  
                    body: newShape,
                    renderer: renderShape[label] 
                }
        } 
        dispatch({type: "resetTimer"});      // increment score by one 
        nextRow = false;
    }
    return entities
}

export const Score = (entities, {dispatch}) => {
    let world = entities["physics"].world;
    Object.keys(entities).forEach(key => {
        if (key !== "physics" && key.substring(key.length-4) !== "Wall") {
            if (entities[key].body.label === "decagon") {           
                Matter.Composite.remove(world, entities[key].body);     // delete if its a decagon          
                delete entities[key];
                dispatch({type: "score"});      // increment score by one 
            } 
        }
    });
    return entities;
}

const distance = ([x1, y1], [x2, y2]) => Math.sqrt(Math.abs(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)));

const randomShape = (shapeAbove ="nothing") => {
    let randomShape = shapesArray[Math.floor(Math.random() * shapesArray.length)];
    while (randomShape === shapeAbove) { 
        randomShape = shapesArray[Math.floor(Math.random() * shapesArray.length)];
    }
    return randomShape;         
}

const findFallPosition = (xCoordinate) => {
    if (xCoordinate < 0) 
        return OFFSET;
    for(let i = 1; i < MAX_WIDTH_UNIT; ++i) {
        if (xCoordinate <= i*CELL_SIZE + OFFSET*(i+1)) {
            return(i*CELL_SIZE + OFFSET*(i+1));
        }
    }
    return((MAX_WIDTH_UNIT-1)*CELL_SIZE + MAX_WIDTH_UNIT*OFFSET);
}

