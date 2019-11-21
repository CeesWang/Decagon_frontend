import React from 'react';
import Svg, { Polygon }from 'react-native-svg';
import {CELL_SIZE} from '../Constants.js'

export default class Nonagon extends React.Component{
    render(){
        return (
            <Svg style={{ width: CELL_SIZE, height: CELL_SIZE, position:'absolute', left: CELL_SIZE*this.props.position[0],top: CELL_SIZE*this.props.position[1]}}>
                <Polygon
                strokeLinejoin="round"
                points={`${CELL_SIZE*0.5} 0, ${CELL_SIZE*0.83} ${CELL_SIZE*0.12}, ${CELL_SIZE} ${CELL_SIZE*0.43}, ${CELL_SIZE*0.94} ${CELL_SIZE*0.78}, ${CELL_SIZE*0.68} ${CELL_SIZE},  ${CELL_SIZE*0.32} ${CELL_SIZE}, ${CELL_SIZE*0.06} ${CELL_SIZE*0.78}, 0 ${CELL_SIZE*0.43}, ${CELL_SIZE*0.17} ${CELL_SIZE*0.12}`}                />
            </Svg>
        )
    }
}