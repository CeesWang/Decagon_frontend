import React from 'react';
import * as Font from 'expo-font';
import Navigator from './components/Navigator.js'

class App extends React.Component {
  
  componentDidMount() {
    Font.loadAsync({    // loads the fonts
      'Baloo': require('./assets/fonts/Baloo.ttf'),
    });
  }

  render () {
    return (
      <Navigator />
    )
  }
}

export default App;


