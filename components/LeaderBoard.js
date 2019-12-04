import React from 'react';
import {TouchableOpacity, StyleSheet, ImageBackground, Text, View, StatusBar, Image} from 'react-native';
import {API_BASE} from '../Constants';

class LeaderBoard extends React.Component {
    //baloo
    state = {
        topTen: []
    }
    componentDidMount() {
        fetch(API_BASE + "leaderboard")
            .then(resp => resp.json())
            .then(data => {
                this.setState({topTen: data});        
        })
        .catch((error) => {
            console.log("leaderboard network", error);
        })        
    }

    renderScores = () => {
        let index = 0;
        return this.state.topTen.map( entree => { 
                ++index;
                return <Text style={styles.scores} key={entree.id}>{` ${index} ${entree.name} ${entree.score }` } </Text>
        })

    }

    render() {
        return (
        <View style={styles.container}>
            <StatusBar hidden={true} />  
            <Text style={styles.title}> Top Ten</Text>
            <View>
                {this.renderScores()}
            </View>
        </View>
        );
    }
}

export default LeaderBoard;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#fff',
    },
    title:{
        fontFamily: 'Baloo',
        fontSize: 50
    },
    scores: {
        fontFamily: 'Baloo',
        fontSize: 30
    }
})