import React from 'react';
import Svg, { Polygon, Defs, LinearGradient, Stop}from 'react-native-svg';
import {CELL_SIZE} from '../Constants.js'

export default class Nonagon extends React.Component{
    render(){
        return (
            <Svg style={{fill:"url(#grad)", scale: 0.9, width: CELL_SIZE, height: CELL_SIZE, position:'absolute', left: this.props.body.position.x, top: this.props.body.position.y}}>
                <Defs>
                    <LinearGradient id="grad" x1="0" y1="0" x2="170" y2="0">
                    <Stop offset="0" stopColor="blue" stopOpacity="1" />
                    <Stop offset="1" stopColor="brown" stopOpacity="1" />
                    </LinearGradient>
                </Defs>
                <Polygon
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={`${CELL_SIZE*0.5} 0, ${CELL_SIZE*0.83} ${CELL_SIZE*0.12}, ${CELL_SIZE} ${CELL_SIZE*0.43}, ${CELL_SIZE*0.94} ${CELL_SIZE*0.78}, ${CELL_SIZE*0.68} ${CELL_SIZE},  ${CELL_SIZE*0.32} ${CELL_SIZE}, ${CELL_SIZE*0.06} ${CELL_SIZE*0.78}, 0 ${CELL_SIZE*0.43}, ${CELL_SIZE*0.17} ${CELL_SIZE*0.12}`}                />
            </Svg>
        )
    }
}