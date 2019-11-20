import React from 'react';
import * as Font from 'expo-font';
import Navigator from './components/Navigator.js'

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
    // if (this.state.fontLoaded)
    //   return <Navigator />
    // else 
    //   return null;
    return this.state.fontLoaded ? <Navigator /> : null;
  }
}

export default App;


