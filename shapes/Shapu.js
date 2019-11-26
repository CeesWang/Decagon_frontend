import React, { Component } from "react";
import { View } from "react-native";

export default class Shapu extends Component {
  render() {
    const width = this.props.size;
    const height = this.props.size;
    const x = this.props.body.position.x - 1;
    const y = this.props.body.position.y - 1;
    
    return (
      <View
        style={{
            position: "absolute",
            left: x,
            top: y,
            width: width,
            height: height,
            backgroundColor: "black"
          }}/>
    );
  }
}