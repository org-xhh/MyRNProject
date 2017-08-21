'use strict';
import React, { Component,PropTypes } from 'react';

import {
    View,
    Text,
    Image,
    StyleSheet,
} from 'react-native';

import { WinStyle } from '../styles/BaseStyle';

export default class Progress extends Component {

    render() {
        return (
            <View style={styles.Container}>
                 <View style={styles.progressTimeOut}>
                    <View style={styles.title}>
                        <Text style={styles.titleTxt}>正在加载中<Text>{this.props.progressNum}%</Text>...</Text>
                    </View>
                     {
                         this.props.progressTimeOut ? <View style={[styles.title,styles.content]}>
                             <Text style={styles.titleTxt}>当前版本更新内容较多,请耐心等待</Text>
                         </View> : null
                     }

                </View>
            </View>
        );
    }
}
const winWidth  = WinStyle.WinWidth,
      winHeight = (WinStyle.WinHeight);

const styles = StyleSheet.create({
    Container:{
        position:'absolute',
        width: winWidth,
        top:0,
        left:0,
        right:0,
        bottom:0,
        flex:1,
        height:winHeight,
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'column',
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
