import React from 'react';
import Svg, { Polygon, Defs, LinearGradient, Stop}from 'react-native-svg';
import {CELL_SIZE} from '../Constants.js'

heptagon = (props) => {
    return (
        <Svg style={{fill:"url(#grad)",scale: 0.9, width: CELL_SIZE, height: CELL_SIZE, position:'absolute', left: props.body.position.x, top: props.body.position.y}}>
            <Defs>
                <LinearGradient id="grad" x1="0" y1="0" x2="170" y2="0">
                <Stop offset="0" stopColor="#fc4a1a" stopOpacity="1" />
                <Stop offset="1" stopColor="#f7b733" stopOpacity="1" />
                </LinearGradient>
            </Defs>
            <Polygon
            strokeWidth="2"
            stroke="black"
            strokeLinejoin="round"
            points={`${CELL_SIZE*0.5} 0, ${CELL_SIZE*0.9} ${CELL_SIZE*0.2}, ${CELL_SIZE} ${CELL_SIZE*0.6}, ${CELL_SIZE*0.75} ${CELL_SIZE}, ${CELL_SIZE*0.25} ${CELL_SIZE}, 0 ${CELL_SIZE * 0.6}, ${CELL_SIZE*0.1} ${CELL_SIZE*0.2}`}
            />
        </Svg>
    )
}

export default heptagon