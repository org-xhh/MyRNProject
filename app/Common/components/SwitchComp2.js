'use strict';
import React, { Component,PropTypes } from 'react';

import {
    View,
    Text,
    Image,
    Animated,
    StyleSheet,
    TouchableOpacity,
    Easing
} from 'react-native';

import { WinStyle } from '../styles/BaseStyle';

export default class SwitchComp2 extends Component {
    constructor(props) {
      super(props);

      this.state = {
        Mytrans:new Animated.Value(30),
        myOpacity:new Animated.Value(0),
        pressState:1,
        moveStance:this.props.moveStance || 30,
        animated: false,
      };
    }
    handleOnPress(){
        if(this.state.animated){
            return;
        }
        this.setState({
            animated:true
        }) 
        if(this.state.pressState == 0){    
            Animated.parallel([
                Animated.timing(
                    this.state.myOpacity,
                    {
                        toValue: 0,
                        Easing:Easing.linear,
                        duration:300,
                        delay:0
                    }
                ),
                Animated.timing(
                    this.state.Mytrans,
                    {
                        toValue: this.state.moveStance,
                        Easing:Easing.linear,
                        duration:300,
                        delay:0
                    }
                )
            ]).start(()=>{
                this.setState({
                    pressState:1,
                    animated:false
                },()=>{
                    this.props.cancelFn && this.props.cancelFn(this)
                })
            })
        }
        else{
             Animated.parallel([
                Animated.timing(
                    this.state.myOpacity,
                    {
                        toValue: 1,
                        Easing:Easing.linear,
                        duration:300,
                        delay:0
                    }
                ),
                Animated.timing(
                    this.state.Mytrans,
                    {
                        toValue: 0,
                        Easing:Easing.linear,
                        duration:300,
                        delay:0
                    }
                )
            ]).start(()=>{
                this.setState({
                    pressState:0,
                    animated:false
                },()=>{
                    this.props.confirmFn && this.props.confirmFn(this)
                })
            })
        }
    }
    render(){
        return (
            <TouchableOpacity activeOpacity={0.9} onPress={this.handleOnPress.bind(this)}>
                <View style={[styles.Container,this.props.style]}>
                    <Animated.View style={{position:'absolute',top:0,left:0,width:50,height:20,borderRadius:11,opacity:1,justifyContent: 'center',paddingRight:7}}>
                        <Text style={[styles.cancelStyle,this.props.calTextStyle]}>{this.props.cancelText || '取消'}</Text>
                    </Animated.View>
                    <Animated.View style={{position:'absolute',top:0,left:0,width:50,height:20,borderRadius:11,opacity:this.state.myOpacity,justifyContent: 'center',paddingLeft:7,backgroundColor:'#32ab5b'}}>
                        <Text style={[styles.okStyle,this.props.okTextStyle]}>{this.props.okText || '确认'}</Text>
                    </Animated.View>
                    <Animated.View style={[styles.circle,this.props.circle,{right:this.state.Mytrans}]}></Animated.View>
                </View>
            </TouchableOpacity>
        );

    }

}
const winWidth  = WinStyle.WinWidth;
const winHeight = WinStyle.WinHeight;

const styles = StyleSheet.create({
    Container:{
        width:50,
        height:24,
        borderRadius:12,
        justifyContent: 'center',
        paddingRight:10,
        overflow:'hidden',
        backgroundColor:'#eee'
    },
    cancelStyle:{
        fontSize:12,
        color:'#666',
        textAlign:'right'
    },
    circle:{
        position:'absolute',
        top:0,
        right:0,
        width:20,
        height:20,
        backgroundColor:'#fff',
        borderRadius:11,
    },
    moveBar:{
        position:'absolute',
        top:0,
        left:0,
        bottom:0,
        width:50,
        height:20,
        borderRadius:11,
        justifyContent: 'center',
        backgroundColor:'#3ac569'
    },
    greenBar:{
        position:'absolute',
        top:0,
        left:0,
        bottom:0,
        width:50,
        height:20,
        borderRadius:11,
        justifyContent: 'center',
        backgroundColor:'#3ac569'
    },
    okStyle:{
        fontSize:12,
        color:'#fff',
        backgroundColor:'transparent'
    },
    ProgressBorder:{
        width:150,
        height:50,
        borderRadius:12,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'rgba(0,0,0,0.7)'
    },
    progress:{
        height:16,
        borderRadius:8,
        backgroundColor:'#4EC83B',
        marginTop:-0.5
    },
    progressTxt:{
        color:'#FFF',
        fontSize:14,
    },
    progressTimeOut:{
        backgroundColor:'#rgba(0,0,0,0.7)',
        borderRadius:12,
        marginHorizontal:30,
    },
    title:{
        paddingVertical:10,
        paddingHorizontal:15,
        alignItems:'center',
    },
    titleTxt:{
        fontSize:14,
        color:'#fff',
    },
    content:{
        borderTopColor:'#d7d7d7',
        borderTopWidth:StyleSheet.hairlineWidth
    }
});
