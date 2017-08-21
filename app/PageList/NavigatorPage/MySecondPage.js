import React, { Component } from 'react';
import {  
    AppRegistry,  
    Text,  
    Button,  
    View,  
} from 'react-native';  
  
export default class MySecondPage extends Component {   
    constructor(props){
        super(props);
        const { navigate,state,goBack } = props.navigation;
        this.params = state.params || {};
        this.goBack = goBack;
    }
    static navigationOptions = ({ navigation }) => {
      const {state, setParams} = navigation;
      const isInfo = state.params.mode === 'info';
      const {user} = state.params;
      return {
        title: isInfo ? `${user}'s Contact Info` : `Chat with ${state.params.user}`,
        headerRight: ( <Button
            title={isInfo ? 'Done' : `${user}'s info`}
            onPress={() => setParams({ mode: isInfo ? 'none' : 'info'})} />
        ),
      };
    };
    render() {   
        return (  
            <View style={{flex:1}}>  
                <Text style={{marginVertical:20,textAlign:'center'}}>Chat with {this.params.user}</Text>  
                <Button onPress={() => { this.params.callback('我是secondPage信息');this.goBack() }} title="返回"></Button>
            </View>  
        );  
    }  
}  