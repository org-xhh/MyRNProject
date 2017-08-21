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
import HeadBar from '../../Common/components/HeadBar';

export default class IndexPage extends Component {
    constructor(props) {
    	super(props);
    	this.state = {
            welcome: "你好",
            flag:1,
        }
        const { navigate,state,goBack } = props.navigation;
        this.params = state.params || {};
        this.goBack = goBack;
    }
    changeEvent(num) {
    	this.setState({
    		flag: num
    	})
    }
    
    renderFn() {
        const { flag } = this.state;
        if(flag == 1) {
            return (
                    <View style={styles.viewStyle}>
                        <View style={{ flexDirection:'row' }}>
                            <Text>flag1:</Text>
                            <Text>{ flag }</Text>
                        </View>
                        <TouchableOpacity activeOpacity={0.8} style={styles.btnStyle} onPress={this.changeEvent.bind(this,2)}><Text>点我切换</Text></TouchableOpacity>
                    </View>
                )
        } else {
            return (
                <View style={styles.viewStyle}>
                    <View style={{ flexDirection:'row' }}>
                        <Text>flag2:</Text>
                        <Text>{ flag }</Text>
                    </View>
                    <TouchableOpacity style={styles.btnStyle} onPress={this.changeEvent.bind(this,1)}><Text>点我切换</Text></TouchableOpacity>
                </View>
            )
        }
    }

    render() {
        return (
            <View style={{flex:1}}>
                <HeadBar
                    title="状态"
                    leftIcon={IconData.newBackIcon}
                    leftIconPress={() => {this.goBack()}} />
                    { this.renderFn() }
            </View>   
            )
    	
    }
}

const styles = StyleSheet.create({
	viewStyle: {
		flex: 1,
		justifyContent: 'center',
        alignItems: 'center'
	},
	btnStyle: {
		margin: 10
	}
})