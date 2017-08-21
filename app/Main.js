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

import ReactNavigator from './Common/services/ReactNavigator';

export default class MainPage extends Component {
    render() {
    	return (
               <ReactNavigator />
            )
    }
}