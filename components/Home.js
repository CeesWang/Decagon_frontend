import React from 'react';
import { StyleSheet, Button, Text, View } from 'react-native';

class Home extends React.Component {
    render() {
        return (
            <View>
                <Text>HOMEPAGE WHY U AND NOT LOGIn</Text>
                <Text>HOMEPAGE WHY U AND NOT LOGIn</Text>
                <Text>HOMEPAGE WHY U AND NOT LOGIn</Text>
                <Button
                    title="CLICK ME"
                    onPress={()=> this.props.navigation.navigate('Login')}
                />
            </View>
        );
    }
}

export default Home
