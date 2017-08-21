'use strict';

import React, { Component,PropTypes } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Platform,
    Animated,
    Easing,
    Switch,
} from 'react-native';

import { WinStyle } from '../styles/BaseStyle';
import { IconData } from '../styles/IconBase';

//开关控件
export default class SwitchComp1 extends Component {
  constructor(props) {
    super(props);
    let leftNumVal;
    if(props.widthStyle) {
        leftNumVal = -(props.widthStyle - 24);
    } else {
        leftNumVal = -(50 - 24);
    }
    this.state = {
        isOpen: props.isOpen || false,
        leftNum:new Animated.Value(props.isOpen ? 0 : leftNumVal),
        openTxtW:0,
        closeTxtW:0,
        widthStyle:props.widthStyle || 50,
        value:false,
        switchBgColor: props.isOpen ? '#338ee2' : '#666',
        onTxt: props.onTxt || '确定',
        offTxt: props.offTxt || '取消',
    }
  }

  // onLayout 当挂载或者布局变化以后调用
  openLoad(e){
    this.setState({
      openTxtW : e.nativeEvent.layout.width
    })
  }

  closeLoad(e){
    this.setState({
      closeTxtW : e.nativeEvent.layout.width
    })
  }

  trigger(){
    this.setState({
      isOpen: !this.state.isOpen
    },()=>{
        if(this.state.isOpen) {
            this.setState({
              switchBgColor: '#338ee2'
            })
        } else {
            this.setState({
              switchBgColor: '#666'
            })
        }
        Animated.timing(
          this.state.leftNum,
          {
              toValue: this.state.isOpen ? 0 :  -(this.state.widthStyle - 24) || -this.state.openTxtW,
              Easing:Easing.poly(2),
              duration:200,
          }
        ).start(()=>{
            this.props.changeSwitchState && this.props.changeSwitchState(this.state.isOpen);
        });
    })  
  }

  render(){
    let { onTxt,offTxt } = this.state;
    return(
      <View style={{ marginVertical:20 }}>
	      <TouchableOpacity style={[styles.switchStyle,{width:this.state.widthStyle,backgroundColor:this.state.switchBgColor}]} onPress={this.trigger.bind(this)} activeOpacity={1}>
	        <Animated.View style={[styles.viewStyle,{left:this.state.leftNum}]}>
	          <Text style={{fontSize:10,color:'#fff'}} onLayout={this.openLoad.bind(this)}>{onTxt}</Text>
	          <View style={styles.circle}></View> 
            <Text style={{fontSize:10,color:'#fff'}} onLayout={this.closeLoad.bind(this)}>{offTxt}</Text>
	        </Animated.View>
	      </TouchableOpacity>
        { // <Switch
        //     style={{marginTop: 20}}
        //     value={this.state.value}
        //     onValueChange={(value)=>{console.log(value);this.setState({value: value})}} />
        }
       
	    </View>
    )
  }

}

const styles = StyleSheet.create({
	switchStyle: {
		height:24, 
		borderRadius:13,
	  paddingVertical:2,
	  flexDirection:'row',
	  justifyContent:'center',
	  alignItems:'center',
	  position:'relative',
	},
	viewStyle: {
		height:24,
		flexDirection:'row',
		alignItems:'center',
		position:'absolute',
		top:0,
    paddingHorizontal:5,
		// borderWidth:1,
		// borderColor:'#f00',
	},
	circle: {
		width:20,
		height:20,
		borderRadius:11,
		backgroundColor:'#fff',
		marginHorizontal:2
	}
})