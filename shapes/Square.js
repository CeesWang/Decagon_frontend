import React from 'react';
import Svg, { Polygon }from 'react-native-svg';
import {CELL_SIZE} from '../Constants.js'

export default class Square extends React.Component{
    render(){
        return (
            <Svg style={{ width: CELL_SIZE, height: CELL_SIZE, position:'absolute', left: CELL_SIZE*this.props.position[0],top: CELL_SIZE*this.props.position[1]}}>
                <Polygon
                strokeLinejoin="round"
                points={`0 0, 0 ${CELL_SIZE}, ${CELL_SIZE} ${CELL_SIZE}, ${CELL_SIZE} 0`} 
                />
            </Svg>
        )
    }
}