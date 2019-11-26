import Matter from 'matter-js';
import React from 'react';
import { HEIGHT_BETWEEN_SCREEN_BOARD, WIDTH_BETWEEN_SCREEN_BOARD ,CELL_SIZE, MAX_WIDTH_UNIT} from './Constants.js'
const shapesArray = ["zero", "one", "two", "triangle", "square", "pentagon", "hexcagon", "heptagon", "octogon", "nonagon", "decagon"];
import Triangle from './shapes/Triangle.js';
import Square from './shapes/Square.js';
import Pentagon from './shapes/Pentagon.js';
import Hexagon from './shapes/Hexagon.js';
import Heptagon from './shapes/Heptagon.js';
import Octogon from './shapes/Octogon.js';
import Nonagon from './shapes/Nonagon.js';
import Decagon from './shapes/Decagon.js';

let selectedShape = null;
let id = 0;

export const Physics = (entities, {time }) => {
    let engine = entities["physics"].engine;
    Matter.Engine.update(engine, time.delta);
    return entities;
};

export const RemoveShape = (entities) => {
    let deleteShape = Object.keys(entities).find(key => key !== "physics" && entities[key].body.label === "DESTROY");
    if (deleteShape)
        delete entities[deleteShape]
    return entities;
}


export const MoveShape = (entities, {touches }) => {
	let start = touches.find(x => x.type === "start");  // on touch press
	if (start) {
        const startPos = [start.event.pageX - WIDTH_BETWEEN_SCREEN_BOARD, start.event.pageY-HEIGHT_BETWEEN_SCREEN_BOARD];
		selectedShape = Object.keys(entities).find(key => {
            let body = entities[key].body;
			return (
				body && distance([body.position.x+ CELL_SIZE/2,  body.position.y+ CELL_SIZE/2], startPos) < 25
			);
        });
	}

    let move = touches.find(x => x.type === "move"); // on touch move 

	if (move && entities[selectedShape]) {
        const currPos = {y: move.event.pageY - HEIGHT_BETWEEN_SCREEN_BOARD - (CELL_SIZE/2)};
        if (move.event.pageX >= MAX_WIDTH_UNIT*CELL_SIZE) {     // prevent box to move outside the right wall
            currPos.x = (MAX_WIDTH_UNIT-1) * CELL_SIZE;
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
    if (end && entities[selectedShape]) {
        const endPos = {x: findFallPosition(move.event.pageX - WIDTH_BETWEEN_SCREEN_BOARD - (CELL_SIZE/2)), y: move.event.pageY - HEIGHT_BETWEEN_SCREEN_BOARD - (CELL_SIZE/2)};
        Matter.Body.setPosition(entities[selectedShape].body, endPos)
        selectedShape = null;
    }

	return entities;
};

export const upgradeShape = (entities) => {
    let shape = Object.keys(entities).find(key => key !== "physics" && entities[key].body.label[0] === "U");    // Utriangle, Usquare etc
    if (shape) {        // found the block to upgrade
        let world = entities["physics"].world;
        let position = [entities[shape].body.position.x, entities[shape].body.position.y]
        let label = nextShape(entities[shape].body.label.substring(1))       //triangle square etc
        let newShape = Matter.Bodies.rectangle(
            position[0],
            position[1],
            CELL_SIZE,
            CELL_SIZE, 
            { label: label, restitution:0, inertia: Infinity, frictionAir: 0.01 }
            );
            
            Matter.World.add(world, [newShape]);
            
            entities[++id] = {  
                body: newShape,
                renderer: renderShape(label) 
            }

            Matter.Composite.remove(world, entities[shape].body);           
            delete entities[shape]
        }
        return entities
}

export const Clock = (entities, {time }) => {
    return entities;
};

const distance = ([x1, y1], [x2, y2]) => Math.sqrt(Math.abs(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)));

const findFallPosition = (xCoordinate) => {
    if (xCoordinate < 0) 
        return 0;
    for(let i = 1; i < MAX_WIDTH_UNIT; ++i) {
        if (xCoordinate <= i*CELL_SIZE) {
            return(i*CELL_SIZE);
        }
    }
    return((MAX_WIDTH_UNIT-1)*CELL_SIZE);
}

const renderShape = (label) => {
    switch(label) {
        case "triangle":
            return <Triangle /> 
        case "square": 
            return <Square />
        case "pentagon":
            return <Pentagon />
        case "hexagon":
            return <Hexagon />    
        case "heptagon":
                return <Heptagon />
        case "octogon":
                return <Octogon />
        case "nonagon":
                return <Nonagon />
        case "decagon":
                return <Decagon />
    }
    return 0;
}

const nextShape = (currShape) => {
    for (let i = 0; i < shapesArray.length; ++i) {
        if (shapesArray[i] === currShape) {
            return shapesArray[i+1];        // next shape
        }
    }
    return 0;
}
