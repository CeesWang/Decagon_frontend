import React from 'react'
import {Dimensions} from 'react-native';

export const MAX_WIDTH = Dimensions.get("screen").width;
export const MAX_HEIGHT = Dimensions.get("screen").height;
export const MAX_HEIGHT_UNIT = 7;
export const BOARD_HEIGHT = MAX_HEIGHT * 0.7;
export const BOARD_WIDTH = MAX_WIDTH * 0.8;
export const CELL_SIZE = BOARD_WIDTH / 8;