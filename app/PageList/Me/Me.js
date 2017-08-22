import React, { Component } from 'react';
import {
    View,
    Image,
    TextInput,
    Text,
    TouchableOpacity,
    StyleSheet,
    Platform,
    NativeModules
} from 'react-native';

import { IconData } from '../../Common/styles/IconBase';

export default class Me extends Component {
    constructor(props) {
    	super(props);
    	 
    }
    
    render() {
        return (
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <Text>我的</Text>
            </View>   
        )
    }
}

const styles = StyleSheet.create({
 
})