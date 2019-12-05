import React from 'react';
import * as Font from 'expo-font';
import Navigator from './components/Navigator.js';
import { Provider } from 'react-redux';
import { store } from './ReduxStore'; 
//credit
//<div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
class App extends React.Component {
  
  state = {
    fontLoaded : false,
  }

  async componentDidMount() {
    await Font.loadAsync({    // loads the fonts
      'Baloo': require('./assets/fonts/Baloo.ttf'),
    });
    this.setState({ fontLoaded: true});
  }

  render () {
    return this.state.fontLoaded ? 
    (
      <Provider store={store}> 
        <Navigator /> 
      </Provider>
    ) : null;
  }
}

export default App

