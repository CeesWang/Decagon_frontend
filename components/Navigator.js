import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Login from './Login.js';
import Game from './Game.js';
import LeaderBoard from './LeaderBoard';

const AppNavigator = createStackNavigator(
    {
      Login: Login,
      LeaderBoard: LeaderBoard,
      Game: Game,
    },
    {
      headerMode: 'none'
    },
    {
      initialRouteName: 'Login',
    }
  );

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;