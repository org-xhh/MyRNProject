import React, { Component,PropTypes } from 'react';

import {
    View,
    Image,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    StyleSheet,
    Platform,
    NativeModules,
} from 'react-native';

/* 配置说明
 <HeadBar
    title="标题"                          // 中间的标题内容
    titleStyle={标题样式对象}             // 标题样式
    titlePress={() => alert(22222)}       // 标题点击事件
    leftIcon={uri: "data:base64..."}      // 左侧图标图片资源 24*24
    leftIconPress={() => alert(22222)}    // 左侧图标点击事件
    rightIcon={userIcon}                  // 右侧图标图片资源 24*24
    rightIconPress={() => alert(12288)}   // 右侧图标点击事件
    style={{...}}                         // 自定义样式如背景色、高度等等
/>
*/
import { WinStyle } from '../styles/BaseStyle';

export default class HeadBar extends Component {
    constructor(props) {
      super(props);
      this.state = {
        headerTit : props.title
      };
    }

    componentDidMount() {
       
    }
    componentWillUnmount() {
       
    }

    render() {
        let iosTop = Platform.OS === 'android' ? {} : {height:64,paddingTop:20};
        return (
            <View style={[styles.headBarCon, this.props.style, iosTop]}>
                <TouchableOpacity
                    activeOpacity={.6}
                    style={styles.leftIcon}
                    onPress={this.props.leftIconPress}
                >
                {
                   this.props.leftIcon ?
                   (
                     <View style={{flexDirection:'row',alignItems:'center'}}>
                       <Image style={[styles.leftBackIcon,this.props.leftIconStyle]} source={this.props.leftIcon} />
                       {
                          // Platform.OS === 'android' ? null : (<Text style={{color:'#3ac569',fontSize:16,textAlign:'left'}}>返回</Text>)
                       }
                     </View>
                   )
                   :
                   (<View style={this.props.leftStyle}><Text style={this.props.leftTxtStyle}>{this.props.leftTxt}</Text></View>)
               }
                </TouchableOpacity>

                <TouchableWithoutFeedback onPress={this.props.titlePress}>
                    <View style={styles.midContent}>
                        <View style={styles.TextWrap}>
                            <Text
                                numberOfLines={1}
                                style={[styles.headTitle, this.props.titleStyle]}
                            >
                                {
                                    (this.state.headerTit || '').replace('undefined','')
                                }
                            </Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>


                {
                    this.props.rightView ?
                    this.props.rightView :
                    <TouchableOpacity
                        activeOpacity={.6}
                        style={styles.rightIcon}
                        onPress={this.props.rightIconPress}
                    >
                    {
                        this.props.rightTxt ?
                                this.props.rightAll ?
                                (
                                    <View style={{flexDirection:'row'}}>
                                    <View style={[this.props.rightStyle]}><Text style={this.props.rightTxtStyle}>{this.props.rightTxt}</Text></View>
                                    <Image style={styles.iconPic} source={this.props.rightIcon} />
                                    </View>
                                ) :
                                (<View style={this.props.rightStyle}><Text numberOfLines={1} style={this.props.rightTxtStyle}>{this.props.rightTxt}</Text></View>)
                            :
                            (<Image style={styles.iconPic} source={this.props.rightIcon} />)

                    }

                    </TouchableOpacity>
                }

            </View>
        );
    }
}

const styles = StyleSheet.create({
    headBarCon: {
        // flex: 1,
        flexDirection: 'row',
        height: Platform.OS === 'android' ? 44 : 64,
        // backgroundColor:'#f6f6f6',
        backgroundColor:WinStyle.MainColor,
        justifyContent:'center',
    },
    leftIcon: {
        flex:2,
        paddingLeft:15,
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    midContent: {
        flex: 6,
        justifyContent: 'center',
        overflow: 'hidden',
        // borderColor:'#f60',
        // borderWidth:StyleSheet.hairlineWidth,
    },
    headTitle: {
        textAlign: 'center',
        justifyContent:'center',
        color: '#fff',
        fontSize: Platform.OS === 'android' ? 16 : 18,
    },
    rightIcon: {
        flex:2,
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingRight:15,
    },
    leftBackIcon:{
      width: 20,
      height: 20,
      resizeMode:'contain',
      marginRight:5,
    },
    iconPic: {
        width: 20,
        height: 20,
        resizeMode:'contain'
    }
});
