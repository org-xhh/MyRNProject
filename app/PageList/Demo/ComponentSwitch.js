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

import SwitchComp1 from '../../Common/components/SwitchComp1';
import SwitchComp2 from '../../Common/components/SwitchComp2';

export default class ComponentDemo extends Component {
    constructor(props) {
    	super(props);
    }

    render() {
    	return (
            <View style={{alignItems:'center'}}>
                <HeadBar
                    title="开关"
                    leftIcon={IconData.newBackIcon}
                    leftIconPress={() => {this.props.navigation.goBack()}} 
                    style={{backgroundColor:'#338ee2'}} />
                <SwitchComp1 />
                <SwitchComp1 isOpen={true} />
                <SwitchComp1
                    onTxt={'打开打开打开'}
                    offTxt={'关闭'}
                    isOpen={true}
                    widthStyle={90}
                    changeSwitchState={(val)=>{
                        alert(val);
                }} />
    			<SwitchComp2
                    cancelText={'全部'}
                    okText={'未读'}
                    style={styles.switchStyle}
                    calTextStyle={{fontSize:10}}
                    okTextStyle = {{fontSize:10}}
                    circle={styles.switchCircle}
                    cancelFn={(childThis)=>{
                         
                    }}
                    confirmFn={(childThis)=>{
                        
                }} />
            </View>
    		)
    }
}

const styles = StyleSheet.create({
    switchStyle:{
        marginRight:15,
        marginTop:10,
        width:50,
        height:20,
        borderWidth:0,
        marginLeft:19,
      },
      switchCircle:{
        height:20,
        width:20,
        borderWidth:1,
        borderColor:'#dfdfdf',
      }
})