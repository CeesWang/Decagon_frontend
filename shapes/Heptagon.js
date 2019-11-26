import React from 'react';
import Svg, { Polygon }from 'react-native-svg';
import {CELL_SIZE} from '../Constants.js'

export default class Heptagon extends React.Component{
    render(){
        return (
            <Svg style={{ width: CELL_SIZE, height: CELL_SIZE, position:'absolute', left: this.props.body.position.x, top: this.props.body.position.y}}>
                <Polygon
                strokeLinejoin="round"
                points={`${CELL_SIZE*0.5} 0, ${CELL_SIZE*0.9} ${CELL_SIZE*0.2}, ${CELL_SIZE} ${CELL_SIZE*0.6}, ${CELL_SIZE*0.75} ${CELL_SIZE}, ${CELL_SIZE*0.25} ${CELL_SIZE}, 0 ${CELL_SIZE * 0.6}, ${CELL_SIZE*0.1} ${CELL_SIZE*0.2}`}
                />
            </Svg>
        )
    }
}