import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Home from './Home.js';
import Login from './Login.js';
import Signup from './Signup.js';
import Game from './Game.js';


const AppNavigator = createStackNavigator(
    {
      Login: Login,
      Home: Home,
      Signup: Signup,
      Game: Game
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