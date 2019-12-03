import React from 'react'
import {Dimensions} from 'react-native';
export const MAX_WIDTH = Dimensions.get("screen").width > Dimensions.get("screen").height ? 
                        (Dimensions.get("screen").width) * 0.5 : (Dimensions.get("screen").width);
export const MAX_HEIGHT = Dimensions.get("screen").height;
export const MAX_HEIGHT_UNIT = 7;
export const MAX_WIDTH_UNIT = 6;
export const OFFSET = 10;
export const BOARD_HEIGHT = Math.floor(MAX_HEIGHT * 0.7);
export const BOARD_WIDTH = Math.floor(MAX_WIDTH * 0.9);
export const CELL_SIZE = Math.floor((BOARD_WIDTH / MAX_WIDTH_UNIT) - OFFSET*1.1);
export const HEIGHT_BETWEEN_SCREEN_BOARD = Math.floor((MAX_HEIGHT-BOARD_HEIGHT) / 2); 
export const WIDTH_BETWEEN_SCREEN_BOARD = Math.floor((MAX_WIDTH-BOARD_WIDTH) / 2); 