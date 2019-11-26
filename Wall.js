import React from 'react';
import { View } from 'react-native';

export default class Square extends React.PureComponent{
    render(){
        return (
            <View style={{ backgroundColor:"green", width: this.props.size[0], height: this.props.size[1], 
                position:'absolute', left: this.props.position[0], top: this.props.position[1]}}>
            </View>
        )
    }
}