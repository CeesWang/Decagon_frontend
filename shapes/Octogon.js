import React from 'react';
import Svg, { Polygon }from 'react-native-svg';
import {CELL_SIZE} from '../Constants.js'

export default class Octogon extends React.Component{
    render(){
        return (
            <Svg style={{ width: CELL_SIZE, height: CELL_SIZE, position:'absolute', left: this.props.body.position.x, top: this.props.body.position.y}}>
                <Polygon
                strokeLinejoin="round"
                points={`${CELL_SIZE*0.3} 0, ${CELL_SIZE*0.7} 0, ${CELL_SIZE} ${CELL_SIZE*0.3}, ${CELL_SIZE} ${CELL_SIZE*0.7}, ${CELL_SIZE*0.7} ${CELL_SIZE},  ${CELL_SIZE * 0.3} ${CELL_SIZE}, 0 ${CELL_SIZE*0.7}, 0 ${CELL_SIZE*0.3}`}
                />
            </Svg>
        )
    }
}