import { createStore } from 'redux';

let roundTimer = 5;
let progessionBarIncrement = (1/(roundTimer-1));
const initialState ={
    gameTimer: 0,
    nextRow: true,
    roundTimer: roundTimer,
    score: 0,
    highscore: 0,
    name: '',
    progressBar: 0,
    submit: true,
  }

const resetGame = {
  gameTimer: 0,
  nextRow: true,
  score: 0,
  roundTimer: roundTimer,
  progressBar: 0,
}

  const reducer = (state = initialState, action) => {
    switch(action.type) {
      case 'INCREMENT_GAME_TIMER': 
        return Object.assign({}, state, {gameTimer: state.gameTimer + 1});
      case 'RESET_GAME_TIMER':
        return Object.assign({}, state, {gameTimer: 0});
      case 'NEXT_ROUND': 
        return Object.assign({}, state, {nextRow: !state.nextRow});
      case 'INCREMENT_SCORE': 
        return Object.assign({}, state, {score: state.score + 1});
      case 'UPDATE_NAME':
        return Object.assign({}, state, {name: action.payload});
      case 'INCREMENT_PROGRESS_BAR':
        return Object.assign({}, state, {progressBar: state.progressBar + progessionBarIncrement});
      case 'RESET_PROGRESS_BAR':
        return Object.assign({}, state, {progressBar: 0});
      case 'NEW_HIGH_SCORE':
        return Object.assign({}, state, {highscore: state.score});
      case 'RESET_GAME':
        return Object.assign({}, state, {...resetGame});
      case 'SUBMIT_FALSE': 
        return Object.assign({}, state, {submit: false});
      case 'SUBMIT_TRUE': 
        return Object.assign({}, state, {submit: true});
    }
    return state;
  }
  
export const store = createStore(reducer);