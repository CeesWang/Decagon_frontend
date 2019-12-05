import React from 'react';
import Svg, { Polygon, Defs, LinearGradient, Stop}from 'react-native-svg';
import {CELL_SIZE} from '../Constants.js'

hexagon = (props) => {
    return (
        <Svg style={{fill:"url(#grad)", scale: 0.9, width: CELL_SIZE, height: CELL_SIZE, position:'absolute',left: props.body.position.x, top: props.body.position.y}}>
            <Defs>
                <LinearGradient id="grad" x1="0" y1="0" x2="170" y2="0">
                <Stop offset="0" stopColor="#5433FF" stopOpacity="1" />
                <Stop offset="0.5" stopColor="#20BDFF" stopOpacity="1" />
                <Stop offset="1" stopColor="#A5FECB" stopOpacity="1" />
                </LinearGradient>
            </Defs>
            <Polygon
            strokeWidth="2"
            stroke="black"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={`${CELL_SIZE*0.5} 0, ${CELL_SIZE} ${CELL_SIZE*0.25}, ${CELL_SIZE} ${CELL_SIZE*0.75}, ${CELL_SIZE*0.5} ${CELL_SIZE}, 0 ${CELL_SIZE*0.75}, 0 ${CELL_SIZE * 0.25}`}
            />
        </Svg>
    )
}

export default hexagon