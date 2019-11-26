import Matter from 'matter-js';
import { HEIGHT_BETWEEN_SCREEN_BOARD, WIDTH_BETWEEN_SCREEN_BOARD ,CELL_SIZE, MAX_WIDTH_UNIT} from './Constants.js'
const distance = ([x1, y1], [x2, y2]) => Math.sqrt(Math.abs(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)));

const findFallPosition = (xCoordinate) => {
    if (xCoordinate < CELL_SIZE) 
        return 0;
    for(let i = 1; i < MAX_WIDTH_UNIT; ++i) {
        if (xCoordinate < i*CELL_SIZE) {
            console.log(xCoordinate);
            console.log("i",i)
            return(i*CELL_SIZE);
        }
    }
    return(MAX_WIDTH_UNIT*CELL_SIZE);
}

let shapeID = 0;
let figure = null;

export const Physics = (entities, {time }) => {
    let engine = entities["physics"].engine;
    Matter.Engine.update(engine, time.delta);
    return entities;
};


export const MoveShape = (entities, {touches }) => {

	let start = touches.find(x => x.type === "start");

	if (start) {
        const startPos = [start.event.pageX - WIDTH_BETWEEN_SCREEN_BOARD, start.event.pageY-HEIGHT_BETWEEN_SCREEN_BOARD];
		let shapeID = Object.keys(entities).find(key => {
            let body = entities[key].body;
			return (
				body && distance([body.position.x+ CELL_SIZE/2,  body.position.y+ CELL_SIZE/2], startPos) < 25
			);
        });
        if (shapeID !== undefined)
        figure = entities[shapeID];
	}

    let move = touches.find(x => x.type === "move");

	if (move && figure !== undefined && figure !== null) {
        console.log(move.event.pageX)
        console.log(move.event.pageX- WIDTH_BETWEEN_SCREEN_BOARD - (CELL_SIZE/2));
        const currPos = {y: move.event.pageY - HEIGHT_BETWEEN_SCREEN_BOARD - (CELL_SIZE/2)};
        if (move.event.pageX >= MAX_WIDTH_UNIT*CELL_SIZE) {
            currPos.x = (MAX_WIDTH_UNIT-1) * CELL_SIZE;
        }
        else if (move.event.pageX- WIDTH_BETWEEN_SCREEN_BOARD - (CELL_SIZE/2) <= 0) {
            currPos.x = 0;
        }
        else { 
            currPos.x = move.event.pageX - WIDTH_BETWEEN_SCREEN_BOARD - (CELL_SIZE/2);
        }
        Matter.Body.setPosition(figure.body, currPos)
	}

    let end = touches.find(x => x.type === "end");
    if (end) {
        const endPos = {x: findFallPosition(move.event.pageX - WIDTH_BETWEEN_SCREEN_BOARD - (CELL_SIZE/2)), y: move.event.pageY - HEIGHT_BETWEEN_SCREEN_BOARD - (CELL_SIZE/2)};
        Matter.Body.setPosition(figure.body, endPos)
        shapeID = null;
    }

	return entities;
};