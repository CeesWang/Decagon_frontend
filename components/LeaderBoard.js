import React from 'react';
import {StyleSheet, ImageBackground, Text, View, StatusBar, Image} from 'react-native';
import {API_BASE} from '../Constants';

class LeaderBoard extends React.Component {
    _isMounted = false;
    state = {
        topTen: []
    }
    componentDidMount() {
        this._isMounted = true;
        fetch(API_BASE + "leaderboard")
            .then(resp => resp.json())
            .then(data => {
                this.setState({topTen: data});        
        })
        .catch((error) => {
            console.log("leaderboard network", error);
        })        
    }

    componentWillUnmount() {
        this._isMounted = false;
    }
    
    renderScores = () => {
        let index = 0;

        return this.state.topTen.map( entree => { 
                ++index;
                let view = null;
                if (index === 1) {
                    view = (<View> 
                                <Image source={require('../images/first.png')} style={styles.icon}/>
                            </View>)
                }
                else if (index === 2) {
                    view = (<View> 
                                <Image source={require('../images/second.png')} style={styles.icon}/>
                            </View>)
                }

                else if (index === 3) {
                    view = (<View> 
                                <Image source={require('../images/third.png')} style={styles.icon}/>
                            </View>)
                }
                else {
                    view = (<View> 
                                <Text style={styles.index}>{index}</Text>
                            </View>)
                }
                return (
                    <View key={entree.id} style ={styles.row}>
                        <View style={{flex:2, alignItems: 'center'}}> 
                            {view}
                        </View>
                        <View style={{flex:4}}>
                            <Text style={styles.name}>{entree.name}</Text>
                        </View>
                        <View style={{flex:2, alignItems: 'center'}}>
                            <Text style={styles.score}>{entree.score}</Text>
                        </View>
                    </View>
                )
                // return <Text style={styles.row}key={entree.id}> <Text style={styles.index} >{`${index}.`}</Text> <Text style={styles.name}>{entree.name}</Text> <Text style={styles.score}>{entree.score}</Text> </Text>
        })

    }

    render() {
        return (
        <ImageBackground source={require('../images/background2.jpg')} style={styles.container}>
            <StatusBar hidden={true} />  
            <Text style={styles.title}> Top Ten</Text>
            <View>
                <View style ={styles.row}>
                    <View style={{flex:2, alignItems: 'center'}}>
                        <Text style={styles.index}>Rank</Text>
                    </View>
                    <View style={{flex:4}}>
                        <Text style={styles.name}>Name</Text>
                    </View>
                    <View style={{flex:2, alignItems: 'center'}}>
                        <Text style={styles.score}>Score</Text>
                    </View>
                </View>
                {this.renderScores()}
            </View>
        </ImageBackground>
        );
    }
}

export default LeaderBoard;

const styles = StyleSheet.create({
    container: {
        // alignItems: 'center',
        flex: 1,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title:{
        fontFamily: 'Baloo',
        margin: 30,
        color: 'white',
        alignSelf: 'center',
        fontSize: 50,
    },

    name: {
        fontFamily: 'Baloo',
        color: 'white',
        fontSize: 30,
        width: 400,
        justifyContent: 'center',
    },
    index: {
        fontFamily: 'Baloo',
        color: 'white',
        position: 'relative',
        fontSize: 30,
    },
    score: {
        fontFamily: 'Baloo',
        color: 'white',
        justifyContent: 'flex-end',
        fontSize: 30
    }
})