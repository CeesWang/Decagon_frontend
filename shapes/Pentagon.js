import React from 'react';
import Svg, { Polygon, Defs, LinearGradient, Stop}from 'react-native-svg';
import {CELL_SIZE} from '../Constants.js'

export default class Pentagon extends React.Component{
    render(){
        return (
            <Svg style={{fill:"url(#grad)", scale: 0.9, width: CELL_SIZE, height: CELL_SIZE, position:'absolute', left: this.props.body.position.x, top: this.props.body.position.y}}>
                <Defs>
                    <LinearGradient id="grad" x1="0" y1="0" x2="170" y2="0">
                    <Stop offset="0" stopColor="rgb(35,205,47)" stopOpacity="1" />
                    <Stop offset="1" stopColor="purple" stopOpacity="1" />
                    </LinearGradient>
                </Defs>
                <Polygon
                strokeWidth="1"
                stroke="blue"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={`${CELL_SIZE*0.5} 0, ${CELL_SIZE} ${CELL_SIZE*0.38}, ${CELL_SIZE*0.82} ${CELL_SIZE}, ${CELL_SIZE*0.18} ${CELL_SIZE}, 0 ${CELL_SIZE*0.38}`}
                />
            </Svg>
        )
    }
}